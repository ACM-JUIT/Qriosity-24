import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        fetchProfileStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        fetchProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const selectCurrentUser = (state) => state.profileSlice.user;
export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } = profileSlice.actions;
export default profileSlice.reducer;