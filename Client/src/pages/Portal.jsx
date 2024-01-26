/* eslint-disable prefer-const */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../Styles/Home.css';
import '../Styles/portal.css';
import Navbar from '../common/components/Navbar';

const Portal = () => {
  
  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  const [lastSubmissionTimestamp, setLastSubmissionTimestamp] = useState(Date.now());
  const [countdownSeconds, setCountdownSeconds] = useState(calculateRemainingTimeInSeconds());
  const [isTimer, setIsTimer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3500/api/questions');
        const data = await response.json();
        setQuestionsData(data);
        console.log(questionsData);
        displayQuestion();
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    const intervalId = setInterval(updateQuestionTimer, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [lastSubmissionTimestamp]);

  function calculateRemainingTimeInSeconds() {
    const targetDate = new Date('2024-02-04T10:00:00');
    const currentTime = new Date();
    const timeDifference = targetDate.getTime() - currentTime.getTime();
    return Math.max(Math.floor(timeDifference / 1000), 0);
  }

  const displayQuestion = () => {
    setQuestionTimerSeconds(0);
  
    if (questionsData && questionsData.length > 0 && questionsData[currentQuestionIndex]) {
      const questionStatementBox = document.getElementById('questionStatement');
      if (questionStatementBox) {
        questionStatementBox.textContent = questionsData[currentQuestionIndex].questionStatement;
      }
    } else {
      console.error('Invalid questionsData or questions structure.');
    }
  };
  

  const displayHint = () => {
    let hintData = 'Hint is still locked.';
    if (questionsData && questionsData[currentAnswerIndex].hint) {
      hintData = questionsData[currentAnswerIndex].hint.toString();
    }
    // Display or use hintData as needed
  };

  const checkAnswer = () => {
    const userAnswerInput = document.getElementById('userAnswer');
    console.log(questionsData)
    if (userAnswerInput.value) {
      const userAnswer = userAnswerInput.value.toLowerCase();
      const correctAnswer = questionsData[currentAnswerIndex].answer.toLowerCase();
      if (userAnswer === correctAnswer) {
        showNextQuestion();
        setLastSubmissionTimestamp(Date.now());
        setCurrentAnswerIndex(prevIndex => prevIndex + 1);
      } else {
        // Handle incorrect answer
        console.log('wrong answer')
      }
    }
  };

  const showNextQuestion = () => {
    if (currentQuestionIndex < questionsData.questions.length - 1) {
      setQuestionTimerSeconds(0);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      displayQuestion();
      const userAnswerInput = document.getElementById('userAnswer');
      if (userAnswerInput) {
        userAnswerInput.value = '';
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
    <div className=" bg-cover bg-center min-h-screen p-4" style={{ backgroundImage: 'url("../../public/cropped-1920-1200-43865.jpg")' }}>
      <Navbar />
      <div className="quizContainer p-4 ">
        <div id="quizTimer" className="fixed top-0 left-1/2 transform -translate-x-1/2 m-4 mb-8 z-[999]">
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
                    {Array.from({ length: currentQuestionIndex + 1 }, (_, index) => (
                      <li key={index + 1}>{index + 1}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {!isOpen && <div className="dot bg-green-500 w-4 h-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
          </motion.div>

          <div className="questions-container flex-col mx-auto my-auto p-4 rounded-xl h-full w-1/2 flex justify-center ">
            <div className="questionAnswer ml-4 flex flex-col items-center">
              <div className="questions p-4 m-4 text-white">
                <p id="questionStatement" className="text-3xl font-bold"></p>
              </div>
              <motion.div
                layout
                className="flex text-lg text-center justify-center mb-4 p-1 w-fit mx-auto"
              >
                <input
                  type="text"
                  id="userAnswer"
                  placeholder="Enter your answer"
                  className=" p-2 mt-4 mx-auto text-black rounded-lg"
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
                whileHover={{ scale: 1.1, backgroundColor: 'lightblue', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md w-20"
              >
                Hint
              </motion.button>
              <motion.button
                id="submitButton"
                onClick={checkAnswer}
                whileHover={{ scale: 1.1, backgroundColor: 'lightblue', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-500 text-white px-4 py-2 mr-2 rounded-md"
              >
                Submit
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;