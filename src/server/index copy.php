<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['name']) && empty($_POST['email'])) die();

if ($_POST)
	{

		// Upload attachment file
		if(!empty($_FILES["file"]["name"])){
			
			// File path config
			$targetDir = "/";
			$fileName = basename($_FILES["file"]["name"]);
			$targetFilePath = $targetDir . $fileName;
			$fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);
			
			// Allow certain file formats
			$allowTypes = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg');
			if(in_array($fileType, $allowTypes)){
					// Upload file to the server
					if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){
							$uploadedFile = $targetFilePath;
					}else{
							$uploadStatus = 0;
							$statusMsg = "Sorry, there was an error uploading your file.";
					}
			}else{
					$uploadStatus = 0;
					$statusMsg = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.';
			}
		}

	// set response code - 200 OK

	if($uploadStatus == 1){

		http_response_code(200);
		$subject = 'Parts App Message' . $_POST['name'];
		$to = "tiagoanatar@gmail.com";
		$from = $_POST['email'];

		// data
		$htmlContent = '<html><body><div style="border:3px solid #ccc; padding: 20px;">';
		'<h4>New Message from:' . $_POST['name'] . '</h4><p>New client message received.</p>';
		'<table width="450px" style="border-color: 1px solid #ccc;" cellpadding="10">';
		"<tr><td><strong>Company:</strong> </td><td>" . $_POST['company'] . "</td></tr>";
		"<tr><td><strong>Message:</strong> </td><td>" . $_POST['message'] . "</td></tr>";
		"<tr><td><strong>Parts:</strong> </td><td>";
			foreach($_POST['parts'] as $key=>$val) {
				$message .= $val.',';
			};
		"</td></tr>";
		"</table>";
		"</div></body></html>";

		//$msg = $_POST['number'] . $_POST['message'];

		// Headers

		$headers = "MIME-Version: 1.0\r\n";
		$headers.= "Content-type: text/html; charset=UTF-8\r\n";
		$headers.= "From: <" . $from . ">";

		///////

		if(!empty($uploadedFile) && file_exists($uploadedFile)){
                    
			// Boundary 
			$semi_rand = md5(time()); 
			$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x"; 
			
			// Headers for attachment 
			$headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 
			
			// Multipart boundary 
			$message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
			"Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n"; 
			
			// Preparing attachment
			if(is_file($uploadedFile)){
					$message .= "--{$mime_boundary}\n";
					$fp =    @fopen($uploadedFile,"rb");
					$data =  @fread($fp,filesize($uploadedFile));
					@fclose($fp);
					$data = chunk_split(base64_encode($data));
					$message .= "Content-Type: application/octet-stream; name=\"".basename($uploadedFile)."\"\n" . 
					"Content-Description: ".basename($uploadedFile)."\n" .
					"Content-Disposition: attachment;\n" . " filename=\"".basename($uploadedFile)."\"; size=".filesize($uploadedFile).";\n" . 
					"Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
			}
			
			$message .= "--{$mime_boundary}--";
			$returnpath = "-f" . $from;
			
			// Send email
			$mail = mail($to, $subject, $message, $headers, $returnpath);
			
			// Delete attachment file from the server
			@unlink($uploadedFile);
	}else{
			 // Set content-type header for sending HTML email
			$headers .= "\r\n". "MIME-Version: 1.0";
			$headers .= "\r\n". "Content-type:text/html;charset=UTF-8";
			
			// Send email
			$mail = mail($to, $subject, $htmlContent, $headers); 
	}

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

	}

?>