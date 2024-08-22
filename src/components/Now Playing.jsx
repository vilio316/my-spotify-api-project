import { useFetchPlaybackStateQuery, useGetNowPlayingQuery } from "../loaders/apiSlice";
import { makeTimeString } from "./PlaylistLoad";
import { SongFromSearch } from "./SongComponents";
import { FaPlay, FaPause } from "react-icons/fa6";

export function NowPlaying(){
    let { data, error} = useGetNowPlayingQuery('two', {
        pollingInterval: 1000,
        skipPollingIfUnfocused: false,
    })
function makeTimetoSeconds(time_val){
    let ms = time_val
    let seconds = time_val/1000
    return seconds
}
    return(
        <>
        {
            data ? <>
            <h2 style={{
                textDecoration:"underline"
            }}>Now Playing: </h2>
            <div className="grid" style={{gridTemplateColumns:"80% auto", alignItems:"center"}}>
            <SongFromSearch object={data.item}/>
            <div>
                <button style={{width: '3.5rem' ,height:"3.5rem", outline:"none", border:"none", borderRadius:'50%'}}>
                    {!data.is_playing ? <FaPlay/> : <FaPause/> }
                </button>
            </div>
            </div>
            <PlayState/>
            <p>{data.is_playing? <span>Playing... {makeTimeString(data.progress_ms)} / {makeTimeString(data.item.duration_ms)}</span> : <span>Paused</span>}</p>
            <div>
            <input type="range" id="play_monitor" max={makeTimetoSeconds(data.item.duration_ms)} min={0} value={makeTimetoSeconds(data.progress_ms)} readOnly
            style={{
                color: 'green',
                width: '90%'
            }}/>
            </div>
            </> : <>
            {error ? <>
            <p>{error.message}</p>
            </> : <><p>Whoops!</p></>}
            </>
        }
        </>
    )
}

function PlayState(){
    let {data, error} = useFetchPlaybackStateQuery()
    
    return(
        <>
        {data ? <>
        <p>Listening on {data.device.name}</p>
        </> : <><p>{error.message}</p></>}
        </>
    )
}