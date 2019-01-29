let backgroundAngle = 160;
let hue1 = 120;
let hue2 = 180;

function rotateBackground() {
    document.querySelector(".deck").style.background =
        "linear-gradient("+backgroundAngle.toString()+"deg, hsl("+hue1.toString()+
        ", 100%, 70%), hsl("+hue2.toString()+", 100%, 70%)";
    backgroundAngle += 0.025;
    hue1 += 0.1;
    hue2 += 0.1;
}

setInterval(rotateBackground, 10);