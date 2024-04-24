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
        <div style={{display: 'grid', gridTemplateColumns: "25% 50%"}}>
            <div style={{justifyContent:"center", alignContent:"center"}}>
            <img src = {data.images[1].url} style={{borderRadius:"1.25rem", width:"80%"}}/>
            </div>
            <div style={{alignSelf:"center"}}>
                <h2>{data.name}</h2>
                <p>Artists: {data.artists.map((artiste) => (
            <span key={artiste.id}><a style={{textDecoration: "none", fontStyle:"italic"}} href={`/artists/${artiste.id}`}>{artiste.name} - </a></span>
        ))}</p>
                <p>{data.tracks.items.length} songs</p>
                <p>Release Date:  {data.release_date}</p>
            </div>
        </div>
        <div style={{padding: "0.5rem"}}>
            {data.tracks.items.map((track)=> (
                <div style={{display:"grid", gridTemplateColumns:"5% auto"}} key={track.id}>
                    <p>{data.tracks.items.indexOf(track) + 1}.</p>
                    <div>
                    <a href={`/song/${track.id}`}>{track.name}</a>
                    <p>Duration: {makeTimeString(track.duration_ms)}</p>
                    </div>
                    </div>
                ))}
        </div>
        </> : <>{error? <p>{error.data.error.status}: {error.data.error.message}</p> : <p>Loading...</p>}</>}
        </>
    )
}