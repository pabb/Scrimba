import React from "react";
import { nanoid } from "nanoid";
import { decode } from "he";
import types from '../types.jsx';

// TODO: if question count is > 5, paginate and generate a "Next page" button
//          but then figure out how to do "checkAnswers" (because they won't all be on one page)
//          maybe just generate a new component to show the user which ones they missed
export default function Quiz(props) {
    
    const [questions, setQuestions] = React.useState(types.QUESTION_EXAMPLE);
    const [answers, setAnswers] = React.useState(types.ANSWER_EXAMPLE);

    // Query API for questions on first component load
    React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch(props.apiUrl)
            const data = await res.json()
            if (data.response_code !== 0) {
                throw "ERROR: Unable to fetch questions from OTDB API";
            }

            const resWithId = data.results.map(result => (
                { 
                    ...result,
                    id: nanoid()
                }
            ))
            
            setQuestions(resWithId);
            console.log("getQuestions: " + JSON.stringify(questions));
        }

        async function setAnswers() {
            await getQuestions();
            assignAllAnswers();
            console.log("setAnswers: " + JSON.stringify(answers));
        }

        setAnswers();
        // getQuestions();
    }, [])

    function assignAnswers(question) {
        const answerObjects = question.incorrect_answers.map(answer => (
            {
                value: answer,
                id: nanoid(),
                correct: false,
                selected: false
            }
        ))

        answerObjects.push({
            value: question.correct_answer,
            id: nanoid(),
            correct: true,
            selected: false
        });

        // Sort answers, otherwise the correct answer will always be at the end
        // TODO: this doesn't really work
        // console.log("Answers - PRE-SORT: " + JSON.stringify(answerObjects));
        answerObjects.sort(() => 0.5 - Math.random());
        // console.log("Answers - POST-SORT: " + JSON.stringify(answerObjects));
        
        return answerObjects;
    }

    function assignAllAnswers() {
        console.log("assignAllAnswers - questions: " + questions);
        const allAnswers = questions.map(question => (
            {   
                questionId: question.id,
                answers: assignAnswers(question)
            }
        ))

        console.log("assignAllAnswers: " + allAnswers);
        setAnswers(allAnswers);
    }

    function highlightAnswer(questionId, answerId) {
        for (let i = 0; i < answers.length; i++) {
            let current = answers[i];
            if (current.questionId === questionId) {
                for (let j = 0; j < current.answers.length; j++) {
                    if (current.answers[j].id === answerId) {
                        // setAnswers => answer.selected ...
                    }
                }
            }
        }

        let index = answers.findIndex(element => {
            if (element.questionId === questionId) {
                
            }
        })
    }

    function generateAnswerElems(question) {
        // let answerElems = []
        const answerElems = answers.map(answer => (
            <button key={question.id} onClick={highlightAnswer} className="answer--button">{answer}</button>
        ));
            
        //     answerElems.push(<button key={question.id} onClick={highlightAnswer} className="answer--button">{types.ANSWER_TRUE}</button>)
        //     answerElems.push(<button key={question.id} onClick={highlightAnswer} className="answer--button">{types.ANSWER_FALSE}</button>)

        // if (question.type === types.QUESTION_TYPE_MC) {
        //     answerElems = answers.map(answer => {
        //         return <button key={question.id} onClick={highlightAnswer} className="answer--button">{answer}</button>
        //     })
        // } else if (question.type === types.QUESTION_TYPE_TF) {
        //     answerElems.push(<button key={question.id} onClick={highlightAnswer} className="answer--button">{types.ANSWER_TRUE}</button>)
        //     answerElems.push(<button key={question.id} onClick={highlightAnswer} className="answer--button">{types.ANSWER_FALSE}</button>)
        // } else {
        //     throw "ERROR: Invalid question type provided";
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
                {generateAnswerElems(question)}
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