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
  let [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  let [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  let [cooldownTimerSeconds, setCooldownTimerSeconds] = useState(30);
  let [cooldownFlag, setCooldownFlag] = useState(false);
  let [submitFlag, setSubmitFlag] = useState(true);
  const nextButton = document.getElementById('nextButton') as HTMLButtonElement;
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  const hintButton = document.getElementById('hintButton') as HTMLButtonElement;
  // let hint = document.getElementById('HintButton') as HTMLInputElement;


  // Quiz Timer
  const [countdownSeconds, setCountdownSeconds] = useState(calculateRemainingTimeInSeconds());
  function calculateRemainingTimeInSeconds() {
    const targetDate = new Date('2024-01-15T12:00:00'); // Replace with your target date and time
    const currentTime = new Date();
    const timeDifference = targetDate.getTime() - currentTime.getTime();
    return Math.max(Math.floor(timeDifference / 1000), 0);
  }
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdownSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(countdownInterval);
          alert('Countdown is over!');
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  // Display Questions
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
      } else if (nextQuestionNumber <= questionsData.length) {
        const liElement = document.createElement('li');
        liElement.textContent = nextQuestionNumber.toString();
        questionNumbersContainer.appendChild(liElement);
      } else if (nextQuestionNumber == questionsData.length) {
        const theLiElement = document.createElement('li');
        theLiElement.textContent = 'The'
        const endLiElement = document.createElement('li');
        endLiElement.textContent = 'End'
        questionNumbersContainer.appendChild(theLiElement);
        questionNumbersContainer.appendChild(endLiElement);
      }
    }
  };

  // Display Questions
  const displayQuestion = (question: any) => {
    setQuestionTimerSeconds(0);
    setCooldownTimerSeconds(3);
    setCooldownFlag(false);
    setSubmitFlag(false);
    const questionHTML = `
      <div>
        <p>${question.QuestionNumber}. ${question.QuestionStatement}</p>
      </div>
    `;
    const questionsContainer = document.querySelector('.questions');
    if (questionsContainer) {
      questionsContainer.innerHTML = questionHTML;
    }
    displayQuestionNumbers(question.QuestionNumber + 1);
  };

  const displayHint = () => {
    const hintData = questionsData[currentAnswerIndex].Hints.toString();
    alert(hintData);
  }

  const checkAnswer = () => {
    const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
    if (userAnswerInput) {
      const userAnswer = userAnswerInput.value.toLowerCase();
      const correctAnswer = questionsData[currentAnswerIndex].Answer.toLowerCase();
      if ( (userAnswer === correctAnswer) && (!submitFlag) ) {        
        setCurrentAnswerIndex((prevIndex) => (prevIndex + 1));
        setCooldownFlag(true);
        setSubmitFlag(true);
        submitButton.disabled = true;
        hintButton.disabled = true;
        alert('Correct answer.'); 
        if (nextButton) {
          nextButton.disabled = true;
          setTimeout(() => {
            if (nextButton) {
              nextButton.disabled = false;
              // setCooldownFlag(false);
            }
          }, 3000);         

        }
      }else {
        alert('Incorrect answer. Please try again.');
      }
    }
  };

  const showNextQuestion = () => {
    setQuestionTimerSeconds(0);
    setSubmitFlag(false);
    submitButton.disabled = false;
    hintButton.disabled = false;
    if (submitFlag && currentQuestionIndex<questionsData.length) {
      cooldownFlag = false;
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1));
      displayQuestion(questionsData[currentQuestionIndex]);
      const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
      if (userAnswerInput) {
        userAnswerInput.value = '';
      }
    }else if (submitFlag && currentQuestionIndex==questionsData.length){
      alert('Completed all the questions.')
    } else {
      alert('First attempt the question correctly then you are allowed to move further.');
    }
  };

  const updateQuestionTimer = () => {
    if (!cooldownFlag){
      setQuestionTimerSeconds((prevSeconds) => prevSeconds + 1);
    }
    else if (cooldownFlag && cooldownTimerSeconds !== 0) {
      setCooldownTimerSeconds((prevCooldownSeconds) => prevCooldownSeconds - 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateQuestionTimer, 1000);
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
          {countdownSeconds > 0 ? (
            `Time remaining ::  ${Math.floor(countdownSeconds / 3600)} hours : ${Math.floor((countdownSeconds % 3600) / 60)} minutes : ${countdownSeconds % 60} seconds`
          ) : (
            'Qriosity-2024 is over!!!'
          )}
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
            <div className='hintSubmitBlock p-2 mb-4'>
              <button
                id="hintButton"
                onClick={displayHint}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
              >
                Hint
              </button>
              <button
                id="submitButton"
                onClick={checkAnswer}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
              >
                Submit
              </button>
            </div>
            <div className='nextBlock p-2 mb-4'>
              <button
                id="nextButton"
                onClick={showNextQuestion}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
            <div id="questionTimer" className="mt-4">
              {cooldownFlag ? (
                cooldownTimerSeconds > 0 ? (
                  `Please wait for the cooldown period (${cooldownTimerSeconds} seconds remaining)`
                ) : (
                  `You solved this question in: ${questionTimerSeconds} seconds`
                )
              ) : (
                `Time spent on current question: ${questionTimerSeconds} seconds`
              )}
            </div>
            <div id="commentBox" className='mt-4 px-4 py-2 text-white'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;