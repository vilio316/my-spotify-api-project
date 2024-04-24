import { useGetArtistAlbumsQuery, useGetArtistQuery } from "../loaders/apiSlice";
import { useParams } from 'react-router-dom'
import { Header } from "./Header";
export default function ArtistData(){
    let artist_id = useParams()
    const {data, error} = useGetArtistQuery(artist_id.artistID);

    const Artist_Albums = () =>{
        const {data, error} = useGetArtistAlbumsQuery(artist_id.artistID);

        return(
            <>
            <h2>Top Albums</h2>
            {data ? <>
            <div style={{display:'grid', gridTemplateColumns:'auto auto auto auto auto', width:"90%"}}>
                {data.items.map((item) => (
                    <div key={item.id} style={{padding:"0.75rem", margin:'0.25rem', borderRadius:"1.25rem"}}>
                        <img src={item.images[1].url} style={{borderRadius:"1.25rem", width:"75%", maxHeight:"15rem"}}/>
                        <p style={{ overflow:"hidden"}}><a href={`/albums/${item.id}`} style={{width: '90%', height:"3.5rem", textOverflow:"ellipsis", display:"block",}}>{item.name}</a></p>
                        <p>
                            <span>{item.artists[0].name}</span>
                            <span style={{padding:"0 0.25rem", fontSize: "0.75rem"}}>{item.release_date}</span>
                            </p>
                    </div>
                ))}
            </div>
            
            
            </> : <>{error? <><p>{error.data.error.message}</p></> : <p>Loading...</p> }</>}
            </>
        )
    } 

    return(
      <>
      <Header/>
      {data ? 
        <>
        <div style={{display: "grid", gridTemplateColumns:"25% 50%"}}>
            <div style={{justifyContent:"right"}}>
         <img src={data.images[2].url} style={{borderRadius: '50%', padding:"0.5rem", width: '70%'}}></img>
         </div>
         <div style={{alignContent:"center"}}>

        <h2>{data.name}</h2>
        <p>Genres: {data.genres.map((genre)=> (
            <span key={genre} style={{textTransform: 'capitalize', padding: '0 0.125rem'}}>{genre}-</span>
        ))}</p>
        <span>Follower Count: {data.followers.total}</span>
      </div> 
      </div>
      <Artist_Albums/>
      </>
      : <>{error ? <div><p>{error.data.error.messge}</p></div> : <p>Loading...</p>} </> 
      }
      </>
    )
}

