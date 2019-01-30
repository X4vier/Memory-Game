var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById('win-screen');

span.onclick = hideModal;

function hideModal() {
    modal.style.display = "none";
}

function showModal() {
    // Report the user's time taken and number of wrong moves
    document.getElementById("final-time").innerText = seconds2string(parseInt(game.time / 10));
    document.getElementById("mistake-counter").innerText = game.wrongMoves;

    // Calculate how many stars the user has earned (from 0 to 3)
    let stars = 3;
    let wrongMoves = game.wrongMoves;
    let initialPairs = game.initialPairs;
    let time = game.time;

    // Peanalise making too many wrong moves
    if (wrongMoves >= initialPairs) {
        stars -= 1;
        console.log("wrong move penalty 1");
    }
    if (wrongMoves >= initialPairs * 2) {
        stars -= 1;
        console.log("wrong move penalty 2");
    }
    if (wrongMoves >= initialPairs * 3) {
        stars -= 1;
        console.log("wrong move penalty 3");
    }

    // Peanalise taking too much time
    if (time / 10 >= initialPairs * 3.5) {
        stars -= 1;
        console.log("time move penalty 1");
    }
    if (time / 10 >= initialPairs * 7) {
        stars -= 1;
        console.log("time move penalty 2");
    }
    if (time / 10 >= initialPairs * 12) {
        stars -= 1;
        console.log("time move penalty 3");
    }

    if (stars < 0) stars = 0;

    console.log("Stars is " + stars);

    let starChildNodes = document.getElementsByClassName("stars")[0].childNodes;
    let starNodes = [];

    // Filter out the text nodes (we only want the stars, not the whitespace in between)
    for (var i = 0; i < starChildNodes.length; i++) {
        if (starChildNodes[i].nodeType != 3) {
            starNodes.push(starChildNodes[i]);
        }
    }

    // Mark all the stars as being unatained
    for (s of starNodes) {
        s.classList.add("missing");
    }

    // Award the stars the player earned
    for (let i = 0; i < stars; i++) {
        starNodes[i].classList.remove("missing");
    }
    modal.style.display = "block";
}