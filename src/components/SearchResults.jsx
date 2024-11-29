import { useFindSearchItemQuery } from "../loaders/apiSlice";
import { SongFromSearch } from "./SongComponents";

export function SearchResults(props){
    let search_term = props.search_term;
    const {data, isLoading} = useFindSearchItemQuery(search_term) 

    return(
        <>
        {search_term.length > 0 ? <>
            {data ? 
            <>
            { isLoading ? <><p>Loading...</p></> :<>
            <h2 style={{padding:'0.5rem'}}>{`Search Results (${data.tracks.items.length}) `}</h2>
            <div style={{padding:'0.25rem 0.5rem'}}>{data.tracks.items.map((item)=> (
            <SongFromSearch object={item} key={item.id}/>
        ))} 
        </div>
        </>
        }

        </>: <p>There aren't any great matches for your search</p>}
        </> : <p>Please Enter Search Term</p>}
        </>
    )
}

export function SearchProcessor(props){
    let search = props.search

    if(props.search.length > 0){
        return (
            <SearchResults search_term={search}/>
        )
    }
}