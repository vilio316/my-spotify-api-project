import { useParams } from "react-router-dom";
import { useFetchAlbumQuery, useGetArtistAlbumsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";
import { makeTimeString } from "./PlaylistLoad";

export function Album_Info(){
    const id = useParams();
    const {data, error} = useFetchAlbumQuery(id.ID)

    return(
        <>
        <Header/>
        {data ? <>
        <div style={{display: 'grid', gridTemplateColumns: "40% 50%"}}>
            <img src = {data.images[1].url} style={{borderRadius:"1.25rem"}} />
            <div>
                <h2>{data.name}</h2>
                <a href={`/artists/${data.artists[0].id}`}>{data.artists[0].name}</a>
            </div>
        </div>
        <div style={{padding: "0.5rem"}}>
            {data.tracks.items.map((track)=> (
                <>
                    <p>{data.tracks.items.indexOf(track) + 1}</p>
                    <a href={`/song/${track.id}`}>{track.name}</a>
                    <p>Duration: {makeTimeString(track.duration_ms)}</p>
                    </>
                ))}
        </div>
        </> : <>{error? <p>{error.data.error.message}</p> : <p>Loading...</p>}</>}
        </>
    )
}