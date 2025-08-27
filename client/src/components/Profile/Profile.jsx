import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import "./Profile.css";
import banner from"../../assets/banner.jpg"
import { Link, useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "react-toastify";
import { followingUpdate } from "../../redux/userSlice";
import {getRefresh} from "../../redux/tweetSlice";

const Profile = () => {
  const {user,profile} = useSelector(store=>store.user);
  const {id} = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const handleFollowUnfollow=async()=>{
    const token = localStorage.getItem("token");
    if(user.following.includes(id)){
      // unfollow
      try {
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id:user?._id},{
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${token}`,
          }
        });
        console.log("Response:", res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        if(res.data.success){
          toast.success(res?.data?.message);
        }
      } catch (error) {
        toast.warning(error?.response?.data?.message);
      }
    }else{
      // follow
      try {
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id:user?._id},{
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${token}`,
          }
        });
        console.log("Response:", res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res?.data?.message);
      } catch (error) {
        toast.warning(error?.response?.data?.message);
      }
    }
  }

  return (
    <div style={{ width: "55%" }}>
      <div className="profile-card">
        <div className="profile-head">
          <Link to="/feed-home" className="back-button">
            <IoMdArrowBack size={24} />
          </Link>
          <div className="profile-top-username">
            <span>{profile?.name}</span>
            <p>100K posts</p>
          </div>
        </div>
        <img src={banner} alt="banner" className="banner-image"/>
        <div className="profile-avatar">
            <Avatar name="Abhishek"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                size={100}
                bgColor="#FF5733"/>
        </div>
        <div className="profile-edit">
          {
            profile?._id===user?._id ?(
              <button>Edit Profile</button>
            ) :
            (
              <button onClick={handleFollowUnfollow}>{user?.following?.includes(id) ? "UnFollow":"Follow"}</button>
            )
          }
        </div>
        <div className="profile-real-username">
          <h3>{profile?.name}</h3>
          <span>{`@${profile?.username}`}</span>
        </div>
        <div className="profile-bio">
          <p>✨ just a digital human tryna make sense of this pixelated world 🌍 
            | coding 💻, vibing 🎧, overthinking 🤯 | part-time dreamer ☁️ full-time procrastinator 😴 
            </p>
        </div>
        <div className="profile-locationandjoined">
          <div className="location-joined">
            <IoLocationOutline />
            <span>Chandigarh, India</span>
          </div>
          <div className="location-joined">
            <FaRegCalendarAlt />
            <span>Joined June 2020</span>
          </div>
        </div>
        <div className="follower-following">
          <div className="following">
             <span>186</span>
             <p>Following</p>
          </div>
          <div className="following">
             <span>2.2M</span>
             <p>Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
