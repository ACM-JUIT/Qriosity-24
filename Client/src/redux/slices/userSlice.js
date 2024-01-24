import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  access_token: null,
  refresh_token: null,
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.refresh_token = action.payload.refresh_token;
      state.access_token = action.payload.access_token;
      state.isLoggedIn = true;
    },
    refreshUser: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    signOut: (state) => 
    {
      state.user = {};
      state.refresh_token = null;
      state.access_token = null;
      state.isLoggedIn = false;
    }
  }
});

export const { signIn, signOut, refreshUser } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state) => state.userSlice.user;
export const selectCurrentToken = (state) => state.userSlice.access_token;