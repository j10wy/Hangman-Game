'use strict'

/* ------ SETUP HANGMAN OBJECT ------ */

// Create the hangman object.
var hangman = {};

hangman.gameElement = "#game";

hangman.playing = false;

hangman.state = {
    playing: false,
    score: 0,
    wins: 0,
    losses: 0,
    word: "",
    statusElement: ".status"
}

hangman.hearts = {
    numHearts: 0,
    heartsElement: "#hearts",
    generateHearts: function (lives, element) {
        for (var l = 0; l < lives; l++) {
            // Wrapping each image created in the loop an IFFE, creating a closure around each pixelHeart variable.
            (function () {
                var pixelHeart = document.createElement("img");
                pixelHeart.src = "assets/images/pixel-heart.png";
                pixelHeart.className = "pixelheart";
                element.appendChild(pixelHeart);
            }());
        }
        element.style.display = "block";
    },
    removeHeart: function (className) {
        var hearts = document.querySelectorAll(className);
        var heartContainer = hearts[hearts.length - 1].parentNode;

        // console.log("HEART CONTAINER", heartContainer);

        heartContainer.removeChild(hearts[hearts.length - 1]);
    }
};

hangman.word = {
    numGuesses: 0,
    currentWord: "",
    guessArray: [],
    maskElement: "#mask",
    hintElement: "#hint",
    // Takes the word and html element as parameters
    // Like the pixelHeart mehtod above, maskWord creates a closure around each letterMask var.
    maskWord: function (word, element) {

        for (var l = 0; l < word.length; l++) {

            (function () {
                var letterMask = document.createElement("span");
                letterMask.textContent = "_";
                letterMask.className = "lettermask";
                element.appendChild(letterMask);
            }());
        }
        element.style.display = "block";
    },
    getIndexes: function (arr, val) {
        var indexes = [];
        var i;
        for (i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i);
        return indexes;
    },
    // Create the array of items the user will guess.
    dictionary: [{
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
            hint: "Trained as a Faceless Man at the House of Black and White in Braavos."
        },
        {
            word: "Joffrey",
            hint: "Ned Stark was beheaded by which notorious character"
        },
        {
            word: "Lannister",
            hint: "A ____________ always pays his debts."
        },
        {
            word: "Dragons",
            hint: "Daenerys Stormborn of the House Targaryen is also known as The Mother of..."
        },
        {
            word: "Seven",
            hint: "How many kingdoms are in Westeros?"
        },
        {
            word: "Ned",
            hint: "Which character originally says, 'The man who passes the sentence should swing the word'?"
        },
        {
            word: "Bronn",
            hint: "Jaime Lannister's (previously Tyrion Lannister's) right-hand man is..."
        },
        {
            word: "Ladder",
            hint: "Chaos isn't a pit, it's..."
        },
        {
            word: "Wights",
            hint: "What is the name given to those who are resurrected by the White Walkers?"
        },
        {
            word: "Cersei",
            hint: "Which character says, 'When you play the game of thrones, you win or you die. There is no middle ground.'?"
        }
    ]
}

// Array of background image numbers
hangman.backgrounds = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "13"];

// Gif object contains win/lose property, each has an array of IDs for images on giphy.com
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

    // Listen fot title animation to complete.
    this.animationListener("h1.title", "animationend", function (paramFromEventListener) {
        
        // Display 'Press Enter'
        document.querySelector(".press-start").className += " flash";

        // Play Game of Thrones theme music.
        self.audioElement();
        console.log("%cAnimation complete: " + paramFromEventListener.animationName, "background-color: green; color:white; font-weight:bold; display:block;");
    });

    // Create a reference to the div#hearts, div#mask and div#hint
    var heartsElement = document.querySelector(this.hearts.heartsElement);
    var maskElement = document.querySelector(this.word.maskElement);
    var hintElement = document.querySelector(this.word.hintElement);
    var pressStart = document.querySelector(".press-start");


    // Add a listener for the ENTER key. Add fadeInUp class to trigger the animation. Set hangman.playing to true.
    document.addEventListener("keyup", function (event) {

        pressStart.style.display = "none";

        var key = event.key;

        if (key === 'Enter' && !self.playing) {
            element.className += "fadeInUpBig";
            self.playing = true;

            // Listen for the animations on div#game to complete. Then run hangman.newGame.
            self.animationListener(self.gameElement, "animationend", function (paramFromEventListener) {
                self.newGame();
                console.log("%cAnimation complete: " + paramFromEventListener.animationName, "background-color: green; color:white; font-weight:bold; display:block;");
            });
        } else if (key === 'Enter' && self.playing) {
            // If the player is already in game and hits enter, console.log the message below.
            console.warn("You are already playing a game.");
        } else {
            var key = event.key.toLowerCase();
            var hasKey = self.state.word.indexOf(key) !== -1 ? true : false;
            console.log("VALID KEY:", hasKey);

            // Use the console.count method to display the number of times a key has been pressed.
            console.count(key + " keyup count");

            if (self.word.guessArray.indexOf(key) === -1) {
                // Push the key pressed into the guessArray
                self.word.guessArray.push(key);

                if (key !== 'Enter' && self.playing && hasKey) {
                    self.state.score = self.correctKey(key, self.state.word, self.state.score);
                    if (self.state.score === self.state.word.length) {
                        console.warn("You win!");
                        self.state.wins++
                            self.gameComplete(heartsElement, hintElement, maskElement, "win");
                        self.word.guessArray = [];
                    }
                } else {
                    self.hearts.removeHeart(".pixelheart");
                    self.hearts.numHearts--;
                    if (self.hearts.numHearts === 0) {
                        console.warn("You lose!");
                        self.state.losses++
                            self.gameComplete(heartsElement, hintElement, maskElement, 'lose');
                    }
                    console.log("%cNumber of lives " + self.hearts.numHearts, "background-color: black; color:white; font-weight:bold; display:block;");
                }
            }
        }

    });

}

// Setup a new game
hangman.newGame = function () {

    // Uses my randomize function to grab a random item from hangman.word.dictionary 
    var item = this.randomize(this.word.dictionary);
    this.state.word = item.word.toLowerCase();
    var hint = item.hint.toLowerCase();
    this.hearts.numHearts = parseInt(this.state.word.length);
    this.state.score = 0;
    this.word.guessArray = [];

    // Create a reference to the div#hearts, div#mask and div#hint
    var heartsElement = document.querySelector(this.hearts.heartsElement);
    var maskElement = document.querySelector(this.word.maskElement);
    var hintElement = document.querySelector(this.word.hintElement);
    var statusElement = document.querySelector(".status");
    statusElement.style.display = "none";
    heartsElement.innerHTML = "";
    maskElement.innerHTML = "";
    statusElement = "";

    // Call hangman.hearts generateHearts method. Pass in the number of lives (guesses) and div#hearts.
    this.hearts.generateHearts(this.hearts.numHearts, heartsElement);

    // Call hangman.maskWord method. Pass in the random word and div#mask.
    this.word.maskWord(this.state.word, maskElement);
    hintElement.textContent = hint;
    hintElement.style.display = "block"

    // Log the word and hint to the console for testing (aka cheating).
    console.warn("**** WORD ****", this.state.word);
    console.warn("**** HINT ****", hint);


}

hangman.correctKey = function (key, word, currentScore) {

    console.log("Key Pressed:", key);
    var indexes = this.word.getIndexes(word, key);
    var maskedLetters = document.querySelectorAll(".lettermask");
    indexes.forEach(function (item) {
        console.log("index item:", item);
        maskedLetters[item].textContent = key;
    });
    console.log("Current Score:", currentScore);
    var newScore = parseInt(currentScore + indexes.length);
    console.log("points added:", indexes.length);
    console.log("%cScore  " + newScore, "background-color: blue; color:white; font-weight:bold; display:block;");

    return newScore;

}

// A function used to ranomize the dictionary array, the background images, and the win/loss gifs.
hangman.randomize = function (arr) {
    var numberOfItems = arr.length - 1;
    var min = Math.ceil(0);
    var max = Math.floor(numberOfItems);
    return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}

hangman.gameComplete = function (heartsElement, hintElement, maskElement, result) {

    // Make a reference to the hangman object so newGame() can be called inside setTimeout.
    var self = this;

    // store the HTML game elements in an array for the forEach method below.
    var elements = [heartsElement, hintElement, maskElement];
    var status = document.querySelector(this.state.statusElement);

    // Create win/loss/counter elements to be appended in the status element.
    // WINS
    var winsElement = document.createElement("h3");
    var winsSpan = document.createElement("span");
    winsElement.textContent = "Wins: ";
    winsSpan.textContent = this.state.wins;
    winsElement.appendChild(winsSpan);
    // LOSSES
    var losesElement = document.createElement("h3");
    var losesSpan = document.createElement("span");
    losesElement.textContent = "Losses: ";
    losesSpan.textContent = this.state.losses;
    losesElement.appendChild(losesSpan);
    // COUNTER
    var counterElement = document.createElement("h5");
    var counterSpan = document.createElement("span");
    counterElement.textContent = "Next game: ";
    counterSpan.textContent = 10;
    counterElement.appendChild(counterSpan);

    // Clear the html and set to display:none for each of the items in the elements array.
    elements.forEach(function (element) {
        element.innerHTML = "";
        element.style.display = "none";
    });

    // Display a win/loss gif to the status element.
    this.statusImage(this.state.statusElement, result);

    // Reset the score and guessArray, which are used for each game session.
    this.score = 0;
    this.word.guessArray = [];

    // Append the wins/losses/counter elements to the page.
    status.appendChild(winsElement);
    status.appendChild(losesElement);
    status.appendChild(counterElement);

    // Start the counter for the next game.
    setInterval(function () {

        // Every second deincriment the counter
        counterSpan.textContent--

            // When counter reaches 3, set the color to red.
            if (counterSpan.textContent < 4) {
                counterSpan.style.color = "red";
            }

    }, 1000);

    // Start a new game after 5 seconds.
    setTimeout(function () {
        self.newGame();
    }, 10000);

}

// Sets a random background image from the hangman.backgrounds array.
hangman.setBackground = function (selector) {
    var element = document.querySelector(selector);
    var bg = this.randomize(this.backgrounds);
    element.style.backgroundImage = 'url("assets/images/got-bg-' + bg + '.jpg")';
}

// When the player wins/loses display an image from hangman.gifs object
hangman.statusImage = function (selector, status) {
    var element = document.querySelector(selector);
    var img = document.createElement("img");
    var winOrLose = status === 'win' ? this.randomize(this.gifs.win) : this.randomize(this.gifs.lose);
    img.src = "https://media.giphy.com/media/" + winOrLose + "/giphy.gif";
    element.innerHTML = "";
    element.style.display = "block";
    element.appendChild(img);
}

// Custom listen function tht takes an element, an event and a callback function.
// I use this custom listener mainly to detect the animationend event.
hangman.animationListener = function (selector, event, callback) {
    var element = document.querySelector(selector);
    element.addEventListener(event, callback, false);
}

hangman.audioElement = function () {
    var audioElement = document.createElement("audio");
    audioElement.src = "http://8tracks.s3.amazonaws.com/tf/028/273/276/25013.mp3"
    audioElement.loop = true;
    audioElement.play();
}

/* ------ INITIALIZE GAME ------ */

//Start a new game
hangman.startGame(hangman.gameElement);

// Set a random background everytime the page loads.
hangman.setBackground("div.container");