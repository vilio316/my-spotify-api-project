import { useGetArtistAlbumsQuery, useGetArtistQuery } from "../loaders/apiSlice";
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from "./Header";
export default function ArtistData(){
    let artist_id = useParams()
    const {data, error} = useGetArtistQuery(artist_id.artistID);
    const go = useNavigate()
    const Artist_Albums = () =>{
        const {data, error} = useGetArtistAlbumsQuery(artist_id.artistID);

        return(
            <>
            <h2>Top Albums</h2>
            {data ? <>
            <div className="artist_albums" style={{display:'grid', width:"100%"}}>
                {data.items.map((item) => (
                    <div key={item.id} style={{padding:"0.75rem", margin:'0.25rem'}}onClick={()=> go(`/albums/${item.id}`)}>
                        
                        <div style={{display:"grid"}}>
                        <img src={item.images[1].url} alt={item.name} className="artistPhoto"/>
                        </div>
                        
                        <p className="albumTitle" style={{fontSize:"1.25rem", width: '10rem'}}><a href={`/albums/${item.id}`}>
                        {item.name}</a>
                        </p>
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
        <div className="artiste_header">
            <div style={{justifyItems:"center", alignItems:"center", display:"grid" }}>
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

