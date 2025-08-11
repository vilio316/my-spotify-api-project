import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect, useState } from "react";
import { useFindUserQuery, useFindUserDetailsQuery, useFindUserTopItemsQuery, useFindUserTopArtistsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";
import logo from '../assets/Spotify_Icon_RGB_Green.png'
import { NowPlaying } from "./Now Playing";
import { SongFromSearch } from "./SongComponents";
import RecentlyPlayed from "./RecentlyPlayed";

export default function ProfileUI(){

    return(
        <>
        <div className="wrapper">
         <Header/>
        <h2><u>Your Profile Data</u></h2>
        <NowPlaying/>
        <ProfileShort/>
        <ShowTopItems/>    
        </div>
        </>
    )
}

export function ProfileShort(){
    const {data} = useFindUserQuery();
    
    return(
        <>
        <RecentlyPlayed/>
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
    const {data} = useFindUserDetailsQuery();

    return(
        <div className="wrapper">
       <Header/>
        <h3 style={{
            margin:'0.75rem 0 0.25rem 0'
        }}>Your Playlists ({data ? data.items.length: 0}): </h3>
        <div>{data?
        <>
            {data.display_name}
            <div className="five-columns">
                {data.items.filter((value) => value!= null).map((playlist) => (
                <div className="playlist_container"  key={playlist.id} style={{display:"grid", alignItems:"center", margin:"0.25rem 0"}}>
                <div className="grid" style={{
                    justifyContent:"center", 
                    justifyItems:'center'
                }}>
                    <img src={playlist.images[0].url} className="artistPhoto"/>
                </div>
                <div>
                    <p className="albumTitle" id='playlist_title'>
                    <Link to={`/playlists/${playlist.id}`} >
                    {playlist.name}
                    </Link>
                    </p>
                    <p className="info-block">
                        <p>Owner: {playlist.owner.display_name}</p>
                        <p>{playlist.tracks.total} items</p>
                    </p>
                </div> 
                </div>   
            ))}
            </div>
            </>
        : <>
            <p>Loading...</p>
        </>  }</div>
        </div>
    )
}

export function GetUserTopTracks(){
let [searchRange, editRange] = useState('short_term')
let {data, error} = useFindUserTopItemsQuery(searchRange);
let navigate = useNavigate()

return(
    <>
    {data? <>
        <div className="buttonHaus" style={{gridTemplateColumns:"auto auto auto", margin: '0.5rem 0'}}>
            <button onClick={()=> editRange('short_term')}>4 Weeks</button>
            <button onClick={()=> editRange('medium_term')}>6 Months</button>
            <button onClick={()=> editRange('long_term')}>&gt; 1 Year</button>
        </div>
        <div id="five_cols_desktop">
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
        <div id='mobile_version'>
            {
                data.items.map((item) => (
                    <div className="grid" style={{
                        gridTemplateColumns: 'auto auto',
                        alignItems: "center"
                    }} key={item.id}>
                    <p style={{
                        fontSize: '1.5rem',
                        padding: '0 0.75rem',
                    }}>{data.items.indexOf(item) + 1}.</p>
                    <SongFromSearch object={item} key={item.id}/>
                    </div>
                ))
            }
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
        </> : <p>Loading...</p>}
        </>
    )
 }

 function ShowTopItems(){
    let [showState, setState] = useState('false')

    return(
        <div style={{
            display: "flex",
            flexDirection: 'column-reverse'
        }}>
        <div>
        {showState? <GetUserTopArtists/> : <GetUserTopTracks/>}
        </div>
        <div className='buttonHaus' style={{display:"flex", width: "100%", margin:"0.5rem 0", gap:'0.5rem'}}>
            <button onClick={()=> setState(true)} className={showState ? 'active' : ''}>Artists</button>
            <button onClick={()=> setState(false)} className={!showState ? 'active' : ''}>Tracks</button>
            </div>
            <h2 style={{
                marginTop: '0.5rem'
            }}><u>Your Top {showState? 'Artists': "Songs"}</u></h2>
        </div>
    )
 }