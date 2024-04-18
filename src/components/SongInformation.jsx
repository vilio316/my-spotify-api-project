import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery } from '../loaders/apiSlice';
import { makeTimeString } from "../components/PlaylistLoad"
import { Header } from './Header';

export default function SongInfo(){
    const id_value = useParams()
    const parameter = id_value.songID;

    const {data} = useGetSongDetailsQuery(parameter)

    return(
        <>
        <Header/>
        {data? <>
        <span style={{fontSize: "2.5rem", fontWeight:"bold"}}>{data.name}</span>
        {data.artists.map((artiste) => (
           <p key={artiste.id}>Artist(s): <span><i>{artiste.name} - </i></span></p>
        ))}
        <img src={data.album.images[1].url} alt={`${data.name}`} style={{display:"block", borderRadius:"1.25rem"}}/>
        <p>Release Date: {data.album.release_date}</p>
        <p> Duration : {makeTimeString(data.duration_ms) }</p>
        <p> Popularity Score: {data.popularity}</p>
        </>
        : <p>Loading...</p>}
        </>
    )
}