import React from "react";
import "./feed.css";
import Avatar from "../Avatar/Avatar";
import { useState,useEffect,useRef } from "react";
import { CiImageOn } from "react-icons/ci";
import Tweet from "../tweet/Tweet";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../../utils/constant";
import {toast} from "react-toastify";
import { getAllTweets, getIsActive, getRefresh} from "../../redux/tweetSlice";

const Feed = () => {
   const tweets = useSelector(store=>store.tweet.tweets);
  const [description, setDescription] = useState("");
  const textareaRef = useRef(null);
  const {user} = useSelector(store=>store.user);
  const {isActive} = useSelector(store=>store.tweet);
  const dispatch = useDispatch();

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }, [description]);

  const handlePost=async()=>{
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description,id:user?._id},{
        headers: {
            "content-type":"application/json",
            Authorization: `Bearer ${token}`, 
          },
      })
      dispatch(getRefresh());
      if(res.data.success){
        toast.success(res.data.message);
        setDescription("");
      }
    } catch (error) {
      toast.warning(error);
      console.log(error);
    }
  };

  const handleForYou=async()=>{
    dispatch(getIsActive(true));
  }
  const handleFollowing=async()=>{
    dispatch(getIsActive(false));
  }

  return (
    <div className="feed-container">
      <div className="pura-feed">
        <div className="sticky-create-post">
          <div onClick={handleForYou}  className="feed-nav">
            <span style={{ borderBottom: isActive ? "5px solid gray" : "none",color:isActive?"white":"gray" }}>For you</span>
          </div>
          <div onClick={handleFollowing} className="feed-nav">
            <span style={{ borderBottom: !isActive ? "5px solid gray" : "none",color:!isActive?"white":"gray"}}>Following</span>
          </div>
        </div>

        <div className="main-feed">
          <div>
            <Avatar
              name="Abhishek"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              size={40}
              bgColor="#FF5733"
              
            />
          </div>
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="input-post"
            type="text"
            name=""
            placeholder="What's happening"
          />
        </div>

        <div className="post-all-btn">
          <div><CiImageOn size={32}/></div>
          <button className="post-button" onClick={handlePost}>Post</button>
        </div>
        
      </div>
      <div className="all-tweet">
          {
            tweets?.map((tweet)=><Tweet key={tweet?._id} tweet={tweet}/>)
          }
      </div>
    </div>
  );
};

export default Feed;
