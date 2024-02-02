import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import pfp from "../../public/svg/pfp.svg";
import "../Styles/Home.css";
import Navbar from "../common/components/Navbar";
import { selectCurrentUser, signOut } from "../redux/slices/userSlice";

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const signedOutToast = () => {
    toast.success("User logged out", {
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

  const logout = () => {
    dispatch(signOut());
    signedOutToast();
    
    setTimeout(() => {
      navigate("/login");
      console.log("User logged out");
    }, 2000);
  };

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
          className="main min-h-screen fixed inset-0 bg-cover overflow-hidden"
          style={{
            backgroundImage:
              'url("../../public/low-angle-shot-mesmerizing-starry-sky 1.png")',
          }}
        >
          <Navbar />
          <ToastContainer />
          <div className="bg-[#0c0c0c] h-1/2 w-1/2 mx-auto my-auto flex justify-center item-center shadow-[0px_4px_16px_rgba(17,17,26,0.5),_0px_8px_24px_rgba(17,17,26,0.5),_0px_16px_56px_rgba(17,17,26,0.1)]">
            {user ? (
              <div className="flex flex-col m-4 p-3">
                <h1 className="text-sm md:text-sm lg:text-2xl xl:text-3xl sec-heading mb-4 text-[#FDF0D1] mx-auto">
                  Welcome {user.name}
                </h1>
                <div className="flex flex-row">
                  <img
                    src={pfp}
                    alt=""
                    className="h-3/4 w-1/3 my-auto mx-auto"
                  />
                  <div>
                    <p className="text-lg sec-text mb-4 text-white">
                      <span className="text-xl sec-text mb-4 text-[#a6c8d6]">
                        Name:
                      </span>{" "}
                      {user.name}
                    </p>
                    <p className="text-lg sec-text mb-4 text-white">
                      <span className="text-xl sec-text mb-4 text-[#a6c8d6] ">
                        Email:
                      </span>{" "}
                      {user.email}
                    </p>
                    <p className="text-lg sec-text mb-4 text-white">
                      <span className="text-xl sec-text mb-4 text-[#a6c8d6]">
                        Points:
                      </span>{" "}
                      {user.points}
                    </p>
                    <button
                      className="mt-4 p-2 w-1/2 mx-auto my-auto bg-red-500 text-white font-thin rounded-md"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="font-bold sec-text">User data not found!!</p>
                <button
                  className="mt-4 p-2 bg-green-500 mx-auto my-auto text-white font-thin rounded-md"
                  // onClick={login}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
