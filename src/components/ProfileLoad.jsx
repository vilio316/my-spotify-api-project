import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect, useState } from "react";
import { useFindUserQuery, useFindUserDetailsQuery, useFindUserTopItemsQuery, useFindUserTopArtistsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";
import logo from '../assets/Spotify_Icon_RGB_Green.png'
import { NowPlaying } from "./Now Playing";

export default function ProfileUI(){

    return(
        <>
         <Header/>
        <h2><u>Your Profile Data</u></h2>
        <NowPlaying/>
        <ProfileShort/>
        <ShowTopItems/>    
        </>
    )
}

export function ProfileShort(){
    const {data} = useFindUserQuery();

    return(
        <>
            {data? <>
            <h3>Profile Overview</h3>
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
    let obj1 = {
        start: 0,
        lim: 6
    }
    const { data, error, isLoading } = useFindUserDetailsQuery(obj1);

    function SecondHalf(){
        let obj2 = {
            start: 7,
            lim:99
        }
        const {data} = useFindUserDetailsQuery(obj2)
        return(
            <>
            {data?
                <>
                {data.display_name}
                <div>
                    {data.items.map((playlist) => (
                    <div key={playlist.id} style={{display:"grid", gridTemplateColumns:"20% auto", alignContent:"center", alignItems:"center", gap:"0.25rem 0.5rem", margin:"0.5rem 0"}}>
                    <div className="grid" style={{
                        justifyContent:"center", 
                        justifyItems:'center'
                    }}>
                        <img src={playlist.images[0].url} className="playlist_img" />
                    </div>
                    <div>
                        <p style={{fontSize: "1.5rem", width:"85%", whiteSpace:"wrap"}}> 
                        <a href={`/playlists/${playlist.id}`}>{playlist.name}</a></p>
                    </div> 
                    </div>   
                ))}</div>
                </>
            : <>
                <p>Loading...</p>
            </>    
        }
            </>
        )
    }


    return(
        <>
       
        <h3 style={{
            margin:'0.75rem 0 0.25rem 0'
        }}>Your Playlists: </h3>
        <div>{data?
        <>
            {data.display_name}
            <div>
                {data.items.map((playlist) => (
                <div key={playlist.id} style={{display:"grid", gridTemplateColumns:"20% auto", alignContent:"center", alignItems:"center", gap:"0.25rem 0.5rem", margin:"0.5rem 0"}}>
                <div className="grid" style={{
                    justifyContent:"center", 
                    justifyItems:'center'
                }}>
                    <img src={playlist.images[0].url} className="playlist_img" />
                </div>
                <div>
                    <p style={{fontSize: "1.5rem", width:"85%", whiteSpace:"wrap"}}> 
                    <a href={`/playlists/${playlist.id}`}>{playlist.name}</a></p>
                </div> 
                </div>   
            ))}
            <SecondHalf/>
            </div>
            </>
        : <>
            <p>Loading...</p>
        </>  }</div>
        </>
    )
}

export function GetUserTopTracks(){
let [searchRange, editRange] = useState('short_term')
let {data, error} = useFindUserTopItemsQuery(searchRange);
let navigate = useNavigate()

return(
    <>
    {data? <>
        <h2 style={{textDecoration:"underline"}}>Your Top Songs</h2>
        <div className="buttonHaus" style={{gridTemplateColumns:"auto auto auto", margin: '0.5rem 0'}}>
            <button onClick={()=> editRange('short_term')}>4 Weeks</button>
            <button onClick={()=> editRange('medium_term')}>6 Months</button>
            <button onClick={()=> editRange('long_term')}>&gt; 1 Year</button>
        </div>
        <div id="five_cols">
        {data.items.map((item) => (
            <div key={item.id} onClick={()=> 
                navigate(`/song/${item.id}`)
            }>
                <div style={{display:"grid", placeItems:"center"}}>
                <img className="artistPhoto" src={item.album.images[0].url} alt={item.name}/>
                </div>
                <div className="grid" style={{
                    justifyContent:"center"
                }}>
                <p className="albumTitle" style={{textAlign:'center'}}>
                    {item.name}
                    </p>
                </div>
            </div>
        ))}
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
                    <p className="albumTitle" style={{textAlign:'center'}}><a href={`/artists/${item.id}`} style={{fontSize:'1.5rem'}}>{item.name}</a></p>
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