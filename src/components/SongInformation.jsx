import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery } from '../loaders/apiSlice';
import { makeTimeString } from "../components/PlaylistLoad"
import { Header } from './Header';
import logo from '../assets/Spotify_Icon_RGB_Green.png'

export default function SongInfo(){
    const id_value = useParams()

    const {data, error} = useGetSongDetailsQuery(id_value.songID)

    return(
        <>
        <Header/>
        {data? <>
        <span style={{fontSize: "2.5rem", fontWeight:"bold"}}>{data.name}</span>
        <p>
            <span style={{
            fontWeight:"bold", fontSize:"1.25rem"
        }}>Artists</span>: <span style={{fontSize:"1.5rem"}}>{data.artists.map((artiste) => (
            <span key={artiste.id}><a style={{textDecoration: "none", fontStyle:"italic"}} href={`/artists/${artiste.id}`}>{artiste.name} - </a></span>
        ))}
        </span>
        </p>
        <div id="song_card">
            <div style={{justifyContent:"center", justifyItems:"center", display:"grid", alignContent:"center"}}>
        <img src={data.album.images[1].url} alt={`${data.name}`} style={{display:"block", width:"85%"}}/>
        </div>
        <div style={{alignItems:"center", alignContent:"center", fontSize: "1.25rem"}}>
        <p>Album : <a href={`/albums/${data.album.id}`}>{data.album.name}</a></p>
        <p>Release Date: {data.album.release_date}</p>
        <p> Duration : {makeTimeString(data.duration_ms) }</p>
        <p> Popularity Score: {data.popularity}</p>
        </div>
        </div>
        <div>
            <h2>Song Preview: </h2>
                <audio src={data.preview_url} controls controlsList='nodownload' />
                    </div>
            <div style={{display: 'grid', gridTemplateColumns:"3rem auto", alignItems:"center"}}>
                <img src={logo} style={{width: '2rem', borderRadius:"0.5rem"}}></img>
               <p style={{fontSize: "1.5rem"}}> <a href={data.external_urls.spotify}>Listen on Spotify</a>
            </p>
            </div>
        </>
        : <>
        {error ? <p>
            {error.status} : {error.data.error.message}
        </p> : <p>Loading...</p>}
        </>}
        </>
    )
}