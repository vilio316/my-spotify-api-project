import { useFetchRecentlyPlayedQuery } from "../loaders/apiSlice";
import { RecentlySong } from "./SongComponents";

export default function RecentlyPlayed(){
    const {data} = useFetchRecentlyPlayedQuery(1754930000000, {
        pollingInterval: 60000,
        skipPollingIfUnfocused: false,
        
    })
    console.log(data)
    return(
        <div style={{margin: '0.5rem 0'}}>
        <p style={{
            fontSize: "1.5rem", fontWeight: "bold", margin: "0"
        }}>Recently Played</p>
       {data? 
        data.items.slice(0,5).map((item) => <div key={item.played_at} className="grid" style={{
            gridTemplateColumns: "80% 20%", rowGap: '1.25rem', padding: '0.5rem', alignItems: 'center',
        }}>
        <RecentlySong item={item} />
        <RPItem item={item}/>
        </div>) : <p>Oops?</p>}
        </div>
    )
}

function RPItem(props){
    const itemObj = props.item
    const date = new Date()
    const playTime = new Date(itemObj.played_at)

    function generateRelativeTimeString(){
        const difference = date.valueOf()  - playTime.valueOf()
        const seconds_val = Math.floor(difference/ 1000)
        if(seconds_val < 60 ){return `${seconds_val} secs ago`}
        if(seconds_val > 60 && seconds_val < 3600){
            return `${Math.floor(seconds_val / 60)} mins ago`
        }
        if(seconds_val > 3600){
            return `${Math.floor(seconds_val / 3600)} hrs ago`
        }
    }

    return(
        <p>{generateRelativeTimeString()}</p>
    )
}