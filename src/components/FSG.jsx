import React, { PureComponent } from "react";

class FSG extends PureComponent {
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    return (
      <section id={this.props.name} className="part-of-speech">
        <h3>{this.props.name}</h3>
        <ol onClick={(event) => { if (event.target.tagName === "SPAN") { document.querySelector("#word-input").value = event.target.innerText; this.props.define(event) } }}>
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
