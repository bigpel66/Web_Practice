const cardUI = document.querySelector('.card-hidden .card');
const button = document.querySelector('#turn-btn');

const rivalCharacter = {
    characterUI: document.querySelector('#rival-hero'),
    deckUI: document.querySelector('#rival-deck'),
    fieldUI: document.querySelector('#rival-cards'),
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
    characterData: [],
    deckData: [],
    fieldData: [],
    selectedCardUI: null,
    selectedCardData: null,
};

let isStart = false;
let whoseTurn = true;

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

    card.addEventListener('click', actionOnTurn);

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
    for (let i = 0; i < count; i++) {
        playerCharacter.deckData.push(cardFactory(false, true));
    }
    deckRender(playerCharacter);
};

const rivalDeckGenerate = (count) => {
    for (let i = 0; i < count; i++) {
        rivalCharacter.deckData.push(cardFactory(false, false));
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
        character.selectedCardUI = [];
        character.selectedCardData = [];
    });
};

const actionToAttck = () => {};

const actionToSummon = () => {};

const actionOnTurn = () => {};

const actionTurnOver = () => {
    const object = whoseTurn ? playerCharacter : rivalCharacter;

    document.querySelector('#rival').classList.toggle('turn');
    document.querySelector('#my').classList.toggle('turn');
    document.querySelector('#rival').classList.toggle('not-turn');
    document.querySelector('#my').classList.toggle('not-turn');
};

const init = (count) => {
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

        init(8);
    } else {
        actionTurnOver();
    }
});
