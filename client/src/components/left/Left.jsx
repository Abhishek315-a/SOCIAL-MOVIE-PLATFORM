import React from 'react'
import "./left.css";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Left = () => {
    const {user} = useSelector(store=>store.user);
  return (
    <div style={{ width: '20%' ,height:"100vh"}}>
        <div className='main-left'>
            <div className="logo-left">
                <h2>MOVIE<span>Flix</span></h2>
            </div>
            <div className="navi-left">
                <Link to="/feed-home" className="nav-home">
                    <GoHomeFill size={24}/>
                    <span>Home</span>
                </Link>
                <Link to="" className="nav-home">
                    <FaSearch size={24}/>
                    <span>Explore</span>
                </Link>
                <Link  to="" className="nav-home">
                    <IoIosNotifications  size={24}/>
                    <span>Notifications</span>
                </Link>
                <Link to=""  className="nav-home">
                    <FaMessage size={24}/>
                    <span>Messages</span>
                </Link>
                <Link to={`/feed-home/profile/${user?._id}`} className="nav-home">
                    <FaUser size={24}/>
                    <span>Profile</span>
                </Link>
                <button className='left-post-btn'>Post</button>
            </div>
      
        </div>
    </div>
  )
}

export default Left
