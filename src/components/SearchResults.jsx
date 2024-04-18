import { useFindSearchItemQuery } from "../loaders/apiSlice";

export function SearchResults(props){
    let search_term = props.search_term;
    const {data} = useFindSearchItemQuery(search_term) 

    return(
        <>
        {search_term.length > 0 ? <>
        <h2>Search Results:</h2>
            {data ? <div>{data.tracks.items.map((item)=> (
            <div>
                <p><a>{item.name} - {item.artists[0].name}</a></p>
            </div>
        ))} </div>: <p>There aren't any great matches for your search</p>}
        </> : <p>Please Enter Search Term</p>}
        </>
    )
}