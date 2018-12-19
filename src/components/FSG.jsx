import React, { PureComponent } from "react";

class FSG extends PureComponent {
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  handleClick(event) {
    if (event.target.tagName === "SPAN") {
      let word = event.target.innerText, len = word.length;
      if (word.indexOf(" ") === -1) {
        if (/\.|,|;/.test(word[len - 1]))
          word = word.substring(len - 2);
        document.querySelector("#word-input").value = word;
        this.props.define(event);
      }
    }
  }
  render() {
    return (
      <section id={this.props.name} className="part-of-speech">
        <h3>{this.props.name}</h3>
        <ol onClick={this.handleClick.bind(this)}>
          {this.props.data.map((el, i) => (
            el.definition
              ?
              (
                <li key={i}>
                  <p className="definition" dangerouslySetInnerHTML={{ __html: el.definition.split(" ").map(x => " <span>" + x + "</span> ").join("") }}></p>
                  <em className="examples" dangerouslySetInnerHTML={{ __html: el.example ? el.example.split(" ").map(x => " <span>" + x + "</span> ").join("") : "" }}></em>
                  {el.synonyms ? <><div className="synonyms monospace"><b>Synonyms: </b><p dangerouslySetInnerHTML={{ __html: el.synonyms.map(x => " <span>" + x + "</span>").join(",") }}></p></div></> : <></>}
                  {/* <p className="synonyms">{el.synonyms.join(", ")}</p> */}
                </li>
              )
              :
              <></>
          ))}
        </ol>
      </section>
    )
  }
}
export default FSG;
