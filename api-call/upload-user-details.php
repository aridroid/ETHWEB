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
    $time=time();
    $target_path= '../uploaded-files/'.$time.'.jpg';
	if(isset($_POST)){
        $car_no = $_POST['car_no'];
        $license = $_POST['license'];
        $name = $_POST['name'];
        $company_id = $_POST['company_id'];
        $company_name = $_POST['company_name'];
        $startdate = $_POST['startdate'];
        $enddate = $_POST['enddate'];
        $image = $_POST['image'];
        $image = str_replace('data:image/jpeg;base64,','',$image);
        $image = str_replace('data:image/jpg;base64,','',$image);
        $image = str_replace('data:image/png;base64,','',$image);
        $image = str_replace(' ','+',$image);
        $image = base64_decode($image);
        file_put_contents($target_path,$image);
        $target_path = 'uploaded-files/'.$time.'.jpg';
        $query="Insert into user_table values('NULL','$name','$license','$car_no','$startdate','$enddate','$target_path','$company_id','$company_name')";
        if(mysqli_query($conn,$query)){
            $response['status']='success';
            $response['massage']='User Added Successfully';
        }
        else {
            $response['status']="failed";
		    $response['massage']="Query Failure, Please contact with the developer";
        }
	}
	else{
		$response['status']="failed";
		$response['massage']="Parameters not specified";
	}
	echo json_encode($response);
?>