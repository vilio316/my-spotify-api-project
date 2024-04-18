import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery } from '../loaders/apiSlice';
import { makeTimeString } from "../components/PlaylistLoad"
import { Header } from './Header';

export default function SongInfo(){
    const id_value = useParams()
    const parameter = id_value.songID;

    const {data, error} = useGetSongDetailsQuery(parameter)

    return(
        <>
        <Header/>
        {data? <>
        <span style={{fontSize: "2.5rem", fontWeight:"bold"}}>{data.name}</span>
        <p>Artists: {data.artists.map((artiste) => (
            <span key={artiste.id}><i>{artiste.name} - </i></span>
        ))}</p>
        <img src={data.album.images[1].url} alt={`${data.name}`} style={{display:"block", borderRadius:"1.25rem"}}/>
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