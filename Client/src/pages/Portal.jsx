/* eslint-disable prefer-const */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/Home.css';
import '../Styles/portal.css';
import Navbar from '../common/components/Navbar';
import { selectCurrentUser } from '../redux/slices/userSlice';
import fs from 'fs';

const Portal = () => {
  
  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  const [lastSubmissionTimestamp, setLastSubmissionTimestamp] = useState(Date.now());
  const [countdownSeconds, setCountdownSeconds] = useState(calculateRemainingTimeInSeconds());
  const [isTimer, setIsTimer] = useState(false);
  const userAnswerInputRef = useRef(null);

  //Toasts
  const existentialCrisisMessages = [
    "Your answer is so wrong, even Schroedinger's cat is disappointed in you.",
    "Congratulations! Your answer just broke the laws of physics and common sense simultaneously.",
    "I bet even your pet rock is questioning your life choices after that answer.",
    "If your brain were a computer, it would be in desperate need of a software update.",
    "Your answer is the reason why aliens won't talk to us. They've seen your responses and lost faith in humanity.",
    "In an alternate universe, your answer might make sense. Unfortunately, we're stuck in this one.",
    "I'd say your answer is out of this world, but even aliens wouldn't believe how wrong it is.",
    "Were you dropped on your head as a child? It would explain a lot.",
    "Your answer is a testament to the limitless bounds of human incompetence.",
    "I'm genuinely impressed by how consistently wrong your answers are.",
    "Congratulations! You've just set a new record for the most incorrect answers in a row.",
    "The correct answer is chasing you, but you have always been faster.",
    "After that answer, your parents shouldn't be proud of you",
  ];

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * existentialCrisisMessages.length);
    return existentialCrisisMessages[randomIndex];
  };
  
  const wrongAnswer = () => {
    const message = getRandomMessage();
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const correctAnswer = () => toast.success('Correct answer!!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});


const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const fs = require(fs);
const path = require('path');

const sentChartData = (userName, lastSubmissionTime) => {
  const targetDate = new Date('2024-02-04T10:00:00'); 
  const currentUser = userName;
  const quesMinTime = Math.floor((lastSubmissionTime-targetDate) / (1000 * 60));

  const filePath = path.join(__dirname, 'Client/src/data/lineChart.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const chartData = JSON.parse(jsonData);

  const existingUser = chartData.find((user) => user.name === currentUser);
  if (existingUser) {
    existingUser.quesTime.push(quesMinTime);
  } else {
    const newUser = {
      name: currentUser,
      quesTime: [0],
      color: generateRandomColor(),
    };
    newUser.quesTime.push(quesMinTime);
    chartData.push(newUser);
  }
  fs.writeFileSync(filePath, JSON.stringify(chartData, null, 2), 'utf-8');
};


  // Spinner
  const [loading, setLoading] = useState(true);
  const spinnerRef = useRef(null);
  useEffect(() => {
    const spinner = spinnerRef.current;
    if (spinner) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, []);


  // Fetching Ques Data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/questions');
        const data = await response.json();
        setQuestionsData(data);
        console.log(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchData();
  }, []);


  // CountDown Timer
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdownSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(countdownInterval);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  function calculateRemainingTimeInSeconds() {
    const targetDate = new Date('2024-02-04T10:00:00');
    const currentTime = new Date();
    const timeDifference = targetDate.getTime() - currentTime.getTime();
    return Math.max(Math.floor(timeDifference / 1000), 0);
  }

  // Question Timer
  useEffect(() => {
    const intervalId = setInterval(updateQuestionTimer, 1000);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [lastSubmissionTimestamp]);
  
  const displayHint = () => {
    const [hintData, setHintData] = useState('Hint is still locked.');
    if (questionsData && questionsData[currentQuestionIndex].hint) {
      const hint = questionsData[currentQuestionIndex].hint.toString();
      setHintData(hint);
      console.log(hintData);
    }
    // Display or use hintData as needed
  };

  const currentUser = useSelector(selectCurrentUser);

  const checkAnswer = async () => {
    try {
      const username = currentUser.user.name;
      const questionNumber = questionsData.questions[currentQuestionIndex].questionNumber;
      const answer = userAnswerInputRef.current.value;
      console.log(username, questionNumber, answer)

      const response = await fetch('http://localhost:3500/submit-answer', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questionNumber, answer, username }),
      });

      const data = await response.json();

      if (response.ok) {
          correctAnswer();
          showNextQuestion();
          setLastSubmissionTimestamp(Date.now());
          sentChartData(currentUser.user.name, lastSubmissionTimestamp);
      } else {
          wrongAnswer();
          userAnswerInputRef.current.value = '';
      }
    } catch (error) {
        console.error(error);
    }
  };

  const showNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length) {
      setQuestionTimerSeconds(0);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      if (userAnswerInputRef.current) {
        userAnswerInputRef.current.value = '';
      }
    } else {
      // Quiz is over
    }
  };

  const updateQuestionTimer = () => {
    if (isTimer) {
      const currentTime = Date.now();
      const timeDifference = Math.floor((currentTime - lastSubmissionTimestamp) / 1000);
      setQuestionTimerSeconds(timeDifference);
    }
  };

  const handleToggle = () => {
    setIsTimer(prevIsTimer => !prevIsTimer);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {
    loading ? (
      <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
        <div ref={spinnerRef} id="spinner" className="relative">
          <l-quantum size="100" speed="2" color="white"></l-quantum>
        </div>
      </div>
    ) : (
      <div className="main min-h-screen fixed inset-0 bg-cover overflow-hidden" style={{ backgroundImage: 'url("../../public/low-angle-shot-mesmerizing-starry-sky 1.png")' }}>
      <Navbar />
      <div className="quizContainer p-4 text-white">
        <div id="quizTimer" className="fixed top-0 left-1/2 transform -translate-x-1/2 m-4 mb-8 z-9 sec-heading">
          {countdownSeconds > 0 ? (
            <>
              <p className="info"> Time remaining </p>
              <p className="time">
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

        <div className="flex h-100 flex-col sm:flex-row">
          <motion.div
            layout
            initial={{ borderRadius: 10 }}
            animate={{ width: isOpen ? 350 : 20, height: isOpen ? 'auto' : 20 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`parent questionNumber border border-gray-300 p-4 m-4 rounded-lg cursor-pointer relative overflow-hidden`}
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  layout
                  className="child"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="tracking-wider max-w-max mx-auto mb-4 text-white"> Question Numbers </h1>
                  <ul className="displayQuestionNumbers grid grid-cols-4 gap-2">
                    {Array.from({ length: currentQuestionIndex + 2 }, (_, index) => (
                      <li key={index + 1}>{index + 1}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {!isOpen && <div className="dot bg-green-500 w-4 h-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
          </motion.div>

          <div className="questions-container flex-col mx-auto my-auto p-3 rounded-xl h-full w-1/2 mt-28 flex justify-center item-center">
            <div className="questionAnswer ml-4 flex flex-col items-center">
              <div className="questions p-4 m-4 text-white">
                <p id="questionStatement" className="text-3xl font-bold">
                  { currentQuestionIndex < questionsData.questions.length 
                      ? `${questionsData.questions[currentQuestionIndex].questionStatement}` 
                      : `You have completed all the questions.`   }
                </p>
              </div>
              <motion.div
                layout
                className="flex text-lg text-center justify-center mb-4 p-1 w-fit mx-auto"
              >
                <input
                  type="text"
                  id="userAnswer"
                  ref={userAnswerInputRef}
                  placeholder="Enter your answer"
                  className=" p-2 mt-4 mx-auto text-black rounded-lg focus:outline-none"
                  autoComplete="off"
                />
              </motion.div>
            </div>

            <div
              onClick={handleToggle}
              className="Timer flex items-center justify-center p-2 mb-4 mx-auto"
            >
              {isTimer ? (
                <motion.div
                  id="questionTimer"
                  className="m-4 text-sm text-white text-xl flex flex-auto items-center justify-center"
                >
                  <div>
                    {`${Math.floor(questionTimerSeconds / 60) > 0 ? Math.floor(questionTimerSeconds / 60) + ' M ' : ''} : ${questionTimerSeconds % 60} S`}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  id="showQuestionTimer"
                  className="m-4 text-sm text-white flex items-center justify-center"
                >
                  ⏳
                </motion.div>
              )}
            </div>

            <div className="flex items-center justify-center p-2 mb-4 mx-auto">
              <motion.button
                id="hintButton"
                onClick={displayHint}
                whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md w-20 hover:bg-blue-700"
              >
                Hint
              </motion.button>
              <motion.button
                id="submitButton"
                onClick={checkAnswer}
                whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                className="bg-green-500 text-white px-4 py-2 mr-2 rounded-md w-20 hover:bg-green-700"
              >
                Submit
              </motion.button>
            </div>
          </div>
        </div>
      </div>
          <ToastContainer />
    </div>
    )}
    </>
    );
};

export default Portal;