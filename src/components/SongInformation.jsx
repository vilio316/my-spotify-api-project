import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery, useGetTopItemsQuery } from '../loaders/apiSlice';
import { makeTimeString } from "../components/PlaylistLoad"

export default function SongInfo(){
    const id_value = useParams()
    const parameter = id_value.songID;

    const {data} = useGetSongDetailsQuery(parameter)

    return(
        <>
        {data? <>
        <p>{data.name}</p>
        {data.artists.map((artiste) => (
            <span key={artiste.id}><i>{artiste.name} - </i></span>
        ))}
        <img src={data.album.images[1].url} alt={data.name} style={{display:"block", borderRadius:"1.25rem"}}/>
        <p>From : {data.album.name}</p>
        <p> Duration : {makeTimeString(data.duration_ms) }</p>
        <p> Popularity Score: {data.popularity}</p>
        </>
        : <p>Loading...</p>}
        <Excalibur/>
        </>
    )
}
function Excalibur(){
    const {data} = useGetTopItemsQuery("artists")
    
    return(
        <>
        {data? <p>YEs</p>: <p>No</p>}
        </>
    )
}