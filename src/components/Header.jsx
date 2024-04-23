import { useFindUserQuery } from "../loaders/apiSlice"

export function Header(){
    const {data} = useFindUserQuery();

    return(
        <>
        {data ? <div>
            <p style={{
                fontSize: "1.25rem", 
                color:"black", 
                backgroundColor:"green", 
                padding: "1.25rem", 
                borderRadius:"1.25rem",
                textAlign: "right"
                }}>
        <a href={`/`}>{data.display_name}</a></p>
        </div>: <p><a href="\">Sign In</a></p>}
        </>
    )
}