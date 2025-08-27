import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh ,isActive} = useSelector((store) => store.tweet);

  const handleFollowingTweet = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${TWEET_API_END_POINT}/getfollowingtweet/${id}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(getAllTweets(res.data.tweets));
      } catch (error) {
        toast.warning(error);
        console.log(error);
      }
    };

    const fetchTweets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }

        const res = await axios.get(
          `${TWEET_API_END_POINT}/getalltweet/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          dispatch(getAllTweets(res.data.tweets));
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

  useEffect(() => {
    if(isActive){
        fetchTweets();
    }else{
        handleFollowingTweet();
    }
  }, [id, refresh,isActive]);
};

export default useGetMyTweets;
