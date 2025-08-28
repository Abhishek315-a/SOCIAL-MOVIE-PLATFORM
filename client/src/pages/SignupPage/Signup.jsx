import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
const REACT_APP_API_KEY = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username:"",
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
      if (!formData.name || !formData.email || !formData.password) {
        toast.warning("All fields are required");
        return;
      }
      if (formData.password.length < 6) {
        toast.warning("Password must be at least 6 characters");
        return;
      }
      const res = await fetch(`${REACT_APP_API_KEY}/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Signup successful:", data);
        toast.success("SignUp Successfully");
        navigate("/login");
      } else {
        console.error(data.message || "Signup failed");
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Network error, please try again");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="title">
          <span>SignUp</span>
        </div>
        <div className="sub-container">
          <div className="label-class">
            <FaUser className="icon" />
            <label htmlFor="name">Name</label>
          </div>
          <input
            className="input-box"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="sub-container">
          <div className="label-class">
            <FaUser className="icon" />
            <label htmlFor="name">Userame</label>
          </div>
          <input
            className="input-box"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            id="username"
            placeholder="Username"
          />
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
            SignUp
          </button>
        </div>
        <div className="btn-login">
          <span>Already have an account</span>
          <Link to="/login"> Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
