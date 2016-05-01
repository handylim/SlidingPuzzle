<?php
	session_start();
	$serverName = "ap-cdbr-azure-southeast-b.cloudapp.net";
	$databaseName = "Default Database";
	$userName = "b7c4a56e485de0";
	$password = "4ed752a1";
	$highscore = null;

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		try {
			$conn = new PDO ("mysql:host=$serverName;dbname=$databaseName", $userName, $password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			if (!empty($_SESSION)) {
				$userEmail = $_SESSION['email'];
				$temp = (int)$_POST['time'];
				
				if ($userEmail!=null) {
					$sql = "SELECT high_score FROM PlayerData WHERE email='$userEmail'";
					$rslt = $conn->query($sql);
					
					foreach ($rslt as $row) {
						if ($row['high_score'] == null) {
							$highscore = $temp;
						}
						elseif ($row['high_score'] > $temp) {
							$highscore = $temp;
						}
					}

					if($highscore!=null) {
						$sql = "UPDATE PlayerData SET high_score=$highscore WHERE email='$userEmail'";
						$stmnt = $conn->prepare($sql);
						$stmnt->execute();
						echo "Data updated";
					}
					else {
						echo "No data updated";
					}
				}
				else {
					echo "Please login first";
				}
			}
			else {
				echo "Please login first";
			}
		}
		catch (PDOException $e) {
			echo "Connection failed: " . $e->getMessage();
		}
		$conn = null;
	}
?>
