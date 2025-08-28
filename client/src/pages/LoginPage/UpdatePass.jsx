import React, { useState } from "react";
import "./UpdatePass.css";
import { toast } from "react-toastify";
const REACT_APP_API_KEY = import.meta.env.VITE_API_BASE_URL;

const UpdatePass = () => {
  const [formData, setFormData] = useState({
    old_pass: "",
    new_pass: "",
    con_new_pass: "",
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
    const token = localStorage.getItem("token");

    if (!formData.old_pass || !formData.new_pass || !formData.con_new_pass) {
      toast.warning("Please fill all fields");
      return;
    }
    if (formData.new_pass.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }
    if (formData.new_pass !== formData.con_new_pass) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${REACT_APP_API_KEY}/user/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: formData.old_pass,
          newPassword: formData.new_pass,
        }),
      });

      const data = await res.json();
      const { success, message } = data;

      if (success) {
        setFormData({
          old_pass: "",
          new_pass: "",
          con_new_pass: "",
        });
        toast.success("Password Updated Successfully");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="title">
          <span>Update Password</span>
        </div>
        <div className="sub-container">
          <input
            className="input-box"
            type="password"
            name="old_pass"
            value={formData.old_pass}
            onChange={handleChange}
            placeholder="Current password"
          />
        </div>
        <div className="sub-container">
          <input
            className="input-box"
            type="password"
            name="new_pass"
            value={formData.new_pass}
            onChange={handleChange}
            placeholder="New password"
          />
        </div>
        <div className="sub-container">
          <input
            className="input-box"
            type="password"
            name="con_new_pass"
            value={formData.con_new_pass}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>
        <div className="btn-box">
          <button className="btn" onClick={handleClick}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePass;
