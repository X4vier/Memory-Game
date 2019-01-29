function createDeck() {
    const deck = document.querySelector(".deck");

    // Clear old deck of cards (if it exsists)
    deck.innerHTML = "";
    for (let i = 0; i < numCards; i++) {
        const inner = document.createElement("i");
        const card = document.createElement("li")
        card.appendChild(inner);
        card.classList.add("card");
        deck.appendChild(card);
    }

    let symbolList = allSymbols;

    // If there are more pairs than available symbols
    while (symbolList.length < numCards / 2) {
        symbolList = symbolList.concat(symbolList);
    }

    const cards = document.querySelectorAll(".card");

    symbolList = shuffle(symbolList);
    symbolList = symbolList.slice(0, Math.floor(numCards/2))
    symbolList = symbolList.concat(symbolList);
    symbolList = shuffle(symbolList);


    // Generate all the card objects

    for (let i = 0; i < numCards; i++) {
        cards[i].id = "card" + i;
        let newCard = new Card(i, symbolList[i])
        cardMap[cards[i].id] = newCard;
    }


    // Fill the dropdown menu where you select how many pairs you want (if it hasn't been done yet)

    let pairMenu = document.getElementById("pairs-picker");
    if (pairMenu.innerHTML == "") {
        for (let i = 2; i <= 20; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.innerText = "#Pairs: "+i;
            if (i == 10) {
                option.selected = "selected";
            }
            pairMenu.appendChild(option);
        }
    }

    numColumns(); // Change the number of columns if necessary


}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let tinyWindow =  window.matchMedia("(max-width: 400px)");
let smallWindow = window.matchMedia("(max-width: 550px)");

tinyWindow.addListener(numColumns); // Attach listener function on state changes
smallWindow.addListener(numColumns);
function numColumns(numCards) {
    console.log("numColumns called!")
    let columns = 0;
    if (numCards <= 4) columns = 2;
    else if (numCards <= 15 || tinyWindow.matches)  columns = 3;
    else if (numCards <= 24 || smallWindow.matches) columns = 4;
    else columns = 5;
    document.querySelector(":root").style.setProperty('--num-columns', columns);
    
}

document.querySelector(":root").style.setProperty('--flip-duration', flipTime + "ms");
let cardMap = {};
createDeck();