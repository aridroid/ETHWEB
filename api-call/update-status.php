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
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query="Update user_table SET status='inactive' where id=$id";
        if(mysqli_query($conn,$query)){
            $response['status']='success';
            $response['message']='Updated status successfully';
        }
    }
    else {
        $response['status']='failed';
        $response['message']='Parameters not specified';
    }
	echo json_encode($response);
?>