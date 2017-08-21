'use strict'

/* ------ SETUP HANGMAN OBJECT ------ */

// Create the hangman object.
var hangman = {};

hangman.playing = false;

// Create the array of items the user will guess.
hangman.dictionary = ["Ned", "Catelyn", "Jon Snow"];

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

hangman.startGame = function(selector) {
    var isPlaying = this.playing;
    var element = document.querySelector(selector);
    document.addEventListener("keyup", function(event) {
        if (event.key === 'Enter' && !isPlaying) {
            element.className += "fadeInStart";
            isPlaying = true;
        }
        else if (event.key === 'Enter' && isPlaying) {
            console.log("You are already playing a game.");
        }
    });
}

// A function used to ranomize the dictionary array, the background images, and the win/loss gifs.
hangman.randomize = function(arr) {
    var numberOfItems = arr.length - 1;
    var min = Math.ceil(0);
    var max = Math.floor(numberOfItems);
    return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}

// Sets a random background image from the hangman.backgrounds array.
hangman.setBackground = function(selector) {
    var element = document.querySelector(selector);
    var bg = hangman.randomize(hangman.backgrounds);
    element.style.backgroundImage = 'url("assets/images/got-bg-' + bg + '.jpg")';
}

hangman.statusImage = function(selector, status) {
    var element = document.querySelector(selector);
    var img = document.createElement("img");
    var winOrLose = status === 'win' ? hangman.randomize(hangman.gifs.win) : hangman.randomize(hangman.gifs.lose);
    img.src = "https://media.giphy.com/media/" + winOrLose + "/giphy.gif";
    element.innerHTML = "";
    element.appendChild(img);
}

// Custom listen function tht takes an element, an event and a callback function.
hangman.listen = function(selector, event, callback) {
    var element = document.querySelector(selector);
    element.addEventListener(event, callback, false);
}

/* ------ INITIALIZE GAME ------ */

hangman.startGame("#game");

hangman.listen("h1.title", "animationend", function(param) {
    console.log("Animation complete:", param.animationName);
});

hangman.setBackground("div.container");