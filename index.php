<!DOCTYPE html>
<html lang="en">
<head>
    <title>Sliding Puzzle</title>
    <link rel="stylesheet" type="text/css" href="http://www.w3schools.com/lib/w3.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="main.css" />
	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.3.min.js"></script>
	<meta charset="utf-8" />
</head>

<body>
    <header id="header" style="background-color: #373277" class="w3-container">
        <div style="display: inline-block; margin-left: 10%">
            <img src="Assets/logo.png" style="margin: 5px"/>
        </div>

		<div id="login" class="w3-dropdown-hover">
            <span id="headerEmail" style="font-size: 20px; color: #ffffff">
			<?php
				session_start();
				if (empty($_SESSION)) {
					echo "Login";
				}
				else {
					echo $_SESSION['email'] . " <span style='font-size: 13px'>&#9660;</span>";
				}
			?>
			</span>

			<div id="form" class="w3-dropdown-content w3-card-4 w3-border" style="width: 300px">
				<?php
					if (empty($_SESSION)) { ?>
						<center id="centeredLogin">
							<h4 id='loginHeader'>Login</h4>
						</center>
				
						<form id="loginForm" class="w3-form">
							<input id="emailField" name="email" class="w3-input" type="email" placeholder="Email" required />
							<input id="passwordField" name="password" onfocus="$('#errorForm').text('')" class="w3-input" type="password" placeholder="Password" required />
							<div id="reEnterPassword"></div>
							<span id="errorForm" style="color: #ff0000; margin-bottom: 10px"></span>
							<center id="submitPart">
								<input id="btn_Submit" class="w3-btn w3-round-large w3-blue" type="submit" value="Login">
							</center>
							<input id="IsSignUp" type="hidden" name="signUp" value="false" />
						</form>

						<center id="message" style="margin-top: 15px; margin-bottom: 15px">
							Don't have account?<br />
							<button class="buttonLink" onclick="SignUp()">Sign Up</button>
						</center>
					<?php }
					else {
						echo "<center id='centeredLogin'><h4 id='loginHeader'>Logout</h4></center>" .
						"<center id='logOutButton'><button class='w3-btn w3-round-large w3-red' onclick='logOut()' style='margin: 15px'>Log out</button></center>";
						}
					?>
            </div>
        </div>
    </header>

    <div id="content" style="width: 100%; height: 100%">
        <center id="centeredBackground">
            <div class="backgroundMode">
                <div style="font-size: 40px; margin-bottom: 20px"><b>CHOOSE YOUR MODE</b></div>
                <div onclick="createBox(3)" class="mode" style="background-image: url('Assets/easy.png')"></div>
                <div onclick="createBox(4)" class="mode" style="background-image: url('Assets/medium.png')"></div>
                <div onclick="createBox(5)" class="mode" style="background-image: url('Assets/hard.png')"></div>
            </div>
        </center>

        <div id="mainBox" style="display: block; margin: 30px"></div>

        <div id="sideBar">
            <center>
                <div id="timer" style="font-size: 30px"></div>
            </center>
            <div id="menu">
            </div>
        </div>

        <center>
            <div id="errorMessage"></div>
        </center>
	</div>

	<footer>
        <table style="width: 100%; color: #ffffff">
            <tr>
                <td id="contact">
                    <center style="margin-bottom: 10px">
                        <a href="https://github.com/handylim/SlidingPuzzle" target="_blank">
                            <img id="gitHubLogo" src="Assets/github logo.png"/><br />Give contribution
                        </a>
                    </center>
                    <i class="material-icons iconMargin" style="font-size: 18px">phone</i><span style="font-size: 16px">+62 822 7626 4869</span><br />
                    <a href="mailto:handy_257@outlook.com"><i class="material-icons iconMargin" style="font-size: 18px">email</i><span style="font-size: 16px">handy_257@outlook.com</span></a><br />
                    <a href="https://www.facebook.com/hanz.li.5" target="_blank"><img src="Assets/facebook logo.png" width="20" height="20" class="iconMargin"/>Handy Lim</a>
                </td>
                <td style="width: 40%"></td>
                <td id="poweredByAzure"><p style="text-align: right"><img style="margin-bottom: 5px" src="Assets/azure logo.png" width="300" height="50"/><br />
                Copyright &copy; Handy <?php echo date("Y") ?>.<br />
                All Rights Reserved.</p></td>
            </tr>
        </table>
	</footer>

	<script src="main.js"></script>
	<script>
		var tempHTML = null;
		function SignUp() {
			tempHTML = $("#form").html();
			$("#loginHeader").text("Sign Up");
			$("#reEnterPassword").html("<input id='reEnterPasswordField' name='reEnterPasswordInput' onblur='$('#errorForm').text('')' oninput='CheckPassword()' class='w3-input' type='password' placeholder='Re-enter password' required />");
			$("#emailField").val("");
			$("#passwordField").val("");
			$("#errorForm").text("");
			$("#submitPart").html("<input id='btn_Submit' class='w3-btn w3-round-large w3-green' type='submit' value='Sign Up'>");
			$("#message").html("Have an account?<br /><button class='buttonLink' onclick='SignIn()'>Sign In</button>");
			$("#IsSignUp").attr("value", "true");
		}

		function SignIn() {
			$("#loginHeader").text("Login");
			$("#emailField").val("");
			$("#passwordField").val("");
			$("#reEnterPassword").text("");
			$("#errorForm").text("");
			$("#submitPart").html("<input id='btn_Submit' class='w3-btn w3-round-large w3-blue' type='submit' value='Sign In'>");
			$("#message").html("Don't have account?<br /><button class='buttonLink' onclick='SignUp()'>Sign Up</button>");
			$("#IsSignUp").attr("value", "false");
			tempHTML = $("#form").html();
		}

		function CheckPassword() {
			if ($("#passwordField").val() != $("#reEnterPasswordField").val()) {
				$("#errorForm").text("Password does not match");
				$("#btn_Submit").attr("disabled", "disabled");
			}
			else {
				$("#errorForm").text("");
				$("#btn_Submit").removeAttr("disabled");
			}
		}

		function logOut() {
			$.post("logout.php");
			location.reload(true);
		}
	</script>
</body>
</html>
