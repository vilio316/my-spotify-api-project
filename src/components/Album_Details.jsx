import { useParams } from "react-router-dom";
import { useFetchAlbumQuery, useGetArtistAlbumsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";
import { makeTimeString } from "./PlaylistLoad";
import { SongInAlbum } from "./SongComponents";

export function Album_Info(){
    const id = useParams();
    const {data, error} = useFetchAlbumQuery(id.ID)

    return(
        <>
        <Header/>
        {data ? <>
        <div id='song_card'>
            <div style={{display:"grid", placeItems:"center"}}>
            <img src = {data.images[1].url} style={{ width:"90%"}} alt={`${data.name} Album Cover Art`} />
            </div>
            <div style={{alignSelf:"center"}}>
                <h2>{data.name}</h2>
                <p>Artist(s): {data.artists.map((artiste) => (
            <span key={artiste.id}><a style={{textDecoration: "none", fontStyle:"italic"}} href={`/artists/${artiste.id}`}>{artiste.name} - </a></span>
        ))}</p>
                <p>{data.tracks.items.length} songs</p>
                <p>Release Date: {data.release_date}</p>
            </div>
        </div>
        <div style={{padding: "0.5rem", display:"grid", justifySelf:"center", width: "95%", marginTop:"1rem"}}>
            {data.tracks.items.map((track)=> (
            <div className="side_number" style={{display: "grid"}} key={track.id}>
            <p>{data.tracks.items.indexOf(track) + 1}.</p>
            <SongInAlbum object={track}/>
            </div>
           
                ))}
             <p>Copyright: {data.copyrights[0].text}</p>
        </div>
        </> : <>{error? <p>{error.data.error.status}: {error.data.error.message}</p> : <p>Loading...</p>}</>}
        </>
    )
}