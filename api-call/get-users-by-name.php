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
    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $query="Select * from user_table where full_name like '%$name%'";
        if($result=mysqli_query($conn,$query)){
            while($row = mysqli_fetch_assoc($result)){
                $response[]= array('id'=> $row['id'],'name'=> $row['full_name'], 'drivingLicense'=> $row['driving_license'],
                'carNo'=> $row['car_no'], 'drivingPhoto'=> $row['id_proof'],'companyId'=> $row['company_id'], 
                'companyName' => $row['company_name'], 'dateOfBooking'=> $row['start_date'], 'dateOfReturn'=> $row['end_date'],'status' => $row['status']);
            }
        }
    }
    else {
        $response['status']='failed';
        $response['message']='Parameters not specified';
    }
	echo json_encode($response);
?>