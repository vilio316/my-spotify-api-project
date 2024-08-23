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
    let seconds = time_val/1000
    return seconds
}
    return(
        <>
        {
            data ? <>
            <h3 style={{
                textDecoration:"underline"
            }}>Now Playing: </h3>
            <div id="np_wrapper">
            <div className="grid" id='player'>
            <SongFromSearch object={data.item}/>
            <div>
                <button style={{width: '5rem' ,height:"5rem", outline:"none", border:"none", borderRadius:'50%'}}>
                    {!data.is_playing ? <FaPlay size={'2.5rem'}/> : <FaPause size={'2.5rem'}/> }
                </button>
            </div>
            </div>
            
            <div id="playback_monitor_container">
            <div style={{
                display:"grid",
                gridTemplateColumns:"auto auto"
            }}>
            <span>{makeTimeString(data.progress_ms)} / {makeTimeString(data.item.duration_ms)} </span>
            <PlayState/>
            </div>
            <div className="grid">
            <input type="range" id="play_monitor" max={makeTimetoSeconds(data.item.duration_ms)} min={0} value={makeTimetoSeconds(data.progress_ms)} readOnly
            style={{
                color: 'green',
                width: '80%',
                display: 'grid',
                justifySelf:'center', 
                margin: '0.5rem 0'
            }}/>
            </div>
            </div>
            </div>
            </> : <>
            {error ? <>
            <p>{error}</p>
            </> : <><p>Error retrieving "Now Playing" state. </p></>}
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
        <span style={{
            display: 'grid',
            textAlign: 'right',
        }}>Listening on <b>{data.device.name}</b></span>
        </> : <><p>{error}</p></>}
        </>
    )
}