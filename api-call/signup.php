<?php
	require_once('config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Method: POST, GET, OPTIONS");
	header('Access-Control-Allow-Headers: Content-Type, X-Requested-With , Authorization');
	header("Content-Type: application/json; charset=utf-8");
	$conn= mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$response = array();
	if(isset($_POST)){
		$company_name=$_POST['companyname'];
		$address=$_POST['address'];
		$email=$_POST['email'];
		$query="Select * from login_table where email='$email'";
		$result=mysqli_query($conn,$query);
		if(mysqli_num_rows($result) > 0){
			$response['status']="failed";
			$response['massage']="Email address exists";
		}
		else{
			$query= "Insert into login_table values (NULL,'$company_name','$address','$email', NULL, NULL)";
			if(mysqli_query($conn,$query)) {
				$id = mysqli_insert_id($conn);
				$userid="ETH";
				$string=$id;
				$length = 10;
				$string=str_pad($string,$length,"0", STR_PAD_LEFT);
				$userid=$userid.$string;
				$password=rand(100000,999999);
				$response['userid']=$userid;
				$response['password']=$password;
				$response['company_name']=$company_name;
				$query="Update login_table SET user_id='$userid', password='$password' where id=$id";
				if(mysqli_query($conn,$query)) {
					$response['status']="success";
					$response['massage']="Data Inserted Successfully";
					$msg="Your account is created successfully, and the userid is $userid and password is $password. thanks for registering with us.";
					mail($email,"Acount Registered Successfully",$msg);
				}
			}
		}
	}
	else{
		$response['status']="failed";
		$response['massage']="Parameters not specified";
	}
	echo json_encode($response);
?>