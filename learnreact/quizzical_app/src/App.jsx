import React from 'react';
import Quiz from './components/Quiz';
import Title from './components/Title';
import './App.css';

function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);

  function startQuiz(start) {
    setQuizStarted(start);
  }

  return (
    <div className="App">
      <main>
        {quizStarted ? <Quiz /> : <Title handleStart={startQuiz} />}
      </main>
    </div>
  )
}

export default App
