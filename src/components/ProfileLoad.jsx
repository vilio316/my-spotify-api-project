import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect, useState } from "react";
import { useFindUserQuery, useFindUserDetailsQuery, useFindUserTopItemsQuery, useFindUserTopArtistsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";
import logo from '../assets/Spotify_Icon_RGB_Green.png'

export default function ProfileUI(){

    return(
        <>
         <Header/>
        <h2><u>Your Profile Data</u></h2>
        <ProfileShort/>
        <ShowTopItems/>
        <ProfileShow/>
        
        </>
    )
}

export function ProfileShort(){
    const {data} = useFindUserQuery();

    return(
        <>
            {data? <>
            <p>Display Name : {data.display_name}</p>
            <p>Spotify ID: {data.id}</p>
            <p>Follower Count : {data.followers.total}</p>
            
            <div style={{display: 'grid' , gridTemplateColumns:"10% auto", gap:"0.25rem"}}>
                <img src={logo} alt="Spotify Logo" style={{width:"2.5rem"}} />
            <a style={{fontSize:"1.25rem"}} href={data.external_urls.spotify}>
                Spotify</a>
            </div>
        </>: <p>Loading...</p>}
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

export function GetUserTopTracks(){
let {data, error} = useFindUserTopItemsQuery('medium_term');

return(
    <>
    {data? <>
    <div>
        <h2>Your Top Songs</h2>
        <div style={{display:"grid",gridTemplateColumns:"auto auto auto auto",
        padding: '0.5rem'
    }}>
        {data.items.map((item) => (
            <div key={item.id}>
                <div>
                <img src={item.album.images[1].url} alt={item.name} style={{width: '75%'}}/>
                </div>
                <div>
                <p style={{width:"90%", textAlign:"left", }}>
                    <a href={`/song/${item.id}`}>{item.name}
                        </a>
                    </p>
                    </div>
                </div>
        ))}
        </div>
    </div>
    </> : <>{error? <p>{error.data.error.message}</p> : <p>Loading...</p>}</>}
    </>
)
 }

 export function GetUserTopArtists(){
    const {data, error} = useFindUserTopArtistsQuery();

    return(
        <>
        {data? <>
        <h2><u>Your Top Artists</u></h2>
        <div style={{
            display: "grid", gridTemplateColumns:"auto auto auto auto"
        }}>
            {data.items.map((item) => (
                <div key={item.id}>
                    <div>
                    <img src = {item.images[0].url} alt={item.name} style={{width: "85%"}}/>
                    </div>
                    <p><a href={`/artists/${item.id}`}>{item.name}</a></p>
                </div>
            ))}
        </div>
        </> : <p>...</p>}
        </>
    )
 }

 function ShowTopItems(){
    let [showState, setState] = useState('false')

    return(
        <>
        {showState? <GetUserTopArtists/> : <GetUserTopTracks/>}
        <div>
            <button onClick={()=> setState(true)}>Artists</button>
            <button onClick={()=> setState(false)}>Tracks</button>
            </div>
        </>
    )
 }