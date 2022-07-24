import React from "react";
// import Question from "./Question";
import { nanoid } from "nanoid";
import types from '../types.jsx';

// TODO: dynamically create the answer elements based on the question type
// TODO: if question count is > 5, paginate and generate a "Next page" button
//          but then figure out how to do "checkAnswers" (because they won't all be on one page)
//          maybe just generate a new component to show the user which ones they missed
export default function Quiz(props) {
    
    const [questions, setQuestions] = React.useState([]);
    const [answer, setAnswer] = React.useState(0); // TODO: set this to the index of the button with the answer

    // Query API for questions on first component load
    React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch(props.apiUrl)
            const data = await res.json()
            if (data.response_code !== 0) {
                throw "ERROR: Unable to fetch questions from OTDB API";
            }

            console.log("Data: " + data);
            setQuestions(data.results);
        }
        getQuestions()
    }, [])

    function generateAnswers(question) {
        const answers = question.incorrect_answers.slice();
        answers.concat(question.correct_answer);
        answers.sort();
        console.log("Answers: " + answers);

        let answerElems = []
        if (question.type === types.QUESTION_TYPE_MC) {
            answerElems = answers.map(answer => {
                return <button key={nanoid()} className="answer--button">{answer}</button>
            })
        } else if (question.type === types.QUESTION_TYPE_TF) {
            answerElems = answers.map(answer => {
                return <button key={nanoid()} className="answer--button">{answer}</button>
            })
        } else {
            throw "ERROR: Invalid question type provided";
        }

        return (
            <div className="answers">
                {answerElems}
            </div>
        )
    }

    function generateQuestions(count) {
        // TODO: randomly assign correct answer position
        const questionElems = questions.map(question => (
            <div className="question" key={nanoid()}>
                <h3 className="question--title">{question.question}</h3>
                {generateAnswers(question)}
                <br/>
            </div>
        ))

        return questionElems;
    }

    function checkAnswers() {
        
    }

    return (
        <div className="quiz">
            {generateQuestions(props.questionCount)}
            <button 
                className="quiz--button" 
                onClick={checkAnswers}
            >
                Check Answers
            </button>
        </div>
    )
}