import { useParams } from 'react-router-dom'
import { useGetSongDetailsQuery } from '../loaders/apiSlice';
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
        <p> Duration : {makeTimeString(data.duration_ms) }</p>
        <p> Popularity Score: {data.popularity}</p>
        </>
        : <p>Loading...</p>}
        </>
    )
}