class Card {
    constructor(number, symbol) {
        this.number = number;
        this.symbol = symbol;
        this.faceDown = true;
        this.element = document.querySelector("#card" + number);
        this.innerElement = this.element.querySelector("i");
        this.innerElement.className = "fas fa-question";
        this.clickable = true;
    }

    getElement() {
        return document.querySelector("#card" + this.number);
    }

    getInnerElement() {
        return this.getElement().querySelector("i");
    }

    flip() {
        this.clickable = !this.clickable;


        let element = this.getElement();
        let inner = this.getInnerElement();
        let symbol = this.symbol;

        element.classList.remove("incorrect");
        element.classList.add("flipping1");
        setTimeout(
            function () {
                element.classList.add("flipping2");
                element.classList.remove("flipping1");
                element.classList.toggle("face-down");
                this.faceDown = !this.faceDown;
                inner.classList.toggle("fa-question");
                inner.classList.toggle("fa-" + symbol)
            }, flipTime * 0.95);
        setTimeout(
            function () {
                element.classList.remove("flipping2");
            }, 2 * flipTime * 0.95);

    }

    click() {
        if (!this.clickable || game.faceUpCards >= 2) return false;
        this.flip();
        game.faceUpCards += 1;
        if (game.faceUpCards == 1) {
            game.firstCard = this;
        } else if (game.faceUpCards == 2) {
            game.secondCard = this;
            game.testMatch();
        }
    }
}