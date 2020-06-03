const cardUI = document.querySelector('.card-hidden');

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

function Card() {}

const cardFactory = () => {};

const connectDomToRender = () => {};

const characterRender = () => {
    connectDomToRender();
};

const fieldRender = () => {
    connectDomToRender();
};

const deckRender = () => {
    connectDomToRender();
};

const screenRenderOnCharacter = () => {
    characterRender();
    fieldRender();
    deckRender();
};

const playerCharacterGenerate = () => {
    characterRender();
};

const rivalCharacterGenerate = () => {
    characterRender();
};

const characterGenerate = () => {
    playerCharacterGenerate();
    rivalCharacterGenerate();
};

const playerDeckGenerate = () => {
    deckRender();
};

const rivalDeckGenerate = () => {
    deckRender();
};

const deckGenerate = () => {
    playerDeckGenerate();
    rivalDeckGenerate();
};

const actionToAttck = () => {};

const actionToSummon = () => {};

const init = () => {
    deckGenerate();
    characterGenerate();
    screenRenderOnCharacter();
    screenRenderOnCharacter();
};

init();
