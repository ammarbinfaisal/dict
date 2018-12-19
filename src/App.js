import React, { Component } from "react";
import FSG from "./components/FSG";
import WordInput from "./components/WordInput";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleWordInput(event) {
    event.stopPropagation();
    this.setState({ loading: true, reqFailed: false, data: undefined });
    let word = document.querySelector("#word-input").value;
    fetch(
      `https://googledictionaryapi.eu-gb.mybluemix.net/?lang=en&define=${word}`
    )
      .then(res => res.json())
      .then(dataReceived => {
        console.log(dataReceived);
        this.setState({ data: dataReceived[0], loading: false, reqFailed: false });
      })
      .catch(err => {
        console.log("Request failed perhasp due to wrong spelling");
        this.setState({ reqFailed: true, loading: false, data: undefined });
      })
    // .then(res => this.setState({ wordData: res[0] }));
  }
  render() {
    let meanings = [], i = 0;
    if (this.state.data)
      for (let figureOfSpeech in this.state.data.meaning) {
        meanings[i] = <FSG name={figureOfSpeech} data={this.state.data.meaning[figureOfSpeech]} key={i} define={this.handleWordInput.bind(this)} />;
        i++;
      }
    return (
      <div className="columns">
        <WordInput onInput={this.handleWordInput.bind(this)} />
        {/* prettier-ignore */}
        {
          this.state.data !== undefined && !this.state.reqFailed ?
            (
              <section className="word-definition">
                <h2>{this.state.data.word}</h2>
                <p className="monospace">{this.state.data.phonetic}</p>
                {meanings}
              </section>
            ) :

            <></>
        }
        {
          this.state.loading ? <p id="loading" className="monospace">loading...</p> : <></>
        }
        {
          this.state.reqFailed ? <p className="monospace error"><span role="img" aria-label="warning">⚠️</span> Sorry couldn&apos;t fetch definition of the word.<br /> Either the spelling is wrong or you aren&apos;
t connected to internet</p> : <></>
        }
      </div>
    );
  }
}

export default App;
