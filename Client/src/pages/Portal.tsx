import React, { useState, useEffect } from 'react';
import Navbar from '../common/components/Navbar';
import '../Styles/Home.css';

const Portal = () => {
//   const [questionsData, setQuestionsData] = useState([]);
const questionsData = [
    {
        "QuestionNumber": 1,
        "QuestionStatement": "What is the capital of France?",
        "Answer": "Paris",
        "Hints": "It's known as the 'City of Love'"
    },
    {
        "QuestionNumber": 2,
        "QuestionStatement": "Who wrote 'Romeo and Juliet'?",
        "Answer": "William Shakespeare",
        "Hints": "He is often referred to as the 'Bard of Avon'"
    },
    {
        "QuestionNumber": 3,
        "QuestionStatement": "What is the largest planet in our solar system?",
        "Answer": "Jupiter",
        "Hints": "It's named after the king of the Roman gods"
    },
    {
        "QuestionNumber": 4,
        "QuestionStatement": "Which element has the chemical symbol 'H'?",
        "Answer": "Hydrogen",
        "Hints": "It is the lightest and most abundant element in the universe"
    },
    {
        "QuestionNumber": 5,
        "QuestionStatement": "In what year did the Titanic sink?",
        "Answer": "1912",
        "Hints": "It was a tragic event during the maiden voyage of the ship"
    },
    {
        "QuestionNumber": 6,
        "QuestionStatement": "What is the capital of Japan?",
        "Answer": "Tokyo",
        "Hints": "It is one of the most populous cities in the world"
    }
];
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  let [cooldownTimerSeconds, setCooldownTimerSeconds] = useState(30);
  let [cooldownFlag, setCooldownFlag] = useState(false);
  let [quizTimerSeconds, setQuizTimerSeconds] = useState(300); // 5 minutes for the entire quiz
  let [questionTimerInterval, setQuestionTimerInterval] = useState<number | null>(null);

  useEffect(() => {
    const quizTimerInterval = setInterval(() => {
      if (quizTimerSeconds > 0) {
        setQuizTimerSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(quizTimerInterval);
        alert('Quiz time is up!');
      }
    }, 1000);

    return () => clearInterval(quizTimerInterval);
  }, [quizTimerSeconds]);

  const displayQuestionNumbers = (nextQuestionNumber: number) => {
    const questionNumbersContainer = document.querySelector('.displayQuestionNumbers');
    const firstQuestionNumber = 1;
  
    if (questionNumbersContainer) {
      if (nextQuestionNumber === 2) {
        const firstLiElement = document.createElement('li');
        firstLiElement.textContent = firstQuestionNumber.toString();
        const secondLiElement = document.createElement('li');
        secondLiElement.textContent = nextQuestionNumber.toString();
        questionNumbersContainer.appendChild(firstLiElement);
        questionNumbersContainer.appendChild(secondLiElement);
      } else {
        const liElement = document.createElement('li');
        liElement.textContent = nextQuestionNumber.toString();
        questionNumbersContainer.appendChild(liElement);
      }
    }
  };

  const displayQuestion = (question: any) => {
    setQuestionTimerSeconds(0);
    setCooldownTimerSeconds(3);

    // Display question logic
    const questionHTML = `
      <div>
        <p>${question.QuestionNumber}. ${question.QuestionStatement}</p>
      </div>
    `;
    // Update the UI with the question
    const questionsContainer = document.querySelector('.questions');
    if (questionsContainer) {
      questionsContainer.innerHTML = questionHTML;
    }

    displayQuestionNumbers(question.QuestionNumber + 1);
  };

  const checkAnswer = () => {
    const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
    if (userAnswerInput) {
      const userAnswer = userAnswerInput.value.toLowerCase();
      if (userAnswer === questionsData[currentQuestionIndex].Answer.toLowerCase()) {
        setCooldownFlag(true);
        alert('Correct answer.'); //////
        const nextButton = document.getElementById('nextButton') as HTMLButtonElement;
        if (nextButton) {
          nextButton.disabled = true;
          setTimeout(() => {
            setCooldownFlag(false);
            if (nextButton) {
              nextButton.disabled = false;
              cooldownFlag = true;
            }
          }, 3000);             // // Cooldown Period

        }
      } else {
        alert('Incorrect answer. Please try again.');
      }
    }
  };

  const showNextQuestion = () => {
    setQuestionTimerSeconds(0);
    // if (questionTimerInterval) {
    //   clearInterval(questionTimerInterval);
    // }
    cooldownFlag = true;
    if (cooldownFlag) {
      cooldownFlag = false;
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questionsData.length);
      displayQuestion(questionsData[currentQuestionIndex]);
      const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
      if (userAnswerInput) {
        userAnswerInput.value = '';
      }
    } else {
      alert('First attempt the question correctly then you are allowed to move further.');
    }
  };

  const updateQuestionTimer = () => {
    setQuestionTimerSeconds((prevSeconds) => prevSeconds + 1);
    if (cooldownFlag) {
      setCooldownTimerSeconds((prevCooldownSeconds) => prevCooldownSeconds - 1);
    }
    if (cooldownFlag && cooldownTimerSeconds === 0) {
      setCooldownFlag(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateQuestionTimer, 1000);
    setQuestionTimerInterval(intervalId);
    questionTimerSeconds = intervalId;

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [questionTimerSeconds, cooldownTimerSeconds, cooldownFlag]);

  return (
    <div className="portalContainer">
      <Navbar />
      <div className="quizContainer p-4">
        <div id="quizTimer" className="text-lg mb-4">
          Time left for quiz: {Math.floor(quizTimerSeconds / 60)}:{quizTimerSeconds % 60}
        </div>
        <div className="flex">
          <div className="questionNumber pr-4">
            <ul className="displayQuestionNumbers flex space-x-2"></ul>
          </div>
          <div className="questions-container flex-1">
            <div className="questions mb-4"></div>
            <input
              type="text"
              id="userAnswer"
              placeholder="Enter your answer"
              className="border p-2 mb-4 text-black"
            />
            <div className="hintBlock mb-4"></div>
            <button
              id="submitButton"
              onClick={checkAnswer}
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
            >
              Submit
            </button>
            <button
              id="nextButton"
              onClick={showNextQuestion}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
            <div id="questionTimer" className="mt-4">
              Time spent on current question: {questionTimerSeconds} seconds
            </div>
            <div id="commentBox" className='mt-4 px-4 py-2 text-white'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
