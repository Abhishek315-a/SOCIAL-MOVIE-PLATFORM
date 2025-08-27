import React from "react";
import "./right.css";
import { CiSearch } from "react-icons/ci";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";

const Right = ({ otherUsers }) => {
  return (
    <div className="right-sidebar">
      {/* 🔎 Search */}
      <div className="search-input-btn">
        <CiSearch size={18} className="search-icon" />
        <input
          className="search-input-area"
          type="text"
          placeholder="Search Twitter"
        />
      </div>

      {/* 👥 Who to Follow */}
      <div className="follow-list-container">
        <h2>Who to follow</h2>
        {otherUsers?.slice(0, 3).map((user) => (
          <div key={user?._id} className="main-follow-list">
            <div className="follow-list">
              <Avatar
                name={user?.name}
                src="https://randomuser.me/api/portraits/men/1.jpg"
                size={40}
                bgColor="#FF5733"
              />
              <div className="follow-username">
                <h3>{user?.name}</h3>
                <p>@{user?.username}</p>
              </div>
            </div>
            <Link to={`/feed-home/profile/${user?._id}`} > 
            <button className="follow-btn">Profile</button> 
            </Link>
          </div>
        ))}
        <p className="show-more">Show more</p>
      </div>

      {/* 📊 Trends */}
      <div className="trends-container">
        <h2>Trends for you</h2>
        <div className="trend-item">
          <p className="trend-category">Trending in India</p>
          <h3>#AIRevolution</h3>
          <p className="trend-tweets">120K Tweets</p>
        </div>
        <div className="trend-item">
          <p className="trend-category">Technology</p>
          <h3>#OpenSource</h3>
          <p className="trend-tweets">45K Tweets</p>
        </div>
        <div className="trend-item">
          <p className="trend-category">Sports</p>
          <h3>#INDvsAUS</h3>
          <p className="trend-tweets">89K Tweets</p>
        </div>
        <p className="show-more">Show more</p>
      </div>
    </div>
  );
};

export default Right;
