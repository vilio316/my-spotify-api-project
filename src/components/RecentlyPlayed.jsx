import { useFetchRecentlyPlayedQuery } from "../loaders/apiSlice";
import { RecentlySong } from "./SongComponents";

export default function RecentlyPlayed(){
    const {data, isSuccess} = useFetchRecentlyPlayedQuery(1754930000000)
    console.log(data)
    return(
        <>
        <p>Recently Played</p>
       {data? 
        data.items.slice(0,5).map((item) => <div key={item.played_at} className="grid" style={{
            gridTemplateColumns: "80% 20%", rowGap: '1.25rem', padding: '0.5rem'
        }}>
        <RecentlySong item={item} />
        <RPItem item={item}/>
        </div>) : <p>Oops?</p>}
        </>
    )
}

function RPItem(props){
    const itemObj = props.item
    const date = new Date()
    const playTime = new Date(itemObj.played_at)

    function generateRelativeTimeString(){
        const difference = date.valueOf()  - playTime.valueOf()
        const seconds_val = Math.floor(difference/ 1000)
        if(seconds_val < 60 ){return `${seconds_val} seconds ago`}
        if(seconds_val > 60 && seconds_val < 3600){
            return `${Math.floor(seconds_val / 60)} minutes ago`
        }
        if(seconds_val > 3600){
            return `${Math.floor(seconds_val / 3600)} hours agp`
        }
    }

    return(
        <p>{generateRelativeTimeString()}</p>
    )
}