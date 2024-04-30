import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect } from "react";
import { useFindUserQuery, useFindUserDetailsQuery, useFindUserTopItemsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";

export default function ProfileUI(){
 const {data} = useFindUserQuery();

    return(
        <>
         <Header/>
        <h2><u>Your Profile Data</u></h2>
        {data? <>
            <p>Display Name : {data.display_name}</p>
            <p>Spotify ID: {data.id}</p>
            <p>Follower Count : {data.followers.total}</p>
            <a href={data.external_urls.spotify}>Spotify</a>
        </>: <p>Loading...</p>}
        <ProfileShow/>
        <GetUserTop/>
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
                <div key={playlist.id} style={{display:"grid", gridTemplateColumns:"20% auto", alignContent:"center", alignItems:"center", margin: '0.5rem 0'}}>
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
            <p>Loading...</p>
        </>  }</div>
        </>
    )
}

 function GetUserTop(){
let {data, error} = useFindUserTopItemsQuery('medium_term');

return(
    <>
    {data? <>
    <div>
        <h2>Your Top Songs</h2>
        <div style={{display:"grid",gridTemplateColumns:"auto auto auto auto auto",
        padding: '0.5rem'
    }}>
        {data.items.map((item) => (
            <div key={item.id}>
                <div>
                <img src={item.album.images[0].url} alt={item.name} style={{width: '75%'}}/>
                </div>
                <div>
                <p style={{width:"90%", textAlign:"left", }}>{item.name}</p>
                    </div>
                </div>
        ))}
        </div>
    </div>
    </> : <>{error? <p>{error.data.error.message}</p> : <p>Loading...</p>}</>}
    </>
)
 }