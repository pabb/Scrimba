import React from 'react';
import Quiz from './components/Quiz';
import Title from './components/Title';
import types from './types.jsx';
import './App.css';

function App() {
    const [quizStarted, setQuizStarted] = React.useState(false);

    function startQuiz(start) {
        setQuizStarted(start);
    }

    return (
        <div className="App">
            <main>
                {
                    quizStarted ? 
                        <Quiz 
                            apiUrl={types.API_URL}
                        /> : 
                        <Title handleStart={startQuiz} />
                }
            </main>
        </div>
    )
}

export default App
