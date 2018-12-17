import React, { PureComponent } from "react";

class FSG extends PureComponent {
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    return (
      <section id={this.props.name} className="part-of-speech">
        <h4>{this.props.name}</h4>
        <ol onClick={(event) => { console.log(event.target); const word = event.target.innerText; document.querySelector("#word-input").value = word; this.props.define() }}>
          {this.props.data.map((el, i) => (
            <li key={i}>
              <p className="definition" dangerouslySetInnerHTML={{ __html: el.definition.split(" ").map(x => " <span>" + x + "</span> ").join("") }}></p>
              <em className="examples" dangerouslySetInnerHTML={{ __html: el.example ? el.example.split(" ").map(x => " <span>" + x + "</span> ").join("") : "" }}></em>
              {el.synonyms ? <><div className="synonyms monospace"><b style={{ paddingBottom: "2px" }}>Synonyms: </b><p dangerouslySetInnerHTML={{ __html: el.synonyms.map(x => " <span>" + x + "</span>").join(",") }}></p></div></> : <></>}
              {/* <p className="synonyms">{el.synonyms.join(", ")}</p> */}
            </li>
          ))}
        </ol>
      </section>
    )
  }
}
export default FSG;
