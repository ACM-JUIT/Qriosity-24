import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "../Styles/Home.css";
import Navbar from "../common/components/Navbar";
import { setLeaderboard } from "../redux/slices/userSlice";
import { useLeaderboardQuery } from "../redux/api/apiSlice";
import Chart from "./Chart";

function Leaderboard() {
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

  const dispatch = useDispatch();

  const { data, isSuccess } = useLeaderboardQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setLeaderboard(data));
    }
    //eslint-disable-next-line
  }, [data]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3500/leaderboard", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to fetch leaderboard. Status: ${response.status}`
  //       );
  //     }

  //     const data = await response.json();

  //     if (Array.isArray(data)) {
  //       setLeaderboard(data);
  //     } else {
  //       console.error("Invalid data format:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching leaderboard:", error);
  //   }
  // };

  // fetchData();

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
          className="main min-h-screen inset-0 bg-cover overflow-scroll"
          style={{
            backgroundImage:
              'url("../../public/low-angle-shot-mesmerizing-starry-sky 1.png")',
          }}
        >
          <Navbar />
          <div className="performanceGraph mx-auto h-4/5 md:w-3/4 mt-4 mb-16">
            <Chart />
          </div>
          <AnimatePresence mode="wait">
            <div className="stats h-screen w-screen p-4 mx-auto md:w-3/4">
              <h1 className="text-white flex justify-center item-center text-5xl sec-heading">
                Stats
              </h1>
              <div className="h-full w-full bg-gray-900 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-900 p-4 mt-10">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-center text-base text-white py-2 px-4 border-b sec-heading">
                        Rank
                      </th>
                      <th className="text-center text-base text-white py-2 px-4 border-b sec-heading">
                        Username
                      </th>
                      <th className="text-center text-base text-white py-2 px-4 border-b sec-heading">
                        Time Taken
                      </th>
                      <th className="text-center text-base text-white py-2 border-b sec-heading">
                        Questions Solved
                      </th>
                      <th className="text-center text-base text-white py-2 px-4 border-b sec-heading">
                        Points
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody>
                  {data.map((user, index) => (
                    <tr key={index} className="names">
                      <td className="text-white text-xl py-2 px-4 border-b ">
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : index + 1}
                      </td>
                      <td className="text-white text-xl py-2 px-4 border-b">
                        {user.name}
                      </td>
                      <td className="text-white text-xl py-2 px-4 border-b">
                        {index === 0
                          ? "🟢"
                          : index === 1
                          ? "🟢"
                          : index === 2
                          ? "🟢"
                          : index === 3
                          ? "🟢"
                          : index === 4
                          ? "🟢"
                          : index === 5
                          ? "🟢"
                          : "🔴"}
                      </td>
                      <td className="text-white text-xl py-2 border-b">
                        {user.points / 10}
                      </td>
                      <td className="text-white text-xl py-2 px-4 border-b">
                        {user.points}
                      </td>
                    </tr>
                  ))}
                </tbody> */}
                </table>
              </div>
            </div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default Leaderboard;
