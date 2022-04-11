import './App.css';
import React from 'react';
import dictionary from './data/five_letter_words.json';

import Keyboard from './Keyboard';
import Letter from './Letter';

/* The App class is the main class that renders the entire game. It contains the
state of the game, and the logic for the game */
class App extends React.Component {
  constructor(props) {
    super(props);
    const totalGuesses = 6;
    const wordLength = 5;

    document.title = props.title;


    let words = [];
    for (let i = 0; i < totalGuesses; i++) {
      let word = [];
      for (let j = 0; j < wordLength; j++) {
        word.push({
          letter: null,
          letterState: null,
          key: `${i}-${j}`,
          guessIndex: i,
          letterIndex: j
        });
      }
      words.push(word);
    }

    this.state = {
      title: props.title,
      currentGuessIndex: 0,  // board state -- which guess we're on
      currentLetterIndex: 0,  // board state -- which letter we're on in the word
      totalGuesses: 6,  // board init -- how many guesses in the game
      wordLength: 5,  // board init -- how many characters in the word
      words: words,  // the state of the guesses on the board
      gameState: "GUESS",  // GUESS, WIN, LOSE
      answer: "QUOTE",  // The current word to guess.
      dictionary: dictionary, // All the words to choose from
    };

    console.log(this.state.dictionary);
    this.handleKeyboardButtonClick = this.handleKeyboardButtonClick.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownHandler);
  }

  keyDownHandler(event) {
    console.log("keypress event", event);
    let key = event.key.toUpperCase();
    this.handleKeyboardButtonClick(event, key);

  }

  /**
   * If the game is over, ignore the key press. Otherwise, if the key is a
   * backspace, delete a letter from the word grid. If the key is an enter, confirm
   * the word. If the key is a letter, add the letter to the word grid
   * @param e - The event object
   * @param Key - The key that was pressed
   * @returns the state of the game.
   */
  handleKeyboardButtonClick(e, Key) {
    if (["WIN", "LOSE"].includes(this.state.gameState)) {
      console.log("GAMEOVER");
      return;
    }

    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    console.log("Key pressed!!!!!", Key);

    if (Key === "DELETE" || Key === "BACKSPACE") {
      this.deleteFromWordGrid();
    }
    else if (Key === "ENTER") {
      this.confirmWord();
    }
    else if (alphabet.includes(Key)) {
      this.addLetterToWordGrid(Key);
    }
    else {
      console.log("Ignore unknown key", Key);
    }
  }

  /**
   * It takes the current word from the state, maps over it, and returns the
   * letters that have been guessed
   * @returns The current word that the user is trying to guess.
   */
  getCurrentWord() {
    let letters = this.state.words[this.state.currentGuessIndex]
    let word = letters.map((letter) => {
      if (letter.letter !== null) {
        return letter.letter;
      }
      else {
        return null;
      }
    });
    word = word.filter(a => a);
    return word.join('');
  }

  /**
   * It returns the last letter of the current word, and the index of that letter
   * @returns An array with the current letter and the current letter index.
   */
  getLastLetter() {
    let currentGuessIndex = this.state.currentGuessIndex;
    let currentLetterIndex = this.state.currentLetterIndex - 1;
    if (currentLetterIndex < 0) {
      return [null, null];
    }
    let currentWord = this.state.words[currentGuessIndex][currentLetterIndex];
    return [currentWord.letter, currentLetterIndex];
  }

  /**
   * We're going to get the last letter in the word grid, and if it's not null,
   * we're going to set it to null
   * @returns The last letter in the word grid.
   */
  deleteFromWordGrid() {
    console.log("DELETING Letter from WordGrid!");

    let [letter, letterIndex] = this.getLastLetter();
    if (letterIndex === null) {
      console.log("Can't delete any further, doing nothing...");
      return;
    }
    if (letter !== null) {
      this.setState(function (state, props) {
        let currentWords = state.words;
        currentWords[state.currentGuessIndex][state.currentLetterIndex - 1].letter = null;

        return {
          ...state,
          currentLetterIndex: state.currentLetterIndex - 1,
          words: currentWords,
        };
      });
    }
  }

  /**
   * If the player has added enough letters to the current guess, check if the
   * current guess is a valid word. If it is, check if it's the answer. If it's not
   * the answer, move to the next guess
   * @returns The current word in the word grid.
   */
  confirmWord() {
    console.log("Confirming latest word in WordGrid!");
    if (this.canAddLetter() === true) {
      alert("Add More Letters");
      return;
    }

    let currentWord = this.getCurrentWord();
    if (!this.state.dictionary.includes(currentWord)) {
      // Not a valid word, continue letting the player edit the current guess
      console.log("NOT A VALID WORD: ", currentWord);
      alert("Not a valid word, choose another one.");
      return;
    }
    else {
      // Valid dictionary word
      if (currentWord === this.state.answer) {
        this.setState({ gameState: "WIN" });
        alert("YOU GUESSED IT! ", currentWord);
        return;
      }
    }

    if (this.state.currentGuessIndex === this.state.wordLength - 1) {
      console.log("LOSE!");
      this.setState({ gameState: "LOSE" });
      return;
    }

    // Valid Word, wrong guess Increment board state for new guesses.
    this.setState(function (state, props) {
      console.log("Moving to next guess");
      let newGuessIndex = state.currentGuessIndex;
      let newLetterIndex = state.currentLetterIndex;
      if (newGuessIndex + 1 < state.totalGuesses) {
        newGuessIndex = state.currentGuessIndex + 1;
        newLetterIndex = 0;
      }
      return {
        currentGuessIndex: newGuessIndex,
        currentLetterIndex: newLetterIndex,
      }
    });
  }

  /**
   * If the current letter index is greater than or equal to the word length,
   * return false. Otherwise, if the current letter is null, return true.
   * Otherwise, return false
   * @returns A boolean value.
   */
  canAddLetter() {
    if (this.state.currentLetterIndex >= this.state.wordLength) {
      return false;
    }

    let currentLetter = this.state.words[this.state.currentGuessIndex][this.state.currentLetterIndex].letter;
    if (currentLetter === null) {
      return true;
    }

    return false;
  }

  /**
   * We're updating the state of the current letter in the current word in the
   * current guess
   * @param letter - The letter to add to the word grid
   * @returns The state is being returned.
   */
  addLetterToWordGrid(letter) {
    console.log(`Entering letter ${letter} into WordGrid!`, this.state);

    if (this.canAddLetter() === false) {
      alert("Can't Add More Letters");
      return;
    }


    this.setState(function (state, props) {
      let currentWords = state.words;
      currentWords[state.currentGuessIndex][state.currentLetterIndex].letter = letter;

      let newLetterIndex = state.currentLetterIndex;
      newLetterIndex = state.currentLetterIndex + 1;
      return {
        words: currentWords,
        currentLetterIndex: newLetterIndex,
      }
    });

  }

  /**
   * We map over the words array in state, and for each word, we map over the
   * letters array in state, and for each letter, we render a Letter component
   * @returns The return statement is returning the JSX that will be rendered to
   * the DOM.
   */
  render() {
    const wordElements = this.state.words.map((word, index) => (
      <div className="WordGuessRow" key={index}>
        {
          word.map(
            ({ letter, letterState, key, guessIndex, letterIndex }) => (
              < Letter letter={letter} letterState={letterState} key={key} guessIndex={guessIndex} letterIndex={letterIndex} />
            )
          )
        }
      </div>));

    return (
      <div id="App" className="App">
        <h1 className="App-nav">{this.state.title}</h1>
        <div className="WordGrid">
          <div className="WordGridContainer container">
            {wordElements}
          </div>
        </div>
        <Keyboard handleKeyPress={this.handleKeyboardButtonClick} />
      </div>
    );
  }
}

export default App;
