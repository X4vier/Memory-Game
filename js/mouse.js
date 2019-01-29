const cardDeck = document.querySelector(".deck");
cardDeck.addEventListener('click', cardClick);

function cardClick(e) {
    let target = e.target;
    if (target.parentElement.nodeName == 'LI') {
        target = target.parentElement;
    }
    if (target.nodeName == 'LI') {
        cardMap[target.id].click();
    }
}