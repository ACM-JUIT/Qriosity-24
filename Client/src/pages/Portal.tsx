/* eslint-disable prefer-const */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';
import '../Styles/portal.css';
import Navbar from '../common/components/Navbar';


const Portal: React.FC = () => {

  // ------ QuestionsData ------
  // const [questionsData, setQuestionsData] = useState<{
  //   QuestionNumber: number;
  //   QuestionStatement: string;
  //   Answer: string;
  //   Hints: string;
  // }[]>([]);
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await axios.get('/api/questions');
  //       setQuestionsData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching questions:', error);
  //     }
  //   };
  //   fetchQuestions();
  // }, []);

const questionsData = [
    {
        "QuestionNumber": 1,
        "QuestionStatement": "What is the capital of France?",
        "Answer": "Paris",
        "Hints": "It's known as the 'City of Love'",
    },
    {
        "QuestionNumber": 2,
        "QuestionStatement": "Who wrote 'Romeo and Juliet'?",
        "Answer": "William Shakespeare",
        "Hints": "He is often referred to as the 'Bard of Avon'",
    },
    {
        "QuestionNumber": 3,
        "QuestionStatement": "What is the largest planet in our solar system?",
        "Answer": "Jupiter",
        "Hints": "It's named after the king of the Roman gods",
    },
    {
        "QuestionNumber": 4,
        "QuestionStatement": "Which element has the chemical symbol 'H'?",
        "Answer": "Hydrogen",
        "Hints": "It is the lightest and most abundant element in the universe",
    },
    {
        "QuestionNumber": 5,
        "QuestionStatement": "In what year did the Titanic sink?",
        "Answer": "1912",
        "Hints": "It was a tragic event during the maiden voyage of the ship",
    },
    {
        "QuestionNumber": 6,
        "QuestionStatement": "What is the capital of Japan?",
        "Answer": "Tokyo",
        "Hints": "It is one of the most populous cities in the world",
    }
];

  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  let [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  let [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  let [lastSubmissionTimestamp, setLastSubmissionTimestamp] = useState(Date.now());
  // let [cooldownTimerSeconds, setCooldownTimerSeconds] = useState(30);
  // let [cooldownFlag, setCooldownFlag] = useState(false);
  // let [submitFlag, setSubmitFlag] = useState(false);
  // const nextButton = document.getElementById('nextButton') as HTMLButtonElement;
  const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
  const hintButton = document.getElementById('hintButton') as HTMLButtonElement;
  // const commentBox = document.getElementById('commentBox');
  const questionStatementBox = document.getElementById('questionStatement');
  const questionTimerBox = document.getElementById('questionTimer');
  const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
  const [isTimer, setIsTimer] = useState(false);


  // Quiz Timer
  const [countdownSeconds, setCountdownSeconds] = useState(calculateRemainingTimeInSeconds());
  function calculateRemainingTimeInSeconds() {
    const targetDate = new Date('2024-02-20T12:00:00'); // Replace with your target date and time
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
          // if (commentBox) {
          //   commentBox.textContent = 'Countdown is over!';
          // }
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);


  // Display Questions Numbers
  // const displayQuestionNumbers = (nextQuestionNumber: number) => {
  //   const questionNumbersContainer = document.querySelector('.displayQuestionNumbers');
  //   const firstQuestionNumber = 1;
  
  //   if (questionNumbersContainer) {
  //     if (nextQuestionNumber === 2) {
  //       const firstLiElement = document.createElement('li');
  //       firstLiElement.textContent = firstQuestionNumber.toString();
  //       const secondLiElement = document.createElement('li');
  //       secondLiElement.textContent = nextQuestionNumber.toString();
  //       questionNumbersContainer.appendChild(firstLiElement);
  //       questionNumbersContainer.appendChild(secondLiElement);
  //     } else if (nextQuestionNumber <= questionsData.length) {
  //       const liElement = document.createElement('li');
  //       liElement.textContent = nextQuestionNumber.toString();
  //       questionNumbersContainer.appendChild(liElement);
  //     } else if (nextQuestionNumber == questionsData.length+1) {
  //       const wellDoneLiElement = document.createElement('li');
  //       wellDoneLiElement.textContent = 'End';
  //       wellDoneLiElement.id = 'wellDone';
  //       questionNumbersContainer.appendChild(wellDoneLiElement);  
  //     }
  //   }
  // };

  // Display Questions
  const displayQuestion = () => {
    setQuestionTimerSeconds(0);
    // setCooldownTimerSeconds(30);    
    // setCooldownFlag(false);
    // setSubmitFlag(false);

    //TODO:TO BE CHECKED
    // const questionHTML = `
    // <div className="questions-container flex-col mx-auto my-auto p-4 rounded-xl ">
    //         <div className='questionAnswer ml-4'>
    //         <div className="questions mb-4 h-[5rem] p-4 m-4 text-white">
    //           <p className='text-2xl font-bold'>${questionsData[currentQuestionIndex].QuestionStatement}</p>
    //         </div>
    // `;
    if (questionStatementBox) {
      questionStatementBox.textContent = `${questionsData[currentQuestionIndex].QuestionStatement}`
    }
    // const commentContainer = document.querySelector('#commentBox');
    // if (commentContainer) {
    //   commentContainer.innerHTML = ``;
    // }
    // displayQuestionNumbers(question.QuestionNumber + 1);
  };

  const displayHint = () => {
    let hintData = 'Hint is still locked.';
    if ( questionsData[currentAnswerIndex].Hints ){
      hintData = questionsData[currentAnswerIndex].Hints.toString();
    } 
    // if (commentBox) {
    //   commentBox.textContent = hintData;
    // }
  }

  const checkAnswer = () => {
    const userAnswerInput = document.getElementById('userAnswer') as HTMLInputElement;
    if (userAnswerInput) {
      const userAnswer = userAnswerInput.value.toLowerCase();
      const correctAnswer = questionsData[currentAnswerIndex].Answer.toLowerCase();
      if ( userAnswer === correctAnswer ) {      
        showNextQuestion(); 
        setLastSubmissionTimestamp(Date.now());
        setCurrentAnswerIndex((prevIndex) => (prevIndex + 1));
        // setCooldownFlag(true);
        // setSubmitFlag(true);
        // submitButton.disabled = true;
        // hintButton.disabled = true;
        // if (commentBox) {
        //   commentBox.textContent = 'Correct answer.';
        // } 
        // if (nextButton) {
        //   nextButton.disabled = true;
        //   setTimeout(() => {
        //     if (nextButton) {
        //       nextButton.disabled = false;
        //     }
        //   }, 30000);         
        // }
      }else {
        // if (commentBox) {
        //   commentBox.textContent = 'Incorrect answer. Please try again.';
        // }
      }
    }
  };

  const showNextQuestion = () => {
    // setCooldownTimerSeconds(30);
    // setSubmitFlag(false);
    // submitButton.disabled = false;
    // hintButton.disabled = false;

    if ( currentQuestionIndex<questionsData.length) {
      setQuestionTimerSeconds(0);
      // setCooldownFlag(false);
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1));
      displayQuestion();
      if (userAnswerInput) {
        userAnswerInput.value = '';
      }
    } else if (currentQuestionIndex==questionsData.length){
        submitButton.disabled = true;
        hintButton.disabled = true;
        if (questionTimerBox){
          questionTimerBox.textContent=``
        }
      // if (commentBox) {
      //   commentBox.textContent = 'Completed all the questions.';
      //   // nextButton.disabled = true;
      // }
    } else {
      // if (commentBox) {
      //   commentBox.textContent = 'First attempt the question correctly then you are allowed to move further.';
      // }
    }
  };

  const updateQuestionTimer = () => {
    const currentTime = Date.now();
    const timeDifference = Math.floor((currentTime - lastSubmissionTimestamp) / 1000); // in seconds
    setQuestionTimerSeconds(timeDifference);
  };

  useEffect(() => {
    const intervalId = setInterval(updateQuestionTimer, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [lastSubmissionTimestamp]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" bg-cover bg-center h-screen p-4" style={{ backgroundImage: 'url("../../public/portalbgdark.jpg")' }}>
      <Navbar />  
      <div className="quizContainer p-4 ">

        {/* Quiz Timer */}
        <div id="quizTimer" className=" mb-4 z-[999]">
          
          {countdownSeconds > 0 ? (
            <>
              <p className="info"> Time remaining </p>
              <p className="time animate-pulse">
                {Math.floor(countdownSeconds / 3600)}h : {Math.floor((countdownSeconds % 3600) / 60)}m : {countdownSeconds % 60}s
              </p>
            </>
          ) : (
            <>
            <p className="time animate-pulse"> 00h : 00m : 00s </p>
            <p className="info"> Qriosity-2024 is over!!! </p>
            </>
          )}
        </div>
<div className=''>
        {/* Question Div */}
        <div className="flex h-[1/2] flex-col sm:flex-row">


      <div className = "questionNumber p-4 rounded-xl">
        <h1 className='tracking-wider max-w-max mx-auto mb-4 text-white text-base'> Question Numbers </h1>
        <ul className="displayQuestionNumbers grid grid-cols-4 gap-2">
          {Array.from({ length: currentQuestionIndex+1 }, (_, index) => (
            <li key={index+1 }>{index+1 }</li>
          ))}
        </ul>
      </div>
          
          <div className="questions-container flex-col mx-auto my-auto p-4 rounded-xl ">
            <div className='questionAnswer ml-4'>
            <div className="questions p-4 mx-auto text-white">
              <p id="questionStatement" className='text-2xl font-bold'>{questionsData[currentQuestionIndex-1].QuestionStatement}</p>
            </div>
            <div className='Timer flex items-center justify-center ml-auto '>
             <div id="questionTimer" className="text-wrap text-sm text-white flex items-center justify-center">
                {`${Math.floor(questionTimerSeconds / 60)} : ${questionTimerSeconds % 60}`}
              </div> 
            </div>
              <motion.div
                layout
                className="flex justify-center mb-4 p-1  w-fit mx-auto">
                <input
                  type="text"
                  id="userAnswer"
                  placeholder="Enter your answer"
                  className="border p-2 mt-4 mx-auto text-black rounded-lg"
                />
              </motion.div>
            </div>
          
            <div className='flex items-center justify-center p-2 mb-4 mx-auto  '>
              <motion.button
                id="hintButton"
                onClick={displayHint}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white rounded-md btn hover:bg-blue-700 hover:darken-2"
              >
                Hint
              </motion.button>
              <motion.button
                id="submitButton"
                onClick={checkAnswer}
                whileTap={{ scale: 0.9 }}
                className="bg-green-500 text-white rounded-md btn hover:bg-green-700 hover:darken-2 "
              >
                Submit
              </motion.button>
            </div>
          </div>
        </div>
          <div className='flex flex-row justify-center mb-4 ml-8'>
            <div className='bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 p-4 mt-3'>
              <p className='text-white text-xs flex justify-center'>Feeling Bored? Why not play this mini game</p>
            <iframe
              style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              className='rounded-lg p-4'
              title="Game Embed"
              src="https://cdn.htmlgames.com/EmojiMatch3/"
            ></iframe>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Portal;