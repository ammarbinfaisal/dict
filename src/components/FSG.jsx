import React, { PureComponent } from "react";
import flatten from "array-flatten";

const insertSpans = text => text.split(" ").map(x => " <span>" + x + "</span> ").join("");
const splitSynonyms = synonyms => flatten(synonyms.map(x => x.split(" ").map(x => " <span>" + x + "</span>").join(" "))).map(x => x.indexOf("span") === "-" ? " <span>" + x + "</span>" : x).join(",")

class FSG extends PureComponent {
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  handleClick(event) {
    if (event.target.tagName === "SPAN") {
      let word = event.target.innerText, len = word.length;
      if (word.indexOf(" ") === -1) {
        if (/\.|,|;/.test(word[len - 1]))
          word = word.substring(0, len - 1);
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
                  <p className="definition" dangerouslySetInnerHTML={{ __html: el.definition ? insertSpans(el.definition) : "" }}></p>
                  <em className="examples" dangerouslySetInnerHTML={{ __html: el.example ? insertSpans(el.example) : "" }}></em>
                  {el.synonyms ? <><div className="synonyms monospace"><b>Synonyms: </b><p dangerouslySetInnerHTML={{ __html: splitSynonyms(el.synonyms)}}></p></div></> : <></>}
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
