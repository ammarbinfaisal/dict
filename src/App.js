import React, { Component } from "react";
import FSG from "./components/FSG";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleWordInput(event) {
    event.preventDefault();
    let word = document.querySelector("#word-input").value;
    fetch(
      `https://googledictionaryapi.eu-gb.mybluemix.net/?lang=en&define=${word}`
    )
      .then(res => res.json())
      .then(dataReceived => {
        console.log(dataReceived);
        this.setState({ data: dataReceived[0] });
      });
    // .then(res => this.setState({ wordData: res[0] }));
  }
  render() {
    let meanings = [], i = 0;
    if (this.state.data)
      for (let figureOfSpeech in this.state.data.meaning) {
        meanings[i] = <FSG name={figureOfSpeech} data={this.state.data.meaning[figureOfSpeech]} />;
        i++;
      }
    return (
      <div className="App">
        <div id="input" className="flexrow">
          <input id="word-input" placeholder="Enter a word" />
          <button type="button" onClick={this.handleWordInput.bind(this)}>
            Submit
          </button>
        </div>
        {/* prettier-ignore */}
        {
          this.state.data !== undefined ?
            (
              <section id="word-definition">
                <h2>{this.state.data.word}</h2>
                <p className="monospace">{this.state.data.phonetic}</p>
                {meanings}
              </section>
            ) :
            ""
        }
      </div>
    );
  }
}

export default App;
