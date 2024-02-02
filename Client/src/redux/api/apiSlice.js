import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './apiBaseQuery';

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
        leaderboard: builder.query({
            query: () => "/leaderboard",
        }),
        questions: builder.query({
            query: () => "/api/questions",
        }),
        chart: builder.query({
            query: () => "/chart",
        }),
        submitAnswer: builder.mutation({
            query: body => ({
                url: '/submit-answer',
                method: "POST",
                body: { ...body }
            })
        })
    })
})

export const { useLoginMutation, useLeaderboardQuery, useQuestionsQuery, useSubmitAnswerMutation, useChartQuery } = apiSlice;