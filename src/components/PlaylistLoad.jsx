import { useParams } from "react-router-dom";
import { useGetPlaylistQuery } from "../loaders/loaders";

export function Playlist(){
    const play_id = useParams()
    console.log(play_id)

    const {data} = useGetPlaylistQuery(play_id.playID)

    const popScore = (array) => {
        let popTotal = 0
        for(let j = 0; j < array.length; j++){
            popTotal+= Number(array[j].track.popularity);
        }
        return (Math.ceil(popTotal / array.length))
    }

    return(
        <>
        {data ? <>
        <p>{data.name}</p>
        <p><i>{data.description}</i></p>
        <img src={data.images[0].url} alt={data.name}/>
        <p>Items : {data.tracks.items.length} songs</p>
        {data.tracks.items.map((track) => (
            <div key={track.track.id}>
                <p>{track.track.name}</p>
            </div>
        ))}
        <p>Popularity Score: {popScore(data.tracks.items)}</p>
        </> : <p>Loading... Please wait a moment</p>}
        </>
    )
}