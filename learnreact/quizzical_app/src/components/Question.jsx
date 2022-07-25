import React from "react";
import Answer from "./Answer";
import { decode } from "he";

export default function Question(props) {

    const [correctIndex, setCorrectIndex] = React.useState(props.correctIndex);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(-1); // Don't select anything on page load

    function selectAnswer(index) {
        setSelectedAnswerIndex(index);
        // console.log("Index param: " + index + " / Selected: " + selectedAnswerIndex)
    }

    const answerElems = props.questionBlob.answers.map((answer, index) => {
        const decodedAnswer = decode(answer)
        return <Answer 
                    key={`decodedAnswer + ${index}`}
                    index={index}
                    questionId={props.questionBlob.id}
                    answer={decodedAnswer}
                    isSelected={selectedAnswerIndex === index}
                    handleClick={() => selectAnswer(index)}
                /> 
    })

    return (
        <div className="question" key={props.questionBlob.id}>
            <h3 className="question--text">{decode(props.questionBlob.question)}</h3>
            <div className="answers">
                {answerElems}
            </div>
            <br/>
        </div>
    )
}