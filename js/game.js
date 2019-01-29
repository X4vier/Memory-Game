// let game = {
//     matches: 0,
//     pairsRemaining: numCards/2,
//     faceUpCards: 0,
//     firstCard: null,
//     secondCard: null,
//     testMatch: function() {
//         if (game.firstCard.symbol == game.secondCard.symbol) {
//             game.firstCard.element.classList.add("matched");
//             game.secondCard.element.classList.add("matched");
//             game.faceUpCards = 0;
//             game.pairsRemaining -= 1;
//         } else {
//             game.firstCard.element.classList.add("incorrect");
//             game.secondCard.element.classList.add("incorrect");
//             setTimeout( function() {
//                 game.firstCard.flip();
//                 game.secondCard.flip();
//                 game.faceUpCards = 0;
//             }, 500)
            
//         }
//     },
//     time: -1,
//     clock: function() {
//         game.time += 1;
//         document.querySelector("#time-data").innerHTML = seconds2string(game.time);
//         document.querySelector("#cards-data").innerHTML = game.pairsRemaining;
//         setTimeout(game.clock, 1000);
//     }

// }

function seconds2string(seconds) {
    let s = seconds % 60;
    let m = (seconds - s) / 60;
    s = s.toString();
    m = m.toString();
    while (s.length < 2) s = "0"+s;
    while (m.length < 2) m = "0"+m;
    return m+":"+s;
}



class gameObject {

    constructor() {
        this.matches = 0;
        this.pairsRemaining = numCards/2;
        this.firstCard = null;
        this.secondCard = null;
        this.time = -1;
        this.faceUpCards= 0;
        this.deleted = false;
    }

    testMatch() {
        var self = this;
        if (this.firstCard.symbol == this.secondCard.symbol) {
            this.firstCard.element.classList.add("matched");
            this.secondCard.element.classList.add("matched");
            this.faceUpCards = 0;
            this.pairsRemaining -= 1;
        } else {
            this.firstCard.element.classList.add("incorrect");
            this.secondCard.element.classList.add("incorrect");
            setTimeout(function() {
                self.firstCard.flip();
                self.secondCard.flip();
                self.faceUpCards = 0;
            }, 500)
            
        }
    }

    clock() {
        var self = this;
        this.time += 1;
        document.querySelector("#time-data").innerHTML = seconds2string(this.time);
        document.querySelector("#cards-data").innerHTML = this.pairsRemaining;
        function reClock(){
            self.clock();
        }
        if (self.pairsRemaining > 0 && !self.deleted) setTimeout(reClock, 1000);
    }

}

function restartGame() {
    if (game) {
        game.deleted = true;
        delete game;
    }


    let selectMenu = document.getElementById("pairs-picker")
    numCards = 2 * selectMenu.options[selectMenu.selectedIndex].value;
    game = new gameObject();
    createDeck();
    game.clock();
}

game = new gameObject();
restartGame();