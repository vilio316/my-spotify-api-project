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
            query: () => `/me`,
        }),
        findUserTopArtists: builder.query({
            query: () => `/me/top/artists?time_range=short_term&limit=30`
        })
        ,
        findUserTopItems: builder.query({
            query: (range) => `/me/top/tracks?time_range=${range}&limit=50`
        }),
        getPlaylist : builder.query({
            query: (id) => `playlists/${id}`
        }),
        getSongDetails: builder.query({
            query: (id) => `/tracks/${id}`
        }), 
        searchArtist : builder.query({
            query: (term) => `/search?q=${term}&type=artist&limit=12` 
        }),
        findSearchItem: builder.query({
            query: (term) => `/search?q=${term}&type=track,album&limit=20`
        }), 
        getArtist: builder.query({
            query: (id) => `/artists/${id}`
        }),
        getArtistAlbums : builder.query({
            query: (id) => `/artists/${id}/albums?limit=20`
        }), 
        fetchAlbum : builder.query({
            query: (id) => `/albums/${id}`
        }),
        getNowPlaying: builder.query({
            query: (name) => `/me/player/currently-playing`
        }),
        fetchPlaybackState : builder.query({
            query:(name) => `/me/player`
        })
    })
})

export const { 
    useFindUserQuery, 
    useFindUserDetailsQuery, 
    useGetPlaylistQuery, 
    useGetSongDetailsQuery, 
    useFindSearchItemQuery, 
    useGetArtistQuery,
    useGetArtistAlbumsQuery,
    useSearchArtistQuery,
    useFetchAlbumQuery,
    useFindUserTopItemsQuery,
    useFindUserTopArtistsQuery,
    useGetNowPlayingQuery,
    useFetchPlaybackStateQuery,
 } = spotifyApi
