import { makeTimeString } from "./PlaylistLoad"

export function SongFromSearch(props){
    let object = props.object

    return(
        <>
        <div style={
            {
                display: "grid", gridTemplateColumns:"10% 70% auto", alignContent:"center", alignItems:"center", 
                padding:"0.5rem 0.25rem"
             }
                }>
            <div>
                <img src={object.album.images[1].url} alt={object.name} style={{width: "90%",}}></img>
            </div>
        <div key={object.id}  style={
            {padding: '0.5rem'}
        }>
                <p style={{fontSize:"1.5rem"}}><a href={`/song/${object.id}`}>{object.name} </a></p>
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
         <div style={{display:"grid", gridTemplateColumns:"50% auto", alignContent:"center", alignItems:"center"}} key={object.id}>
                    <div>
                    <a href={`/song/${object.id}`}>{object.name}</a>
                    <p>
                    {object.artists.map((artiste) => (
            <span style={{fontSize:'0.75rem'}} key={artiste.id}><a style={{textDecoration: "none", fontStyle:"italic"}} href={`/artists/${artiste.id}`}>{artiste.name} - </a></span>
        ))}
        </p>
                    </div>
                    <p>{makeTimeString(object.duration_ms)}</p>
    </div>
    )
}