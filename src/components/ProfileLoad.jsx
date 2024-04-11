import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect } from "react";
import { useFindUserQuery, useFindUserDetailsQuery } from "../loaders/apiSlice";

export default function ProfileUI(){
    const { data, error, isLoading } = useFindUserQuery('4aawyAB9vmqN3uQ7FjRGTy')
 
   
    return(
        <>
        <h2><u>Your Profile Data</u></h2>
        
        <ProfileShow/>
        </>
    )
}

export function ProfileShow(){
    const { data, error, isLoading } = useFindUserDetailsQuery();

    return(
        <>
        <p>Your Playlists: </p>
        <div>{data?
        <>
            {data.display_name}
            <div>{data.items.map((playlist) => (
                <p key={playlist.id}>
                    <a href={`/playlists/${playlist.id}`}>{playlist.name}</a></p>
            ))}</div>
            </>
        : <>
            <p>Loading...</p>
        </>  }</div>
        </>
    )
}