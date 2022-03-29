import './App.css';
import React from 'react';
import dictionary from './data/five_letter_words.json';

import Keyboard from './Keyboard';
import Letter from './Letter';

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
      currentGuessIndex: 0,
      currentLetterIndex: 0,
      totalGuesses: 6,
      wordLength: 5,
      words: words,
      gameState: "GUESS",  // GUESS, WIN, LOSE
      answer: "QUOTE",
      dictionary: dictionary,
    };
    console.log(this.state.dictionary);
    this.handleKeyboardPress = this.handleKeyboardPress.bind(this);
  }

  handleKeyboardPress(e, Key) {
    if (["WIN", "LOSE"].includes(this.state.gameState)) {
      console.log("GAMEOVER");
      return;
    }

    console.log("Key pressed!!!!!", Key);
    if (Key === "DELETE") {
      this.deleteFromWordGrid();
    }
    else if (Key === "ENTER") {
      this.confirmWord();
    }
    else {
      this.addLetterToWordGrid(Key);
    }
  }

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

  getLastLetter() {
    let currentGuessIndex = this.state.currentGuessIndex;
    let currentLetterIndex = this.state.currentLetterIndex - 1;
    if (currentLetterIndex < 0) {
      return [null, null];
    }
    let currentWord = this.state.words[currentGuessIndex][currentLetterIndex];
    return [currentWord.letter, currentLetterIndex];
  }

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
        <Keyboard handleKeyPress={this.handleKeyboardPress} />
      </div>
    );
  }
}

export default App;
