import { useLoaderData, useNavigate } from "react-router-dom";
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
            
            <div style={{display: 'grid' , gridTemplateColumns:"15% 25%", gap:"0.25rem", alignContent: 'center', alignItems:"center", width: "40%"}}>
                <div style={{display: "grid", justifyContent:"center", justifyItems:"center"}}>
                <img src={logo} alt="Spotify Logo" style={{width:"2rem"}} />
                </div>
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
let {data, error} = useFindUserTopItemsQuery('short_term');
let navigate = useNavigate()

return(
    <>
    {data? <>
    <div>
        <h2 style={{textDecoration:"underline"}}>Your Top Songs</h2>
        <div id="five_cols">
        {data.items.map((item) => (
            <div key={item.id} onClick={()=> 
                navigate(`/song/${item.id}`)
            }>
                <div style={{display:"grid", placeItems:"center"}}>
                <img className="artistPhoto" src={item.album.images[1].url} alt={item.name}/>
                </div>
                <div>
                <p className="albumTitle" style={{width: '12.5rem'}}>
                    {item.name}
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
    let navegando = useNavigate()

    return(
        <>
        {data? <>
        <h2><u>Your Top Artists</u></h2>
        <div id='five_cols'>
            {data.items.map((item) => (
                <div key={item.id} onClick={()=> navegando(`/artists/${item.id}`)}>
                    <div style={{display:"grid", placeItems:"center", margin:'0 0.75rem'}}>
                    <img className="artistPhoto" src = {item.images[0].url} alt={item.name}/>
                    </div>
                    <p className="albumTitle" ><a href={`/artists/${item.id}`} style={{fontSize:'1.5rem'}}>{item.name}</a></p>
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
        <div className='buttonHaus' style={{display:"grid", width: "100%", justifyItems:"center", gridTemplateColumns:"auto auto", justifyContent:"center"}}>
            <button onClick={()=> setState(true)}>Artists</button>
            <button onClick={()=> setState(false)}>Tracks</button>
            </div>
        </>
    )
 }