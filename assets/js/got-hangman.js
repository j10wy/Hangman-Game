'use strict'

/* ------ SETUP HANGMAN OBJECT ------ */

// Create the hangman object.
var hangman = {};

hangman.playing = false;

hangman.gameElement = "#game";

// Create the array of items the user will guess.
hangman.dictionary = [{
        word: "Valyrian",
        hint: "This steel is recognizable by its strength and light weight in comparison to ordinary steel, as well as by a distinctive rippled pattern visible in blades made from it."
    },
    {
        word: "Blindness",
        hint: "Arya's punishment for stealing from the Many-Face God."
    },
    {
        word: "Daenerys",
        hint: "First of Her Name, the Unburnt, Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea, Breaker of Chains, and Mother of Dragons."
    },
    {
        word: "Arya",
        hint: "trained as a Faceless Man at the House of Black and White in Braavos."
    }
];

// Array of background image numbers
hangman.backgrounds = ["01", "02", "03", "04", "05", "06"];

hangman.gifs = {
    win: [
        "l41YedIbenuBH6ljO",
        "fmd46gcrNQJePMU6xa",
        "ojdRC2Om3auJ2",
        "kMPvrEaaN6pDa",
        "NyvaiYod2ShwI",
        "xsimko4u3Rjgc",
        "3rTclqDcLv6rC",
        "tk8aCAvTg8Hjq",
        "13M4Ki3u5orBe0",
        "9k43iUX5LRZ6M"
    ],
    lose: [
        "3oEjHPidPZtRe1clRC",
        "l41Yytj6Qt1p8toqs",
        "3oEjHSCvhAFI4IFHoc",
        "xT1XGv5SmVjoFgMYda",
        "rzDJLsavSLDoc",
        "gJZDcgjgJ4BkA",
        "k5IOCbmBRj8bu",
        "qf1S370w70inS",
        "oHwCWI24gd3dS",
        "ESTkKpEPVG4aA",
        "26Bnc1dYtp3SvCfDi"
    ]
}


/* ------ HANGMAN METHODS ------ */

// Takes the div#game element as a parameter 
hangman.startGame = function (selector) {

    //Store reference to the hangman object and div#game in a variable. 
    var self = this;
    var element = document.querySelector(selector);

    // Add a listener for the ENTER key. Add fadeInUp class to trigger the animation. Set hangman.playing to true.
    document.addEventListener("keyup", function (event) {
        if (event.key === 'Enter' && !self.playing) {
            element.className += "fadeInUp";
            self.playing = true;

            // Listen for the animations on div#game to complete. Then run hangman.newGame.
            self.listen(hangman.gameElement, "animationend", function (param) {
                self.newGame();
                console.log("Animation complete:", param.animationName);
            });
        } else if (event.key === 'Enter' && self.playing) {
            console.log("You are already playing a game.");
        }
    });
}

hangman.newGame = function () {
    var item = hangman.randomize(hangman.dictionary);
    var word = item.word;
    var hint = item.hint;

    var gameBoard = document.querySelector(hangman.gameElement);
    var hintElement = document.createElement("h1");
    hintElement.className += 'hint';
    hintElement.innerHTML = hint;

    var wordElement = document.createElement("h1");
    wordElement.className += 'word';
    wordElement.innerHTML = word;

    gameBoard.appendChild(hintElement);
    gameBoard.appendChild(wordElement);

    // Log the word and hint to the console for testing (aka cheating).
    console.log("WORD:", word);
    console.log("HINT:", hint);
}

// A function used to ranomize the dictionary array, the background images, and the win/loss gifs.
hangman.randomize = function (arr) {
    var numberOfItems = arr.length - 1;
    var min = Math.ceil(0);
    var max = Math.floor(numberOfItems);
    return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}

// Sets a random background image from the hangman.backgrounds array.
hangman.setBackground = function (selector) {
    var element = document.querySelector(selector);
    var bg = hangman.randomize(hangman.backgrounds);
    element.style.backgroundImage = 'url("assets/images/got-bg-' + bg + '.jpg")';
}

hangman.statusImage = function (selector, status) {
    var element = document.querySelector(selector);
    var img = document.createElement("img");
    var winOrLose = status === 'win' ? hangman.randomize(hangman.gifs.win) : hangman.randomize(hangman.gifs.lose);
    img.src = "https://media.giphy.com/media/" + winOrLose + "/giphy.gif";
    element.innerHTML = "";
    element.appendChild(img);
}

// Custom listen function tht takes an element, an event and a callback function.
hangman.listen = function (selector, event, callback) {
    var element = document.querySelector(selector);
    element.addEventListener(event, callback, false);
}

/* ------ INITIALIZE GAME ------ */

hangman.startGame(hangman.gameElement);

hangman.listen("h1.title", "animationend", function (param) {
    console.log("Animation complete:", param.animationName);
});

hangman.setBackground("div.container");