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


    let stars = game.stars;

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