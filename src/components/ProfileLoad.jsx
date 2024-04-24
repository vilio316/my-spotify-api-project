import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect } from "react";
import { useFindUserQuery, useFindUserDetailsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";

export default function ProfileUI(){
 
    return(
        <>
         <Header/>
        <h2><u>Your Profile Data</u></h2>
        
        <ProfileShow/>
        </>
    )
}

export function ProfileShow(){
    const { data, error, isLoading } = useFindUserDetailsQuery();

    return(
        <>
       
        <h3>Your Playlists: </h3>
        <div>{data?
        <>
            {data.display_name}
            <div>
                {data.items.map((playlist) => (
                <div key={playlist.id} style={{display:"grid", gridTemplateColumns:"20% auto", alignContent:"center"}}>
                <div>
                    <img src={playlist.images[0].url} style={{
                        width: "75%",
                        borderRadius: "1.25rem",
                    }}/>
                </div>
                <div>
                                    <p style={{fontSize: "1.5rem"}}> 
                    <a href={`/playlists/${playlist.id}`}>{playlist.name}</a></p>
                </div> 
                </div>   
            ))}</div>
            </>
        : <>
            <p>Loading</p>
        </>  }</div>
        </>
    )
}