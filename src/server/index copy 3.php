<?php
//header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$rest_json = file_get_contents("php://input");
//$httpPost = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
//$req = json_decode($httpPost);

if (empty($_POST['name']) && empty($_POST['email'])) die();

if ($_POST)
	{

	// image upload - THIS IS BLOCKING THE MAIL SENT. 
	/*
	$DIR = "https://www.woltersmotors.com/api/";
	$req = $_POST['file']
	$file_chunks = explode(";base64,", $req->image);
	$fileType = explode("image/", $file_chunks[0]);
	$image_type = $fileType[1];
	$base64Img = base64_decode($file_chunks[1]);
	$file = $DIR . uniqid() . '.jpg';
	file_put_contents($file, $base64Img); 
	*/
	// set response code - 200 OK
	http_response_code(200);
	$subject = 'Parts App Message' . $_POST['name'];
	$to = "tiagoanatar@gmail.com";
	$from = $_POST['email'];

	// data
	$message = '<html><body><div style="border:3px solid #ccc; padding: 20px;">';
	$message .= '<h4>New Message from:' . $_POST['name'] . '</h4><p>New client message received.</p>';
	$message .= '<table width="450px" style="border-color: 1px solid #ccc;" cellpadding="10">';
	$message .= "<tr><td><strong>Company:</strong> </td><td>" . $_POST['company'] . "</td></tr>";
	$message .= "<tr><td><strong>Message:</strong> </td><td>" . $_POST['message'] . "</td></tr>";
	$message .= "<tr><td><strong>Parts:</strong> </td><td>";
		foreach($_POST['parts'] as $key=>$val) {
        	$message .= $val.',';
    	};
	//$message .= "<tr><td><strong>Image:</strong> </td><td>" . $_POST['file'] . "</td></tr>";
  $message .= "</td></tr>";
	$message .= "</table>";
	$message .= "</div></body></html>";

	// Headers
	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	$headers.= "From: <" . $from . ">";
	mail($to, $subject, $message, $headers);

	// echo json_encode( $_POST );

	echojson_encode(array(
		"sent" => true
	));
	}
  else
	{

	// tell the user about error

	echojson_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>