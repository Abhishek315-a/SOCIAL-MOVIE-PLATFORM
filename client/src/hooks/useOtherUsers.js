import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";
import { USER_API_END_POINT } from "../utils/constant";

const useOtherUsers = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchOtherProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }

        const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (res.data.success) {
          dispatch(getOtherUsers(res.data.otherUsers));
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchOtherProfile();
  }, [id, dispatch]);
};

export default useOtherUsers;
