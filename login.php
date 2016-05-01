<?php
	session_start();
	// for login
	function testInput($data) {
		$data = trim($data);
		$data = stripslashes ($data);
		$data = htmlspecialchars($data);
		return $data;
	}

	$response['connected'] = null;
	$response['error'] = null;

	if ($_SERVER["REQUEST_METHOD"]=="POST") {
		$userEmail = testInput($_POST["email"]);
		$_SESSION['email'] = $userEmail;
		$userPassword = sha1($_POST["password"]);

		$serverName = "ap-cdbr-azure-southeast-b.cloudapp.net";
		$databaseName = "Default Database";
		$userName = "b7c4a56e485de0";
		$password = "4ed752a1";

		try {
			$conn = new PDO ("mysql:host=$serverName;dbname=$databaseName",$userName,$password);
			$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

			if ($_POST["signUp"]=="false") { // login
				$sql = "SELECT COUNT(*) FROM PlayerData WHERE email='$userEmail'";
				if ($rslt = $conn->query($sql)) {
					if ($rslt->fetchColumn() >= 1) {
						$sql = "SELECT password FROM PlayerData WHERE email='$userEmail'";
						foreach ($conn->query($sql) as $row) {
							if ($row['password'] == $userPassword) {
								$response['connected']=true;
							}
						}
						if ($response['connected'] == null) {
							$response['error'] = "Email and password not match";
						}
					}
					else {
						$response['error'] = "Email not found in the database";
					}
				}
			}
			else { // sign up
				$sql = "SELECT email FROM PlayerData";
				$result = $conn->query($sql);

				$isEmailExist=false;
				foreach($result as $row){
					if($row['email']==$userEmail){
						$isEmailExist=true;
						$response['error'] = "Email has been used";
					}
				}

				if($isEmailExist==false){
					$sql=$conn->prepare("INSERT INTO PlayerData (email, password)
								VALUES (:useremail, :userpassword)");
					$sql->bindParam(':useremail',$userEmailParam);
					$sql->bindParam(':userpassword',$userPasswordParam);

					$userEmailParam=$userEmail;
					$userPasswordParam=$userPassword;
					$sql->execute();
					$response['connected'] = true;
				}
			}
		}
		catch (PDOException $e) {
			$response['error'] = "Connection failed: " . $e->getMessage();
			$response['connected'] = false;
		}
		$conn = null;
	}
	echo json_encode($response);
?>