import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    otherUsers: null,
    profile: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.otherUsers = null;
      state.profile = null;
    },
    followingUpdate: (state, action) => {
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter(
          (itemId) => itemId !== action.payload
        );
      } else {
        state.user.following.push(action.payload);
      }
    },
  },
});
export const { getUser, getOtherUsers, getMyProfile, followingUpdate } =
  userSlice.actions;
export default userSlice.reducer;
