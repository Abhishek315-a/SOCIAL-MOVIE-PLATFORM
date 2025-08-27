import React from "react";
import Avatar from "../Avatar/Avatar";
import "./Tweet.css";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { TWEET_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getRefresh } from "../../redux/tweetSlice";
import { MdDelete } from "react-icons/md";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handlelikeOrDeslike = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.warning(error.response.data.message);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      });
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.warning(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div style={{ borderBottom: ".1px solid gray" }}>
      <div>
        <div className="tweet-head">
          <Avatar size={40} />
          <div className="tweet-body">
            <div className="tweet-username">
              <h2>{tweet?.userDetails[0]?.name}</h2>
              <p
                style={{ color: "gray" }}
              >{`@${tweet?.userDetails[0]?.username} . 1m`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="tweet-engagement">
              <div
                onClick={() => handlelikeOrDeslike(tweet?._id)}
                className="real-engage-heart"
              >
                <FaRegHeart className="icon-background-heart" size={24} />
                <p style={{ fontSize: "1.5rem" }}>{tweet?.like?.length}</p>
              </div>
              <div className="real-engage-comment">
                <FaRegComment className="icon-background-comment" size={24} />
                <p style={{ fontSize: "1.5rem" }}>{tweet?.comment?.length}</p>
              </div>
              <div className="real-engage-save">
                <FaRegBookmark className="icon-background-bookmark" size={24} />
                <p style={{ fontSize: "1.5rem" }}>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div className="real-engage-save">
                  <MdDelete
                    onClick={()=>handleDelete(tweet?._id)}
                    className="icon-background-delete"
                    size={24}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
