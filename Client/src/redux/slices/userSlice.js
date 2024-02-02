import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  access_token: null,
  refresh_token: null,
  isLoggedIn: false,
  leaderboard: []
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload.user;
      state.refresh_token = action.payload.refresh_token;
      state.access_token = action.payload.access_token;
      state.isLoggedIn = true;
    },
    refreshUser: (state, action) => {
      state.access_token = action.payload.accessToken;
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.leaderboard;
    },
    signOut: (state) => {
      state.user = {};
      state.refresh_token = null;
      state.access_token = null;
      state.isLoggedIn = false;
    },
    setCurrentUser: (state, action) => {
      state.user.currentQuestion = action.payload.currentQuestion;
    },
  }
});

export const { signIn, signOut, refreshUser, setLeaderboard, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state) => state.userSlice.user;
export const selectCurrentToken = (state) => state.userSlice.access_token;