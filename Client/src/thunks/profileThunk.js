import { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } from '../redux/slices/profileSlice';

export const fetchProfile = () => async (dispatch) => {
    try {
        dispatch(fetchProfileStart());

        const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //Authorization
        },
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(fetchProfileSuccess(data.user));
        } else {
            dispatch(fetchProfileFailure(data.error || 'Failed to fetch user details'));
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        dispatch(fetchProfileFailure('Internal Server Error'));
    }
};
