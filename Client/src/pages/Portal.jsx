import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCurrentUser } from "../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/Home.css";
import "../Styles/portal.css";
import Countdown from "../common/components/Countdown";
import Navbar from "../common/components/Navbar";
import {
  useQuestionsQuery,
  useSubmitAnswerMutation,
} from "../redux/api/apiSlice";

const Portal = () => {
  const user = useSelector(selectCurrentUser);
  const targetDate = new Date("2024-02-03T22:00:00Z");
  const dispatch = useDispatch();

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

  //eslint-disable-next-line
  const getRandomMessage = () => {
    const randomIndex = Math.floor(
      Math.random() * existentialCrisisMessages.length
    );
    return existentialCrisisMessages[randomIndex];
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

  const { data: questionsData } = useQuestionsQuery();
  console.log(questionsData);

  //Check for user's answer
  const [submit] = useSubmitAnswerMutation();
  const checkAnswer = async () => {
    try {
      const username = user.name;
      const questionNumber = user.currentQuestion + 1;
      const answer = userAnswerInputRef.current.value;
      console.log(username, questionNumber, answer);

      const response = await submit({
        questionNumber,
        answer,
        username,
      }).unwrap();

      console.log(response);

      if (response.correct == true) {
        dispatch(
          setCurrentUser({
            currentQuestion: response.currentQuestion,
          })
        );
        toast.success("Correct answer!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else if (response.correct == false) {
        toast.error(getRandomMessage(), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
          <div ref={spinnerRef} id="spinner" className="relative">
            <l-quantum size="100" speed="2" color="white"></l-quantum>
          </div>
        </div>
      ) : (
        <div
          className="main min-h-screen fixed inset-0 bg-cover overflow-scroll"
          style={{
            backgroundImage:
              'url("../../src/assets/low-angle-shot-mesmerizing-starry-sky 1.png")',
          }}
        >
          <Navbar />
          <Countdown targetDateProp={targetDate} />
          <div className="quizContainer p-4 text-white">
            <div className="flex h-100 flex-col sm:flex-row">
              <motion.div
                layout
                initial={{ borderRadius: 10 }}
                animate={{
                  width: isOpen ? 350 : 20,
                  height: isOpen ? "auto" : 20,
                }}
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
                      <h1 className="tracking-wider max-w-max mx-auto mb-4 text-white">
                        {" "}
                        Question Numbers{" "}
                      </h1>
                      <ul className="displayQuestionNumbers grid grid-cols-4 gap-2">
                        {Array.from(
                          { length: user.currentQuestion + 2 },
                          (_, index) => (
                            <li key={index + 1}>{index + 1}</li>
                          )
                        )}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                {!isOpen && (
                  <div className="dot bg-green-500 w-4 h-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </motion.div>

              {questionsData && (
                <div className="questions-container flex-col mx-auto my-auto rounded-xl w-1/2 mt-28 flex justify-center item-center">
                  <div className="questionAnswer flex flex-col items-center">
                    <div className="questions p-4 m-4 text-white">
                      <p
                        id="questionStatement"
                        className="text-sm md:text-2xl lg:text-3xl xl:text-3xl font-bold h-auto"
                      >
                        {user.currentQuestion < questionsData.questions.length
                          ? `${
                              questionsData.questions[user.currentQuestion]
                                .questionStatement
                            }`
                          : `Congratulations! You have successfully completed Qriosity 4.0.`}
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
                        className=" p-2 mt-4 mx-auto text-black text-md rounded-lg focus:outline-none w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-auto 2xl:w-auto"
                        autoComplete="off"
                      />
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-center p-2 mb-4 mx-auto">
                    <motion.button
                      id="hintButton"
                      onClick={() =>
                        toast.info(
                          questionsData.questions[user.currentQuestion].hint,
                          {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          }
                        )
                      }
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      }}
                      className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md w-20 hover:bg-blue-700 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-auto 2xl:w-auto text-sm md:text-md lg:text-xl xl:text-xl"
                    >
                      <p className="hidden sm:block">Hint</p>
                    </motion.button>
                    <motion.button
                      id="submitButton"
                      onClick={checkAnswer}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      }}
                      className="bg-green-500 text-white px-4 py-2 mr-2 rounded-md w-20 hover:bg-green-700 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-auto 2xl:w-auto text-sm md:text-md lg:text-xl xl:text-xl"
                    >
                      <p className="hidden sm:block">Submit</p>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Portal;
