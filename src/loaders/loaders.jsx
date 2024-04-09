import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const spotifyApi = createApi({
    reducerPath: 'spotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.spotify.com/v1",
        prepareHeaders: (headers, { getState }) =>{
            const token = getState().token.value;
            headers.set("Authorization", `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder)=> ({
        findUserDetails: builder.query({
            query: (type) => `/me`,
        }),
        findUser: builder.query({
            query: (id) => `/albums/${id}`,
        }),
    })
})

export const { useFindUserQuery, useFindUserDetailsQuery } = spotifyApi
