import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshUser, signOut } from "../slices/userSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().userSlice.access_token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery({
            credentials: "include",
            url: "/refresh",
            method: "POST",
            body: { refresh: api.getState().refresh_token }
        },
            api,
            extraOptions)
        if (refreshResult?.data) {
            api.dispatch(refreshUser({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(signOut())
        }
    }
    return result
}

export default baseQueryWithReauth;