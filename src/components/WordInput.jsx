import React, { Component } from "react";

class WordInput extends Component {
  // constructor(props) {
  //   super(props);
  // this.state = { words: [] };
  // }
  // handleKeyDown(event) {
  //   const word = document.querySelector("#word-input").value;
  //   const possibleWords = [];
  //   fetch(`http://api.datamuse.com/words?sp=${word}*`).then(response => response.json()).then(response => {
  //     response.forEach((el, i) => {
  //       possibleWords[i] = el.word;
  //     })
  //   });
  //   this.state.words = possibleWords;
  // }
  render() {
    return (
      <>
        <div id="input" className="flexrow no-lateral-margin">
          <input id="word-input" placeholder="Enter a word" onKeyDown={event => { if (event.keyCode === 13 || event.which === 3) this.props.onInput(event) }} />
          <span className="button" onClick={this.props.onInput}>
            define!
        </span>
        </div>
        {/* <div id="recommendations" className="column">
          {this.state.words[0] !== undefined ? this.state.words.slice(0, 5).map(word => <p onClick={() => { document.querySelector("#word-input").value = this.innerText }}>{word}</p>) : ""}
        </div> */}
      </>
    );
  }
}

export default WordInput;
