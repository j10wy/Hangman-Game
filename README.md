# Hangman: Game of Thrones Edition
Hangman game homework for UCB bootcamp

### The Game
- Press enter to begin
- In case you're unfamiliar with Game of Thrones, the word is logged to the console using console.warn
- You only need to press a letter once should it appear multiple times in the word.
- During each game session, keys are stored in an array when pressed. The array is evaluated on each press. Repeated keys are ignored. A correct guess will reveal a letter(s), and incorrect guesses remove a heart.
- The score is tracked throughout each game session.
- The win/loss count is stored in the hangman object and displayed at the end of each game.
- A .gif from Giphy loads based on the outcome of the game.
- A new game begins 10 seconds after the previous game finishes. 

## Recap
#### CSS/Layout
I knew from the start I wanted to make it a Game of Thrones (GoT) theme. I started out with the design. I wanted to make it responsive, or at least make everything fluid based on the browsers width and height. I accomplished this mostly using vh/vw units for width and height on everything. I used the [Flexible Math](http://responsv.com/flexible-math/) site to help me create the ratios for each element. The only piece that isn't responsive/fluid is the title, though I did read up a bit on [responsive typography](https://zellwk.com/blog/responsive-typography).

I downloaded TTF fonts for the generic GoT font and used [WOFFer – WOFF font converter](https://andrewsun.com/tools/woffer-woff-font-converter/) to convert the fonts for use on the page. The other fonts rely on Google Fonts and use Times as a fallback.

Finally, I like the animations provided by the animation.css library, but I did not want to include the library in the page for just the two animations I planned to use. So I dug into their source code and pulled out the animations I needed. [1](https://github.com/jeffreylowy/Hangman-Game/blob/master/assets/css/style.css#L23) [2](https://github.com/jeffreylowy/Hangman-Game/blob/master/assets/css/style.css#L46) 

#### JS & Chrome Dev Tools

I went in from the start knowing I wanted to accomplish all of the bonus tasks. Things started out easier enough. As the size of the code grew, and crazier the logic became, I started running into issues with `keyup` events conflicting, variables being undefined when they should have values and variables not updating when they should. Also, if you go through the js code, you'll see that the hangman object is the only global object. There are few places where I store `this` (the hangman object) in a variable named self so I can access the methods of the hangman object in nested functions.

I learned a few cool tricks with Dev Tools:

1. [Adding CSS to console.log statments](https://coderwall.com/p/fskzdw/colorful-console-log) - You can see this [here](https://github.com/jeffreylowy/Hangman-Game/blob/master/assets/js/got-hangman.js#L180) or in the console on keyup events and when animations complete.
2. [Setting breakpoints in the Sources panel](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints)

<img src="https://raw.githubusercontent.com/jeffreylowy/Hangman-Game/master/assets/images/got-arya-wtf-js.png" width="888" alt="DevTools breakpoints">


<img src="https://raw.githubusercontent.com/jeffreylowy/Hangman-Game/master/assets/images/got-css-in-console.PNG" width="888" alt="DevTools CSS">

## Challenges I set for myself
1. Make page responsive/fluid - at the very least I wanted a background that adapted to the window size.
2. Trigger events when animations complete (title, press start, console.logs)
3. Use ESLint with no errors
4. Complete the bonus items in the homework instructions
5. Get a better understanding of the Dev Tools outside of the console and elements tabs.
6. Keep practicing CSS positioning (the dark red sigils in the four corners of the game board)
7. Choose a random background on page load.

## Resources 
[Flexible Math](http://responsv.com/flexible-math/)

[WOFFer – WOFF font converter](https://andrewsun.com/tools/woffer-woff-font-converter/)

[Google Developers - Pause Your Code With Breakpoints](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints)

[MDN - Using CSS animations: Adding the animation event listeners](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations#Adding_the_animation_event_listeners)

[MDN - Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

[MDN - Conditional (ternary) Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

[MDN - Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

[Colorful console.log](https://coderwall.com/p/fskzdw/colorful-console-log)

[Stack Overflow - How to find index of all occurrences of element in array?](https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array)

[Stack Overflow - How to remove an HTML element using Javascript?](https://stackoverflow.com/questions/5933157/how-to-remove-an-html-element-using-javascript)

[A List Apart: More Meaningful Typography](https://alistapart.com/article/more-meaningful-typography)

[zellwk.com: Everything I know about Responsive Web Typography](https://zellwk.com/blog/responsive-typography/)