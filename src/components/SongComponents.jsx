import { makeTimeString } from "./PlaylistLoad"

export function SongFromSearch(props){
    let object = props.object

    return(
        <>
        <div id="search_comp" style={
            {
                display: "grid", alignContent:"center", alignItems:"center", 
                padding:"0.5rem 0.25rem"
             }
                }>
            <div>
                <img src={object.album.images[1].url} alt={object.name} className="search_image"></img>
            </div>
        <div key={object.id}  style={
            {padding: '0.5rem'}
        }>
                <p id="song_title"><a href={`/song/${object.id}`}>{object.name} </a></p>
                <p id="artistName"><a href={`/artists/${object.artists[0].id}`}>{object.artists[0].name}</a></p>
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
         <div className="album_song" style={{display:"grid", alignContent:"center", alignItems:"center"}} key={object.id}>
                    <div>
                    <a  style={{fontSize: "1.25rem"
                    }} href={`/song/${object.id}`}>{object.name}</a>
                    <p>
                    {
                    object.artists.length > 1? 
                    object.artists.map((artiste) => (
            <span style={{fontSize:'0.75rem'}} key={artiste.id}><a style={{textDecoration: "none", fontStyle:"italic"}} href={`/artists/${artiste.id}`}>{artiste.name} - </a></span>
        )) 
    : <span style={{fontSize: '0.75rem'}}>
            <a style={{textDecoration: "none", fontStyle:"italic"}} href={`/artists/${object.artists[0].id}`}>{object.artists[0].name}</a>
        </span>}
     </p>
                    </div>
                    <p style={{textAlign:"end"}}>{makeTimeString(object.duration_ms)}</p>
    </div>
    )
}