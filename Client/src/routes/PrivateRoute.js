import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/slices/userSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(selectCurrentToken);

    return (
        <Route
        {...rest}
        render={(props) =>
            isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
        />
    );
};

export default PrivateRoute;
