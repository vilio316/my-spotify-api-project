import { useState } from "react";
import { useFindUserQuery } from "../loaders/apiSlice"
import { useNavigate } from "react-router-dom";


export function Header(){
    const {data} = useFindUserQuery();
    let navigate = useNavigate();
    let [state, setState] = useState(false)

    return(
        <>
        {data ? <div style={{position:"relative"}} onMouseEnter={() => setState(true)} onMouseLeave={()=> setState(false)}>
            <p style={{
                fontSize: "1.25rem", 
                color:"black", 
                backgroundColor:"green", 
                padding: "1.25rem", 
                borderRadius:"1.25rem",
                textAlign: "right"
                }}>
        <a>{data.display_name}</a>
        </p>
        {state ?
        <div style={{position: "absolute", right: '0', top: "1.5rem", zIndex:"2", padding:"0.25rem", backgroundColor:"gray", borderRadius:"1.25rem" }}>
            <a href={'/'} style={{display: "block", padding:'0.25rem'}}>Home</a>
            <a href={`/user-playlists`} style={{display: "block", padding:'0.25rem'}}>Your Profile</a>
            <a href={`/user-playlists`} style={{display: "block", padding:'0.25rem'}}>Settings</a>
        </div>
: <></>}
        </div>: 
        <p><a href="\">Sign In</a></p>
        
        }
        </>
    )
}

