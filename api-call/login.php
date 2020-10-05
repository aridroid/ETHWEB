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
        $username=$_POST['username'];
        $password=$_POST['password'];
		$query="Select * from login_table where user_id='$username' and password='$password'";
		$result=mysqli_query($conn,$query);
		if(mysqli_num_rows($result) > 0){
            $row=mysqli_fetch_assoc($result);
			$response['userid']=$row['user_id'];
			$response['company_name']=$row['company_name'];
            $response['status']="success";
            $response['massage']="UserId Exists";
		}
		else{
            $response['status']="failed";
            $response['massage']="Invalid Id and Password";
		}
	}
	else{
		$response['status']="failed";
		$response['massage']="Parameters not specified";
	}
	echo json_encode($response);
?>