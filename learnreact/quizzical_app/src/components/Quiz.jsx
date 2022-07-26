import React from "react";
import Question from "./Question";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

// TODO: if question count is > 5, paginate and generate a "Next page" button
//          but then figure out how to do "checkAnswers" (because they won't all be on one page)
//          maybe just generate a new component to show the user which ones they missed
export default function Quiz(props) {
    
    const [questions, setQuestions] = React.useState([
        {
            id: "",
            answers: [],
            correctAnswerIndex: 0,
            question: "",
            isBoolean: false
        }
    ]);

    // Set to indicate when the user is checking their answers
    const [checkingAnswers, setCheckingAnswers] = React.useState(false);

    // Set to indicate when we're done gathering answer results 
    const [doneChecking, setDoneChecking] = React.useState(false);

    // Set to indicate user won the game
    const [userWon, setUserWon] = React.useState(false);

    // When checkingAnswers is set, represent whether each question was correctly selected
    const [answerCorrect, setAnswerCorrect] = React.useState([false, false, false, false, false]);

    // Used to trigger when questions should be generated; on initial page load and after user clicks "Reset Quiz"
    const [resetQuestions, setResetQuestions] = React.useState(true);

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

        if (resetQuestions) {
            getQuestions();
            setResetQuestions(false);
        }
    }, [resetQuestions])


     // When done checking, report whether the player has won
    React.useEffect(() => {
        if (doneChecking) {
            if (answerCorrect.every(x => x === true)) {
                setUserWon(true);
            }
        }

        // Report if each choice was correct; can do Confetti or return the number of correct questions
    }, [doneChecking])

    function assignQuestions(rawQuestions) {
        const modifiedQuestions = []
        for (let i = 0; i < rawQuestions.length; i++) {
            const currentQuestion = rawQuestions[i]
            let answersArr = currentQuestion.incorrect_answers.slice()
            let numAnswers = 1 + currentQuestion.incorrect_answers.length // 1 true answer + 1-3 incorrect answers 
            let correctIndex = Math.floor(Math.random() * numAnswers)
            answersArr.splice(correctIndex, 0, currentQuestion.correct_answer)
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

    function setAnswerState(questionIndex, isCorrect) {
        setAnswerCorrect(prevAnswers => {
            let answers = []
            for (let i = 0; i < prevAnswers.length; i++) {
                if (i === questionIndex) {
                    answers[i] = isCorrect;
                } else {
                    answers[i] = prevAnswers[i]
                }
            }

            return answers;
        })

        setDoneChecking(true);
    }

    function checkAnswers() {
        setCheckingAnswers(true);
    }

    // Reset quiz by reverting all state variables
    function resetQuiz() {
        setCheckingAnswers(false);
        setDoneChecking(false);
        setUserWon(false);
        setAnswerCorrect([false, false, false, false, false]);
        setResetQuestions(true);
    }

    // DEBUG: use this to check the correct answer indices to test win condition
    // console.log(questions);

    const questionElems = questions.map((question, index) => (
        <Question 
            key={question.id}
            index={index}
            questionBlob={question}
            correctIndex={question.correctAnswerIndex}
            checkCorrect={checkingAnswers}
            setCorrect={setAnswerState}
        />
    ))

     // Note: I added the second "userWon &&" line to force a re-render after the useEffect that sets userWon
     // Otherwise, the Confetti won't render
    return (
        <div className="quiz">
            {userWon && <Confetti />}
            {<h1>{userWon ? "You've won!" : "Quizzical"}</h1>}
            <div className="questions">
                {questionElems}
            </div>
            <button 
                className="quiz--button" 
                onClick={checkingAnswers ? resetQuiz : checkAnswers}
            >
                {checkingAnswers ? "Reset Quiz" : "Check Answers"}
            </button>
        </div>
    )
}