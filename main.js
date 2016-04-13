const WIDTH = 100;
const HEIGHT = 100;

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

function createBox(box) {
    document.getElementById("mainBox").innerHTML = "";
    var totalBox = box * box;
    var randomNumbers = new Array(totalBox);
    var temp = new Array(totalBox);
    var num = totalBox;
    var index;

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
	var position;
	
    for (var i = 0, z = 0; i < box; i++) {
        outerDiv = "<div style='width: " + box * WIDTH + "px; margin-left: auto; margin-right: auto'>";
        for (var j = 0; j < box; j++ , z++) {
			innerDiv = "<div id='" + (z + 1) + "' style='background-image: url(" + images[randomNumbers[z]] + "); float: left' class='img'><div id='border" + (z + 1) + "'></div></div>";
			document.getElementById("mainBox").innerHTML += outerDiv + innerDiv + "</div>";
		}
	}
	setBorder("border1");
}

function setBorder(id) {
	document.getElementById(id).className = "innerBorder";
	position = Number(id.substr(6, 1));
}

function removeBorder(id) {
	document.getElementById(id).classList.remove = "innerBorder";
}

var sec = 0;
function startTime() {
    document.getElementById('timer').innerHTML = convert(sec);
    sec++;
	setTimeout(startTime, 1000);
}
function convert(s) {
    var h, m;
    var result;
    h = Math.floor(s / 3600);
    m = Math.floor(s / 60) % 60;
    s %= 60;
    if (h < 10) result = "0" + h;
    else result = h;
    if (m < 10) result += ":0" + m;
    else result += ":" + m;
    if (s < 10) result += ":0" + s;
    else result += ":" + s;
    return result;
}

document.onkeydown = function (e) {
    e = e || event;
    switch (e.keyCode) {
    	case 13: // Enter
    		document.getElementById("Test").innerHTML = "Enter clicked";
    		break;
    	case 37: // Left
    		document.getElementById("Test").innerHTML = "Left clicked";
    		break;
    	case 38: // Up
    		document.getElementById("Test").innerHTML = "Up clicked";
    		break;
    	case 39: // Right
    		document.getElementById("Test").innerHTML = "Right clicked";
    		break;
    	case 40: // Down
    		document.getElementById("Test").innerHTML = "Down clicked";
    		break;
    }
}