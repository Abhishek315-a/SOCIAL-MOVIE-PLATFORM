import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { CgLogIn } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyProfile,getOtherUsers,getUser } from "../../redux/userSlice";
import { getAllTweets } from "../../redux/tweetSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.user);

  const handleLogout = () => {
    localStorage.clear(); // or remove only specific keys
    setIsDropdownOpen(false);
    navigate('/login');
    dispatch(getUser(null));
    dispatch(getOtherUsers(null));
    dispatch(getMyProfile(null));
    dispatch(getAllTweets(null));
    dispatch(logout());
  };

  const handlePasswordChange = () => {
    navigate("/update-password");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleFavourite = () => {
    navigate("/favourite");
  };
  const handleReview = () => {
    navigate("/review");
  };
  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to="/" className="brand">
            MOVIE<span>Flix</span>
          </Link>

          <div className="nav-links desktop-only">
            <Link to="/">HOME</Link>
            <Link to="/feed-home">SOCIAL FEED</Link>
            <Link to="/movies">MOVIE</Link>
            <Link to="/tvs">TV SERIES</Link>
            <Link to="/search">SEARCH</Link>
          </div>
        </div>

        <div
          className="header-right desktop-only"
          style={{ position: "relative" }}
        >
          <button
            className="header-right-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {user?user.name:"Guest"}
          </button>

          {isDropdownOpen && (
            <div className="dropdown-box">
              <button
                className="drop-btn"
                onClick={() => {
                  handleFavourite();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                <i className="fa-regular fa-heart"></i>
                <span>FAVOURITES</span>
              </button>
              <button
                className="drop-btn"
                onClick={() => {
                  handleReview();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                <i className="fa-regular fa-comment"></i>
                <span>REVIEWS</span>
              </button>
              <button
                className="drop-btn"
                onClick={() => {
                  handlePasswordChange();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                <i className="fa-solid fa-lock"></i>
                <span>PASSWORD UPDATE</span>
              </button>
              {!token ? (
                <button
                  className="drop-btn"
                  onClick={() => {
                    handleLogin();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                >
                  <CgLogIn size={20} />
                  <span>LOGIN</span>
                </button>
              ) : (
                <button
                  className="drop-btn"
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>LOGOUT</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <div className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          HOME
        </Link>
        <Link to="/feed-home" onClick={() => setIsOpen(false)}>
          SOCIAL FEED
        </Link>
        <Link to="/movies" onClick={() => setIsOpen(false)}>
          MOVIE
        </Link>
        <Link to="/tvs" onClick={() => setIsOpen(false)}>
          TV SERIES
        </Link>
        <Link to="/search" onClick={() => setIsOpen(false)}>
          SEARCH
        </Link>
        <Link to="/favourite" onClick={() => setIsOpen(false)}>
          FAVOURITES
        </Link>
        <Link to="/review" onClick={() => setIsOpen(false)}>
          REVIEWS
        </Link>
        <Link to="/update-password" onClick={() => setIsOpen(false)}>
          UPDATE PASSWORD
        </Link>
        {!token ? (
          <Link to="/login" onClick={() => setIsOpen(false)}>
            LOGIN
          </Link>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>
            LOGOUT
          </Link>
        )}
        <Link to="" onClick={() => setIsOpen(false)}>
          {user?user.name:"Guest"}
        </Link>
      </div>
    </>
  );
}
