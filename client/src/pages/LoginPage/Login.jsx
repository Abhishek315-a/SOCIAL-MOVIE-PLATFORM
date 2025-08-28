import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./Login.css";
import { getUser } from "../../redux/userSlice";
const REACT_APP_API_KEY = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
  e.preventDefault();
  try {
    if (!formData.email || !formData.password) {
      toast.warning("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    const res = await fetch(`${REACT_APP_API_KEY}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json(); // ✅ parse response
    const { success, message, token, name, user } = data;

    if (success && token && name && user) {
      // ✅ now it's safe to use
      dispatch(getUser(user)); // store user in redux

      localStorage.setItem("token", token);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("name", name);

      toast.success("Login Successfully");
      navigate("/");
    } else {
      toast.error(message || "Login failed");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  }
};

  return (
    <div className="login-container">
      <div className="box">
        <div className="title">
          <span>Login</span>
        </div>
        <div className="sub-container">
          <div className="label-class">
            <FaEnvelope className="icon" />
            <label htmlFor="email">Email</label>
          </div>
          <input
            className="input-box"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            placeholder="email"
          />
        </div>
        <div className="sub-container">
          <div className="label-class">
            <FaLock className="icon" />
            <label htmlFor="password">Password</label>
          </div>
          <input
            className="input-box"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            placeholder="password"
          />
        </div>
        <div className="btn-box">
          <button className="btn" onClick={handleClick}>
            Login
          </button>
        </div>
        <div className="btn-signup">
          <span>Don't have account ? </span>
          <Link to="/signup">SignUp Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
