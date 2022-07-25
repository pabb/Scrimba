import React from "react";
import { nanoid } from "nanoid";
import { decode } from "he";

// TODO: if question count is > 5, paginate and generate a "Next page" button
//          but then figure out how to do "checkAnswers" (because they won't all be on one page)
//          maybe just generate a new component to show the user which ones they missed
export default function Quiz(props) {
    
    const [questions, setQuestions] = React.useState([
        {
            id: "gjgjgjgjg",
            correctAnswer: "Yes",
            correctAnswerId: "abcde",
            incorrectAnswers: ["No", "Maybe"],
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
            modifiedQuestions.push({
                id: nanoid(),
                correctAnswer: currentQuestion.correct_answer,
                correctAnswerId: nanoid(),
                incorrectAnswers: currentQuestion.incorrect_answers,
                question: currentQuestion.question,
                isBoolean: currentQuestion.type === "boolean"
            })
        }

        setQuestions(modifiedQuestions);
    }

    function generateAnswers(question) {
        let answers = question.incorrectAnswers.slice();
        answers.unshift(question.correctAnswer); // Put correct answer at front of array so that we can assign its id as correctAnswerId below

        const answerElems = answers.map((answer, index) => {
            const answerId = index === 0 ? question.correctAnswerId : nanoid();
            return <button key={answerId} id={answerId} className="answer--button">{answer}</button>
        })

        // Shuffle ordering of multiple choice elements so the answer isn't always the first choice
        if (!question.isBoolean) {
            // shuffle(answerElems);
            answerElems.sort(function() {
                return Math.random() - 0.5;
            })
        }
        // Consider setting buttons for true/false questions in static order (True, False) 
        // else {
        //     answerElems.sort(button => button.value)
        // }

        return (
            <div className="answers">
                {answerElems}
            </div>
        )
    }

    function generateQuestions(count) {
        const questionElems = questions.map(question => (
            <div className="question" key={question.id}>
                <h3 className="question--text">{decode(question.question)}</h3>
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