// Xavier O'Rourke, January 2019

// This script contains functios creating HTML elements such as the deck of cards and the UI menus, and adding them to the document.

function createDeck() { // Create all the cards and add them to the document
    const deck = document.querySelector(".deck");

    numColumns(); // Change the number of columns if necessary

    // Clear old deck of cards (if it exsists)
    deck.innerHTML = "";
    for (let i = 0; i < numCards; i++) {
        const inner = document.createElement("i");
        const card = document.createElement("li")
        card.appendChild(inner);
        card.classList.add("card");
        deck.appendChild(card);
    }

    let symbolList = allSymbols; // List of all the symbols we are going to use this game

    // If there aren't enough unique symbols for each pair to have a unique symbol, we allow duplicates
    while (symbolList.length < numCards / 2) {
        symbolList = symbolList.concat(allSymbols);
    }

    const cards = document.querySelectorAll(".card");

    // Shuffle the symbolList and then only keep as many as we need
    symbolList = shuffle(symbolList);
    symbolList = symbolList.slice(0, Math.floor(numCards/2))

    // Create two of each symbol (since it's a matching game)
    symbolList = symbolList.concat(symbolList);
    symbolList = shuffle(symbolList);


    // Create all the card nodes and their associated javascript objects, and add them to the document
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

// Code for changing the number of columns based on window size and number of cards
let tinyWindow =  window.matchMedia("(max-width: 400px)");
let smallWindow = window.matchMedia("(max-width: 550px)");

tinyWindow.addListener(numColumns); // Attach listener function on state changes
smallWindow.addListener(numColumns); // Attach listener function on state changes
function numColumns() {
    let columns = null;
    if (numCards <= 4) {
        columns = 2;
    } else if (numCards <= 15 || tinyWindow.matches) {
        columns = 3;
    } else if (numCards <= 21 || smallWindow.matches) {
        columns = 4;
    } else {
        columns = 5;
    }
    document.querySelector(":root").style.setProperty('--num-columns', columns);
    
}

document.querySelector(":root").style.setProperty('--flip-duration', flipTime + "ms");
let cardMap = {};
createDeck();