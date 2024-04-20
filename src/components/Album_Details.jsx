import { useParams } from "react-router-dom";
import { useFetchAlbumQuery, useGetArtistAlbumsQuery } from "../loaders/apiSlice";
import { Header } from "./Header";

export function Album_Info(){
    const id = useParams();
    const {data, error} = useFetchAlbumQuery(id.ID)

    return(
        <>
        <Header/>
        {data ? <>
        <div style={{display: 'grid', gridTemplateColumns: "auto auto"}}>
            <img src = {data.images[1].url} style={{borderRadius:"1.25rem"}} />
            <div>
                <p>{data.name}</p>
                <p>{data.artists[0].name}</p>
            </div>


        </div>
        </> : <>{error? <p>{error.data.error.message}</p> : <p>Loading...</p>}</>}
        </>
    )
}