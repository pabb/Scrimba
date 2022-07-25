import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

// TODO: if question count is > 5, paginate and generate a "Next page" button
//          but then figure out how to do "checkAnswers" (because they won't all be on one page)
//          maybe just generate a new component to show the user which ones they missed
export default function Quiz(props) {
    
    const [questions, setQuestions] = React.useState([
        {
            id: "gjgjgjgjg",
            answers: ["test", "test"],
            // correctAnswerId: "abcde",
            // incorrectAnswers: ["No", "Maybe"],
            correctAnswerIndex: 0,
            question: "Is this a test?",
            isBoolean: false
        }
    ]);

    // Query API for questions on first component load
    React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch(props.apiUrl)
            const data = await res.json()
            if (data.response_code !== 0) {
                throw "ERROR: Unable to fetch questions from OTDB API";
            }

            const rawQuestions = data.results;
            assignQuestions(rawQuestions);
        }
        getQuestions();
    }, [])

    function assignQuestions(rawQuestions) {
        const modifiedQuestions = []
        for (let i = 0; i < rawQuestions.length; i++) {
            const currentQuestion = rawQuestions[i]
            let answersArr = currentQuestion.incorrect_answers.slice()
            let numAnswers = 1 + currentQuestion.incorrect_answers.length // 1 true answer + 1-3 incorrect answers 
            let correctIndex = Math.ceil(Math.random() * numAnswers)
            answersArr.splice(correctIndex, 0, currentQuestion.correct_answer)

            // Splice correct Answer to correctIndex
            modifiedQuestions.push({
                id: nanoid(),
                answers: answersArr,
                correctAnswerIndex: correctIndex,
                question: currentQuestion.question,
                isBoolean: currentQuestion.type === "boolean",
            })
        }

        setQuestions(modifiedQuestions);
    }

    function checkAnswers() {
        
    }

    // TODO: make sure only renders ONCE
    const questionElems = questions.map(question => (
        <Question key={question.id} questionBlob={question} correctIndex={question.correctAnswerIndex} />
    ))

    return (
        <div className="quiz">
            <div className="questions">
                {questionElems}
            </div>
            <button 
                className="quiz--button" 
                onClick={checkAnswers}
            >
                Check Answers
            </button>
        </div>
    )
}