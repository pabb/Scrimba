import React from "react";
import types from '../types.jsx';

export default function Question(props) {

    // Pass answer state from Quiz
    function generateMultipleChoice(answers) {
        return (
            <div className="question--mc">
                <button onClick={props.setA} className="question--a">A</button>
                <button onClick={props.setB} className="question--b">B</button>
                <button onClick={props.setC} className="question--c">C</button>
                <button onClick={props.setD} className="question--d">D</button>
            </div>
        )
    }

    // Pass answer state from Quiz
    function generateTrueFalse() {
        return (
            <div className="question--tf">
                <button onClick={props.setTrue} className="question--true">True</button>
                <button onClick={props.setFalse} className="question--false">False</button>
            </div>
        )

    }

    return (
        <div className="question">
            <h3>{props.question}</h3>
            {props.type === QUESTION_TYPE_TF ? generateTrueFalse() : generateMultipleChoice(answers)}
        </div>
    )
}