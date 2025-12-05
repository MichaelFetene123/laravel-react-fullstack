import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
const nameRef = useRef();
const emailRef = useRef();
const passwordRef = useRef();
const passwordComfirmationRef = useRef();
const [errors, setErrors] = useState();
const navigate = useNavigate();

const {setToken,setUser} = useStateContext();
const onSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: nameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value,
    password_confirmation: passwordComfirmationRef.current.value,
  };

  setErrors(null);

  try {
    const response = await axiosClient.post("/signup", payload);
    console.log(response);
    console.log(response.data);
    console.log(response.data.user);
    console.log(response.data.token);
    
    setUser(response.data.user);
    setToken(response.data.token);
  
  } catch (err) {
    const response = err.response;
    if (response && response.status === 422) {
      console.log(response.data.errors);
      setErrors(response.data.errors);
    }
  }
};
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Sign Up for an account</h1>

          {errors && (<div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>)}

          <input ref={nameRef} placeholder="Full Name" type="text" />
          <input ref={emailRef} placeholder="Email" type="email" />
          <input ref={passwordRef} placeholder="Password" type="password" />
          <input ref={passwordComfirmationRef} placeholder="Confirm Password" type="password" />
          <button className="btn btn-block" type="submit">
            Sign Up
          </button>
          <p className="message">
            Already Registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
