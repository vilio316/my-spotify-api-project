import { makeTimeString } from "./PlaylistLoad"

export function SongFromSearch(props){
    let object = props.object

    return(
        <>
        <div style={{display: "grid", gridTemplateColumns:"auto 70% auto", alignContent:"center", alignItems:"center", padding:"0.5rem 0.25rem"}}>
            <div>
                <img src={object.album.images[2].url} alt={object.name} style={{width: "90%", borderRadius:"1.25rem"}}></img>
            </div>
        <div key={object.id}  style={
            {padding: '0.5rem'}
        }>
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

export function SongInAlbum(props){
    let object = props.object

    return(
         <div style={{display:"grid", gridTemplateColumns:"5% auto"}} key={object.id}>
                    <div>
                    <a href={`/song/${object.id}`}>{object.name}</a>
                    <p>Duration: {makeTimeString(object.duration_ms)}</p>
                    </div>
    </div>
    )
}