const cardUI = document.querySelector('.card-hidden .card');
const button = document.querySelector('#turn-btn');

const rivalCharacter = {
    characterUI: document.querySelector('#rival-hero'),
    deckUI: document.querySelector('#rival-deck'),
    fieldUI: document.querySelector('#rival-cards'),
    costText: document.querySelector('#rival-cost'),
    characterData: [],
    deckData: [],
    fieldData: [],
    selectedCardUI: null,
    selectedCardData: null,
};
const playerCharacter = {
    characterUI: document.querySelector('#my-hero'),
    deckUI: document.querySelector('#my-deck'),
    fieldUI: document.querySelector('#my-cards'),
    costText: document.querySelector('#my-cost'),
    characterData: [],
    deckData: [],
    fieldData: [],
    selectedCardUI: null,
    selectedCardData: null,
};

let isStart = false;
let whoseTurn = true;
let turnTimer;

function Card(isCharacter, whichPlayer) {
    if (isCharacter) {
        this.attackDamage = Math.floor(Math.random() * 2) + 1;
        this.healthPoints = Math.floor(Math.random() * 5) + 30;
        this.character = true;
        this.field = true;
    } else {
        this.attackDamage = Math.floor(Math.random() * 5) + 1;
        this.healthPoints = Math.floor(Math.random() * 5) + 1;
        this.cost = Math.floor((this.attackDamage + this.healthPoints) / 2);
        this.character = false;
        this.field = false;
    }

    this.isInit = true;
    this.isDone = false;

    if (whichPlayer) {
        this.ownBy = true;
    } else {
        this.ownBy = false;
    }
}

const cardFactory = (isCharacter, whichPlayer) => {
    return new Card(isCharacter, whichPlayer);
};

const connectDomToRender = (data, domElement, isCharacter) => {
    const card = cardUI.cloneNode(true);

    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.attackDamage;
    card.querySelector('.card-hp').textContent = data.healthPoints;

    if (isCharacter) {
        const cardName = document.createElement('div');
        cardName.textContent = 'Champ';
        card.querySelector('.card-cost').style.display = 'none';
        card.appendChild(cardName);
    }

    if (data.isDone) {
        card.classList.add('card-turnover');
    }

    card.addEventListener('click', () => {
        actionOnTurn(card, data);
    });

    domElement.appendChild(card);
};

const characterRender = (object) => {
    object.characterUI.innerHTML = '';
    connectDomToRender(object.characterData, object.characterUI, true);
};

const fieldRender = (object) => {
    object.fieldUI.innerHTML = '';
    object.fieldData.forEach((data) => {
        connectDomToRender(data, object.fieldUI, false);
    });
};

const deckRender = (object) => {
    object.deckUI.innerHTML = '';
    object.deckData.forEach((data) => {
        connectDomToRender(data, object.deckUI, false);
    });
};

const screenRenderOnCharacter = (whichPlayer) => {
    const object = whichPlayer ? playerCharacter : rivalCharacter;
    deckRender(object);
    characterRender(object);
    fieldRender(object);
};

const playerCharacterGenerate = () => {
    playerCharacter.characterData = cardFactory(true, true);
    characterRender(playerCharacter);
};

const rivalCharacterGenerate = () => {
    rivalCharacter.characterData = cardFactory(true, false);
    characterRender(rivalCharacter);
};

const characterGenerate = () => {
    playerCharacterGenerate();
    rivalCharacterGenerate();
};

const playerDeckGenerate = (count) => {
    if (playerCharacter.deckData.length < 10) {
        for (let i = 0; i < count; i++) {
            playerCharacter.deckData.push(cardFactory(false, true));
        }
    }
    deckRender(playerCharacter);
};

const rivalDeckGenerate = (count) => {
    if (rivalCharacter.deckData.length < 10) {
        for (let i = 0; i < count; i++) {
            rivalCharacter.deckData.push(cardFactory(false, false));
        }
    }
    deckRender(rivalCharacter);
};

const deckGenerate = (count) => {
    playerDeckGenerate(count);
    rivalDeckGenerate(count);
};

const dataInitialize = () => {
    [rivalCharacter, playerCharacter].forEach((character) => {
        character.characterData = [];
        character.deckData = [];
        character.fieldData = [];
        character.selectedCardUI = null;
        character.selectedCardData = null;
    });
};

const selectedCardInitialize = () => {
    [rivalCharacter, playerCharacter].forEach((character) => {
        character.selectedCardUI = null;
        character.selectedCardData = null;
    });
};

const actionToSummon = (data) => {
    const object = whoseTurn ? playerCharacter : rivalCharacter;
    const currentCost = Number(object.costText.textContent);

    if (object.fieldData.length > 4) {
        return;
    }

    if (currentCost >= data.cost) {
        const index = object.deckData.indexOf(data);
        data.field = true;
        data.init = true;
        object.deckData.splice(index, 1);
        object.fieldData.push(data);

        deckRender(object);
        fieldRender(object);

        object.costText.textContent = currentCost - data.cost;
    } else {
        return;
    }
};

const actionOnTurn = (card, data) => {
    const turnCharacter = whoseTurn ? playerCharacter : rivalCharacter;
    const oppositeCharacter = whoseTurn ? rivalCharacter : playerCharacter;

    const isTurnsCard = data.ownBy === whoseTurn;

    if (!isTurnsCard && data.field && turnCharacter.selectedCardUI) {
        data.healthPoints =
            data.healthPoints - turnCharacter.selectedCardData.attackDamage;

        if (data.healthPoints <= 0) {
            if (data.character) {
                const message = whoseTurn
                    ? '1 player Victory'
                    : '2 player Victory';
                alert(message);
                init(0);
                return;
            }
            const index = oppositeCharacter.fieldData.indexOf(data);
            oppositeCharacter.fieldData.splice(index, 1);
        }

        turnCharacter.selectedCardData.isDone = true;

        selectedCardInitialize();
        screenRenderOnCharacter(true);
        screenRenderOnCharacter(false);

        return;
    }

    if (data.isDone || !isTurnsCard) {
        return;
    }

    if (data.field) {
        if (!data.isInit) {
            document.querySelectorAll('.card').forEach((item) => {
                return item.classList.remove('card-selected');
            });

            card.classList.add('card-selected');
            turnCharacter.selectedCardUI = card;
            turnCharacter.selectedCardData = data;
        } else {
            return;
        }
    } else {
        actionToSummon(data);
    }
};

const actionTurnOver = () => {
    clearTimeout(turnTimer);
    turnTimer = setTimeout(() => {
        actionTurnOver();
    }, 60 * 1000);
    document.querySelector('#rival').classList.toggle('turn');
    document.querySelector('#my').classList.toggle('turn');
    document.querySelector('#rival').classList.toggle('not-turn');
    document.querySelector('#my').classList.toggle('not-turn');

    const object = whoseTurn ? playerCharacter : rivalCharacter;

    object.fieldData.forEach((data) => {
        data.isInit = false;
        data.isDone = false;
    });

    object.characterData.isInit = false;
    object.characterData.isDone = false;

    screenRenderOnCharacter(true);
    screenRenderOnCharacter(false);

    whoseTurn = !whoseTurn;
    whoseTurn ? playerDeckGenerate(1) : rivalDeckGenerate(1);

    playerCharacter.costText.textContent = 10;
    rivalCharacter.costText.textContent = 10;

    selectedCardInitialize();
};

const init = (count) => {
    document.querySelector('#rival').classList.remove('turn');
    document.querySelector('#rival').classList.add('not-turn');
    document.querySelector('#my').classList.remove('not-turn');
    document.querySelector('#my').classList.add('turn');
    whoseTurn = true;

    dataInitialize();

    if (count > 0) {
        deckGenerate(count);
        characterGenerate();
        screenRenderOnCharacter(true);
        screenRenderOnCharacter(false);
    } else {
        isStart = false;
        button.textContent = 'Start';
        document.querySelector('#btns .reset').remove();
        playerCharacter.deckUI.textContent = 'Deck';
        rivalCharacter.deckUI.textContent = 'Deck';
        playerCharacter.characterUI.innerHTML = '';
        rivalCharacter.characterUI.innerHTML = '';
        playerCharacter.fieldUI.innerHTML = '';
        rivalCharacter.fieldUI.innerHTML = '';
    }
};

button.addEventListener('click', () => {
    if (!isStart) {
        isStart = true;

        const gameResetButton = document.createElement('button');
        gameResetButton.textContent = 'Reset Game';
        gameResetButton.classList.add('reset');
        gameResetButton.addEventListener('click', () => {
            init(0);
        });

        button.textContent = 'Turn Over';

        document.querySelector('#btns').appendChild(gameResetButton);

        init(5);
    } else {
        actionTurnOver();
    }
});
