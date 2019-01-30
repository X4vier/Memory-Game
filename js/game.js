// Xavier O'Rourke, January 2019

// This file contains the game logic

function seconds2string(seconds) { // Integer -> String, e.g. seconds2string(185) == "02:05"
    let s = seconds % 60;
    let m = (seconds - s) / 60;
    s = s.toString();
    m = m.toString();
    while (s.length < 2) s = "0" + s;
    while (m.length < 2) m = "0" + m;
    return m + ":" + s;
}



class gameObject { // Object which encapsulates all of the relevant game data (aside from which cards are where)

    constructor() {
        this.initialPairs = numCards / 2;
        this.pairsRemaining = numCards / 2;
        this.firstCard = null; // First card we clicked when guessing a pair
        this.secondCard = null; // Second card we clicked when guessing a pair
        this.time = -1; // miliseconds
        this.faceUpCards = 0; // how many un-matched cards are currently face-up
        this.deleted = false; // is this object ready to be deleted? (used to dissable the clock, after which garbage collection happens automatically)
        this.wrongMoves = 0; // number of wrong moves the player has made
        this.stars = 3; // number of stars the player currently has
    }

    testMatch() { // Check whether the two cards the player clicked are a match
        var self = this;
        if (self.firstCard.symbol == self.secondCard.symbol) { // Is a match
            self.firstCard.element.classList.add("matched");
            self.secondCard.element.classList.add("matched");
            self.faceUpCards = 0;
            self.pairsRemaining -= 1;
            if (self.pairsRemaining == 0) { // End the game if there are no pairs remaining
                setTimeout(showModal, 500);
            }
        } else { // The two cards we clicked weren't a match
            self.firstCard.element.classList.add("incorrect");
            self.secondCard.element.classList.add("incorrect");
            self.wrongMoves += 1;
            setTimeout(function () { // flip the cards back over
                self.firstCard.flip();
                self.secondCard.flip();
                self.faceUpCards = 0;
            }, 500)

        }
    }

    clock() { // Keep counting up the time and updating the UI
        var self = this;
        if (self.deleted) return; // terminate clock loop if game is done.        
        this.time += 1; // clock tick

        let newStars = 3;
        let wrongMoves = game.wrongMoves;
        let initialPairs = game.initialPairs;
        let time = game.time;
        // Peanalise making too many wrong moves
        if (wrongMoves >= initialPairs) {
            newStars -= 1;
        }
        if (wrongMoves >= initialPairs * 2) {
            newStars -= 1;
        }
        if (wrongMoves >= initialPairs * 3) {
            newStars -= 1;
        }

        // Peanalise taking too much time
        if (time / 10 >= initialPairs * 3.5) {
            newStars -= 1;
        }
        if (time / 10 >= initialPairs * 7) {
            newStars -= 1;
        }
        if (time / 10 >= initialPairs * 12) {
            newStars -= 1;
        }

        if (newStars < 0) newStars = 0;

        game.stars = newStars;



        document.querySelector("#time-data").innerHTML = seconds2string(parseInt(self.time / 10)); // update clock UI
        document.querySelector("#cards-data").innerHTML = self.pairsRemaining; // update "pairs remaining" UI
        document.querySelector("#moves-data").innerText = self.wrongMoves; // update "wrong moves" UI

        let starsHTML = "";
        for (let i = 0; i < self.stars; i++) {
            starsHTML += "<i class='fas fa-star'></i>"
        }
        document.querySelector("#stars-data").innerHTML = starsHTML; // update "wrong moves" UI

        // Call the clock again in 0.1 seconds
        function reClock() {
            self.clock();
        }
        if (self.pairsRemaining > 0) setTimeout(reClock, 100);
    }

}

function restartGame() {
    // Remove the old game
    if (typeof game != "undefined") {
        game.deleted = true; // flag for garbage collection
        delete game; // free up the variable name
    }

    // Work out how many pairs the user wants to play with next
    let selectMenu = document.getElementById("pairs-picker")
    numCards = 2 * selectMenu.options[selectMenu.selectedIndex].value;
    game = new gameObject();
    createDeck();
    game.clock();
}


// Start a new game when page loaded for first time

restartGame();