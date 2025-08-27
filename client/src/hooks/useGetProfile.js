import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { USER_API_END_POINT } from "../utils/constant";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token
        if (!token) {
          console.warn("No token found in localStorage");
          return;
        }

        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token
          },
        });
        if (res.data.success) {
          dispatch(getMyProfile(res.data.user));
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [id, dispatch]);
};

export default useGetProfile;
