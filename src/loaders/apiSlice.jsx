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
            query: () => `/me/playlists`,
        }),
        findUser: builder.query({
            query: (id) => `/me`,
        }),
        getPlaylist : builder.query({
            query: (id) => `playlists/${id}`
        }),
        getSongDetails: builder.query({
            query: (id) => `/tracks/${id}`
        })
    })
})

export const { useFindUserQuery, useFindUserDetailsQuery, useGetPlaylistQuery, useGetSongDetailsQuery } = spotifyApi
