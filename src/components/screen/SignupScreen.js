import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";
const SignupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => {
        toast.dark(err.message, { 
          position: "top-center",
        });
      });
  };

  const SignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => {
        toast.dark(err.message, {
          position: "top-center",
        });
      });
  };
  return (
    <>
      <div className="signupScreen">
        <form>
          <h1>Sign In</h1>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button type="submit" onClick={SignIn}>
            Sign In
          </button>
          <h4>
            <span className="signupScreen__gray">New to Netflix? </span>
            <span className="signupScreen__link" onClick={register}>
              Sign Up now.
            </span>
          </h4>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignupScreen;
