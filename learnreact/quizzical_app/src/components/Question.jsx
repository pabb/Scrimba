import React from "react";
import Answer from "./Answer";
import { decode } from "he";

export default function Question(props) {

    const [selectedAnswerIndex, setSelectedAnswerIndex] = React.useState(-1); // Don't select anything on page load

    function selectAnswer(index) {
        setSelectedAnswerIndex(index);
    }

    React.useEffect(() => {
        if (props.checkCorrect) {
            props.setCorrect(props.index, selectedAnswerIndex === props.correctIndex);
        }
    }, [props.checkCorrect])

    const answerElems = props.questionBlob.answers.map((answer, index) => {
        const decodedAnswer = decode(answer)
        return <Answer 
                    key={`decodedAnswer + ${index}`}
                    answer={decodedAnswer}
                    isSelected={selectedAnswerIndex === index}
                    isCorrect={props.correctIndex === index}
                    checkCorrect={props.checkCorrect}
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