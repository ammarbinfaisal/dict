import React from "react";

const FSG = (props) => (
    <section id={props.name} className="part-of-speech">
        <h4>{props.name}</h4>
        <ol>
            {props.data.map((el, i) =>
                (
                    <li key={i}>
                        <p>{el.definition}</p>
                        <em>{el.example}</em>
                        {/* <p className="synonyms">{el.synonyms.join(", ")}</p> */}
                    </li>
                )
            )
            }
        </ol>
    </section>
)

export default FSG