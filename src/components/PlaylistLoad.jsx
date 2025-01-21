import { useParams } from "react-router-dom";
import { useGetPlaylistQuery } from "../loaders/apiSlice";
import { Header } from "./Header";
import { SongFromSearch } from "./SongComponents";

export const popScore = (array) => {
    let popTotal = 0
    for(let j = 0; j < array.length; j++){
        popTotal+= Number(array[j].track.popularity);
    }
    return (Math.ceil(popTotal / array.length))
}
export const makeTimeString = (ms_value) =>{
    let second_val = Math.ceil(Number(ms_value / 1000))
    let minutes = Math.floor(second_val / 60)
    let seconds = second_val - (minutes * 60)
    if (seconds < 10){
        seconds = "0" + String(seconds)
    }
     return (`${minutes}:${seconds}`)
}

export function Playlist(){
    const play_id = useParams()
    const {data} = useGetPlaylistQuery(play_id.playID)

    return(
        <div className="wrapper">
        <Header/>
        {data ? <>
        <h2>{data.name}</h2>
        <p><i>{data.description}</i></p>
        <div id='song_card' style={{alignItems:"center", marginBottom:"1rem"}}>
        <div className="grid song_container">
        <img src={data.images[0].url} alt={data.name}/>
        </div> 

        <div>
        <p style={{fontSize: '1.5rem'}}>Items : <b>{data.tracks.total}</b> songs</p>
        <p>Popularity Score: <b>{popScore(data.tracks.items)}</b></p>
        {data.tracks.total > 100? <p style={{
            fontSize: '0.75rem'
        }}>Showing first 100 songs</p>: <p></p>}
        </div>
        </div>
     
        {data.tracks.items.map((track) => (
          <SongFromSearch object = {track.track} key={track.track.id}/>
        ))}
        </> : 
        <p>Loading... Please wait a moment</p>}
        </div>
    )
}