import { useParams } from "react-router-dom";
import { useGetPlaylistQuery } from "../loaders/apiSlice";

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
    console.log(play_id)

    const {data} = useGetPlaylistQuery(play_id.playID)

    

    return(
        <>
        {data ? <>
        <p>{data.name}</p>
        <p><i>{data.description}</i></p>
        <img src={data.images[0].url} alt={data.name}/>
        <p>Items : {data.tracks.items.length} songs</p>
        {data.tracks.items.map((track) => (
            <div key={track.track.id}>
                <p><a href={`/song/${track.track.id}`}>{track.track.name}</a></p>
                <p> Duration: {makeTimeString(track.track.duration_ms)}</p>
                <span></span>
            </div>
        ))}
        <p>Popularity Score: {popScore(data.tracks.items)}</p>
        </> : <p>Loading... Please wait a moment</p>}
        </>
    )
}