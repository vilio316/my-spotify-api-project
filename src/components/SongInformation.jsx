import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery } from '../loaders/apiSlice';
import { makeTimeString } from "../components/PlaylistLoad"
import { Header } from './Header';

export default function SongInfo(){
    const id_value = useParams()

    const {data, error} = useGetSongDetailsQuery(id_value.songID)

    return(
        <>
        <Header/>
        {data? <>
        <span style={{fontSize: "2.5rem", fontWeight:"bold"}}>{data.name}</span>
        <p>Artists: {data.artists.map((artiste) => (
            <span key={artiste.id}><a style={{textDecoration: "none", fontStyle:"italic"}} href={`/artists/${artiste.id}`}>{artiste.name} - </a></span>
        ))}</p>
        <img src={data.album.images[1].url} alt={`${data.name}`} style={{display:"block", borderRadius:"1.25rem"}}/>
        <p>Album : <a href={`/albums/${data.album.id}`}>{data.album.name}</a></p>
        <p>Release Date: {data.album.release_date}</p>
        <p> Duration : {makeTimeString(data.duration_ms) }</p>
        <p> Popularity Score: {data.popularity}</p>
        </>
        : <>
        {error ? <p>
            {error.status} : {error.data.error.message}
        </p> : <p>Loading...</p>}
        </>}
        </>
    )
}