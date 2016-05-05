const WIDTH = 100;
const HEIGHT = 100;
var position;
var box;
var sec;
var t; // to store the timer interval
var errorSound = new Audio();
errorSound.src = "Assets/alert.wav";
var swapMode = false;
var showErrorMessage = false;
var isWin = false;

var images = [
	"Assets/empty.bmp",
	"Assets/1.bmp",
	"Assets/2.bmp",
	"Assets/3.bmp",
	"Assets/4.bmp",
	"Assets/5.bmp",
	"Assets/6.bmp",
	"Assets/7.bmp",
	"Assets/8.bmp",
	"Assets/9.bmp",
	"Assets/10.bmp",
	"Assets/11.bmp",
	"Assets/12.bmp",
	"Assets/13.bmp",
	"Assets/14.bmp",
	"Assets/15.bmp",
	"Assets/16.bmp",
	"Assets/17.bmp",
	"Assets/18.bmp",
	"Assets/19.bmp",
	"Assets/20.bmp",
	"Assets/21.bmp",
	"Assets/22.bmp",
	"Assets/23.bmp",
	"Assets/24.bmp"
];

$("#loginForm").ready(function () {
	$("#loginForm").submit(function () {
		if (tempHTML == null) tempHTML = $("#form").html();
		var email = $("#emailField").val();
		var isContinue = true;

		if (isWin) {
			isContinue = false;
		}

		$.ajax({
			type: "POST",
			dataType: "json",
			url: "login.php",
			async: isContinue,
			data: "email=" + email + "&password=" + $("#passwordField").val() + "&signUp=" + $("#IsSignUp").val(),
			beforeSend: function () {
				$("#errorForm").css("color", "#000000");
				$("#errorForm").html("<center>Logging in ... </center>");
			},
			complete: function () {
				$("#errorForm").css("color", "#ff0000");
			},
			success: function (result) {
				$("#errorForm").text("");
				if (result['connected']) {
					$("#form").removeClass("showForm w3-animate-zoom");
					$("#headerEmail").html(email + " <span style='font-size: 13px'>&#9660;</span>");
					$("#form").html("<center id='centeredLogin'><h4 id='loginHeader'>Logout</h4></center>" +
						"<center id='logOutButton'><button class='w3-btn w3-round-large w3-red' onclick='logOut()' style='margin: 15px'>Log out</button></center>");
				}
				else if (result['connected'] == false) {
					$("#centeredLogin").html("<h4 id='loginHeader'>Login</h4><br /><span style='color: #ff0000'>Fail to connect to database<br />Please check your internet connection</span>");
				}

				if (result['error'] != null) {
					$("#errorForm").text(result['error']);
				}
			}
		});

		if (isWin) {
			checkWin();
		}
		return false;
	});
});

function createBox(row) {
	if ($("#centeredBackground")) {
		$("#centeredBackground").remove(); // remove the "choose level" part only if it exists
	}

	$("#menu").html('<img onclick="createBox(3)" style="margin: 15px" width="auto" height="50" src="Assets/easy.png"/> <br />' +
		'<img onclick="createBox(4)" style="margin: 15px" width="auto" height="50" src="Assets/medium.png"/> <br />' +
		'<img onclick="createBox(5)" style="margin: 15px" width="auto" height="50" src="Assets/hard.png"/>');

	$("#sideBar").css("border", "1px solid #000000");

	// in case the user turn the swap mode on and decide to choose another level at the menu section
	swapMode = false;
	showErrorMessage = false;

	$("#mainBox").text("");
	clearInterval(t);
	var totalBox = row * row;
	var randomNumbers = new Array(totalBox);
	var temp = new Array(totalBox);
	var num = totalBox;
	var index;

	// for the timer
	sec = 0;
	function startTime() {
		$("#timer").text(convert(sec));
		sec++;
		$("#menu").css("borderTop", "1px solid #000000");
		$("#timer").css("margin", "15px");
	}

	t = setInterval(startTime, 1000); // start the timer

	for (var i = 0; i < totalBox; i++) {
		temp[i] = i;
	}

	for (var i = 0; i < totalBox; i++) {
		index = Math.floor(Math.random() * num);
		randomNumbers[i] = temp[index];

		for (var j = index; j < num - 1; j++) {
			temp[j] = temp[j + 1];
		}
		num--;
	}

	var outerDiv;
	var innerDiv;

	for (var i = 0, z = 0; i < row; i++) {
		innerDiv = "";
		outerDiv = "<div style='width: " + row * WIDTH + "px; margin-left: auto; margin-right: auto'>";
		for (var j = 0; j < row; j++ , z++) {
			innerDiv += "<div id='" + (z + 1) + "' style='background-image: url(" + images[randomNumbers[z]] + "); float: left' class='img' onclick='clickSlide(this.id)'><div id='border" + (z + 1) + "'></div></div>";
		}
		document.getElementById("mainBox").innerHTML += outerDiv + innerDiv + "</div>";
	}
	setBorder("border1");
	position = 1;
	box = row;
}

function setBorder(id) {
	$("#" + id).addClass("innerBorder");
}

function removeBorder(id) {
	$("#" + id).removeClass("innerBorder");
}

function swap(idSource, idTarget) {
	var temp = document.getElementById(idTarget).style.backgroundImage;
	document.getElementById(idTarget).style.backgroundImage = document.getElementById(idSource).style.backgroundImage;
	document.getElementById(idSource).style.backgroundImage = temp;
}

function swapModeOnBorder(id) {
	document.getElementById(id).style.borderColor = "red";
}

function swapModeOffBorder(id) {
	document.getElementById(id).style.borderColor = "black";
}

function checkEmptyBox(idBox1, idBox2) { // check whether the box that will be swapped contain empty box or not
	if (document.getElementById(idBox1).style.backgroundImage == 'url("Assets/empty.bmp")' || document.getElementById(idBox2).style.backgroundImage == 'url("Assets/empty.bmp")') {
		return true;
	}
	return false;
}

function convert(s) {
	var h, m;
	var result;
	h = Math.floor(s / 3600);
	m = Math.floor(s / 60) % 60;
	s %= 60;
	h = h < 10 ? "0" + h : h;
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;
	return h + ":" + m + ":" + s;
}

document.onkeydown = function(e) { // to move the box via keyboard (arrow button)
	e = e || event;

	switch (e.keyCode) {
		case 13: // Enter
			swapMode = !swapMode;
			if (swapMode) {
				swapModeOnBorder("border" + position);
			}
			else {
				swapModeOffBorder("border" + position);
			}
			break;
		case 37: // Left
			if (position > 1) {
				if (swapMode) {
					if (checkEmptyBox((position - 1).toString(), (position).toString())) {
						swap((position - 1).toString(), (position).toString()); //toString() because the id of an element need to be passed as a string
					}
					else {
						showErrorMessage = true;
					}
					swapModeOffBorder("border" + position);
					swapMode = false;
				}

				if (!showErrorMessage) {
					removeBorder("border" + position);
					position--;
					setBorder("border" + position);
				}
			}
			break;
		case 38: // Up
			if (position > box) {
				if (swapMode) {
					if (checkEmptyBox((position - box).toString(), (position).toString())) {
						swap((position - box).toString(), (position).toString()); //toString() because the id of an element need to be passed as a string
					}
					else {
						showErrorMessage = true;
					}
					swapModeOffBorder("border" + position);
					swapMode = false;
				}

				if (!showErrorMessage) {
					removeBorder("border" + position);
					position -= box;
					setBorder("border" + position);
				}
			}
			break;
		case 39: // Right
			if (position < box * box) {
				if (swapMode) {
					if (checkEmptyBox((position + 1).toString(), (position).toString())) {
						swap((position + 1).toString(), (position).toString()); //toString() because the id of an element need to be passed as a string
					}
					else {
						showErrorMessage = true;
					}
					swapModeOffBorder("border" + position);
					swapMode = false;
				}

				if (!showErrorMessage) {
					removeBorder("border" + position);
					position++;
					setBorder("border" + position);
				}
			}
			break;
		case 40: // Down
			if (position + box <= box * box) {
				if (swapMode) {
					if (checkEmptyBox((position + box).toString(), (position).toString())) {
						swap((position + box).toString(), (position).toString()); //toString() because the id of an element need to be passed as a string
					}
					else {
						showErrorMessage = true;
					}
					swapModeOffBorder("border" + position);
					swapMode = false;
				}

				if (!showErrorMessage) {
					removeBorder("border" + position);
					position += box;
					setBorder("border" + position);
				}
			}
			break;
	}

	checkWin();

	if (showErrorMessage) {
		errorSound.play();
		$("#errorMessage").text("Unable to slide");
		setTimeout(function () {
			$("#errorMessage").text("");
		}, 750);
		showErrorMessage = false;
	}
}

function clickSlide (clickedId) { // to move the box via mouse click
	var interval = Math.abs(position - clickedId);
	if (interval == 0) { // click the same box again
		swapMode = !swapMode;
		if (swapMode) {
			swapModeOnBorder("border" + position);
		}
		else {
			swapModeOffBorder("border" + position);
		}
	}
	else if (swapMode) {
		if (interval == 1 || interval == box) { // move left/rigt or up/down
			if (checkEmptyBox((position).toString(), clickedId)) {
				swap((position).toString(), clickedId);
			}
			else {
				showErrorMessage = true;
			}
		}
		else {
			showErrorMessage = true;
		}
		swapModeOffBorder("border" + position);
		swapMode = false;
	}

	checkWin();

	if (!showErrorMessage) {
		removeBorder("border" + position);
		position = Number(clickedId);
		setBorder("border" + position);
	}
	else {
		errorSound.play();
		$("#errorMessage").text("Unable to slide");
		setTimeout(function () {
			$("#errorMessage").text("");
		}, 750);
		showErrorMessage = false;
	}
}

function checkWin() {
	var win = true;

	if (!isWin) {
		// detect the empty box
		if (document.getElementById((box * box).toString()).style.backgroundImage != "url(\"" + images[0] + "\")") {
			win = false;
		}
		// detect the whether the numbered boxes are in the right place or not
		if (win) {
			for (var v = 1; v < box * box; v++) {
				if (document.getElementById((v).toString()).style.backgroundImage != "url(\"" + images[v] + "\")") {
					win = false;
					break;
				}
			}
			if (win) {
				isWin = true;
			}
		}
	}

	if (isWin) {
		clearInterval(t);
		$.ajax({
			type: "POST",
			url: "Check High Score.php",
			data: "time=" + sec,
			success: function (rslt) {
				if (rslt == "Please login first") {
					$("#content").html("<center style='font-size: 50px'><div class='winMessage'>Congratulations,<br />You win!!!<br />Your time is:<br />" + convert(sec) + "<br /><span style='font-size:18px'>Please <button class='buttonLink' onclick='showFormLogin()'>Login</button> or <button class='buttonLink' onclick='showFormSignUp()'>Sign Up</button> so your score can be recorded</span></div></center>");
				}
				else if (rslt == "No data updated") {
					$("#content").html("<center style='font-size: 50px'><div class='winMessage'>Congratulations,<br />You win!!!<br />Your time is:<br />" + convert(sec) + "</div></center>");
				}
				else if (rslt == "Data updated") {
					$("#content").html("<center style='font-size: 50px'><div class='winMessage'>Congratulations,<br />You got a new high score!!!<br />Your time is:<br />" + convert(sec) + "</div></center>");
				}
				else {
					$("#content").html(rslt); // to show the error in case there is an error
				}
			}
		});
	}
}

var isLoginShown = true;
function showFormLogin() {
	if (isLoginShown) {
		$("#form").toggleClass("showForm w3-animate-zoom");
	}
	SignIn();
	isLoginShown = true;
	$("#emailField").focus();
}

function showFormSignUp() {
	if (!isLoginShown) {
		$("#form").toggleClass("showForm w3-animate-zoom");
	}
	SignUp();
	isLoginShown = false;
	$("#emailField").focus();
}
