import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect } from "react";

export default function Profile(){
    let selected = useSelector(access_token);

        const loadProfile= async(value) =>{
            let request = await fetch(`https://api.spotify.com/v1/me`, {
                headers:{
                    Authorization: `Bearer ${value}`
                }
            });
            let response = await request.json();
        }


    return(
        <>
        <h2>Your Profile</h2> 
        <a href={'/'}>Home Page</a>
        <button onClick={()=> {
            console.log(loadProfile(selected))
        }}></button>
        </>
    )
}