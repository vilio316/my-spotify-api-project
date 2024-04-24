import { makeTimeString } from "./PlaylistLoad"

export function SongFromSearch(props){
    let object = props.object

    return(
        <>
        <div style={{display: "grid", gridTemplateColumns:"10% 70% auto", alignContent:"center", alignItems:"center", padding:"0.5rem 0.25rem"}}>
            <div>
                <img src={object.album.images[2].url} alt={object.name} style={{width: "75%", borderRadius:"0.75rem"}}></img>
            </div>
        <div key={object.id}>
                <p style={{fontSize:"1.5rem"}}><a href={`/song/${object.id}`}>{object.name} - {object.artists[0].name}</a></p>
                <p><a href={`/artists/${object.artists[0].id}`}>{object.artists[0].name}</a></p>
        </div>
        <p>
            {makeTimeString(object.duration_ms)}
        </p>
            </div>
        </>
    )
}