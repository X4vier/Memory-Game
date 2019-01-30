// Xavier O'Rourke, January 2019

// This script contains code for determining whether a user clicked on a card
const cardDeck = document.querySelector(".deck");
cardDeck.addEventListener('click', deckClick);

function deckClick(e) { // Called when the user clicks somewhere in the deck
    let target = e.target;
    if (target.parentElement.nodeName == 'LI') { // if we clicked directly on a symbol, treat it as if we clicked on the symbol's parent element
        target = target.parentElement;
    }
    if (target.nodeName == 'LI') { // The only <li> elements in the document are the clickable cards
        cardMap[target.id].click(); // This relies on the fact that each card has a numerical id in the DOM
    }
}