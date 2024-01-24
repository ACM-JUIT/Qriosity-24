import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshUser, signOut } from "../../redux/slices/userSlice";

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

    if(result?.error?.originalStatus === 401) {
        console.log('sending refresh token');
        
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if(refreshResult?.data) {
            const user = api.getState().userSlice.user
            api.dispatch(refreshUser({...refreshResult.data}))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(signOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/login",
                method: "POST",
                body: { ...credentials }
            })
        }),
    })
})

export const { useLoginMutation } = apiSlice;