const WIDTH = 100;
const HEIGHT = 100;
var position;
var box;
var win = false;
var sec;
var t; // to store the timer interval

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

var elmnt;

function createBox(row) {
	elmnt = document.getElementById("centeredBackground");
	if (elmnt) { // remove the "choose level" part only if it exists
		elmnt.parentElement.removeChild(elmnt);
	}

	document.getElementById("menu").innerHTML = '<img onclick="createBox(3)" style="margin: 15px" width="auto" height="50" src="Assets/easy.png"/> <br />' +
		'<img onclick="createBox(4)" style="margin: 15px" width="auto" height="50" src="Assets/medium.png"/> <br />' +
		'<img onclick="createBox(5)" style="margin: 15px" width="auto" height="50" src="Assets/hard.png"/>';

	document.getElementById("sideBar").style.border = "1px solid #000000";
	
    document.getElementById("mainBox").innerHTML = "";
	clearInterval(t);
    var totalBox = row * row;
    var randomNumbers = new Array(totalBox);
    var temp = new Array(totalBox);
    var num = totalBox;
    var index;

	// for the timer
	sec = 0;
	function startTime() {
		document.getElementById('timer').innerHTML = convert(sec);
		sec++;
		document.getElementById("menu").style.borderTop = "1px solid #000000";
		document.getElementById("timer").style.margin = "15px";
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
        outerDiv = "<div style='width: " + row * WIDTH + "px; margin-left: auto; margin-right: auto'>";
        for (var j = 0; j < row; j++ , z++) {
			innerDiv = "<div id='" + (z + 1) + "' style='background-image: url(" + images[randomNumbers[z]] + "); float: left' class='img'><div id='border" + (z + 1) + "'></div></div>";
			document.getElementById("mainBox").innerHTML += outerDiv + innerDiv + "</div>";
		}
	}
	setBorder("border1");
	position = 1;
	box = row;
}

function setBorder(id) {
	document.getElementById(id).className = "innerBorder";
}

function removeBorder(id) {
	document.getElementById(id).classList.remove("innerBorder");
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

var swapMode = false;
var showErrorMessage = false;

document.onkeydown = function(e) {
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
			document.getElementById("Test").innerHTML = "Enter clicked";
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
					document.getElementById("Test").innerHTML = "Left clicked";
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
					document.getElementById("Test").innerHTML = "Up clicked";
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
					document.getElementById("Test").innerHTML = "Right clicked";
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
					document.getElementById("Test").innerHTML = "Down clicked";
				}
			}
			break;
	}

	if (checkWin()) {
		// do something when win
		clearInterval(t);
		document.getElementById("content").innerHTML = "<center style='font-size: 50px'><div class='winMessage'>Congratulations,<br />You win!!!<br />Your time is:<br />" + convert(sec) + "</div></center>";
	}
	
	if (showErrorMessage) {
		document.getElementById("errorMessage").innerHTML = "Unable to slide";
		setTimeout(function() {
			document.getElementById("errorMessage").innerHTML = "";
		}, 750);
		showErrorMessage = false;
	}
}

function checkWin() {
	// detect the empty box
	if (document.getElementById((box * box).toString()).style.backgroundImage != "url(\"" + images[0] + "\")") {
		return false;
	}
	// detect the whether the numbered boxes are in the right place or not
	for (var v = 1; v < box * box; v++) {
		if (document.getElementById((v).toString()).style.backgroundImage != "url(\"" + images[v] + "\")") {
			return false;
		}
	}
	return true;
}