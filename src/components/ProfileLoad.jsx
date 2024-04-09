import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'
import { access_token } from "../store_slices/idSlice";
import { useEffect } from "react";
import { useFindUserQuery, useFindUserDetailsQuery } from "../loaders/loaders";

export default function ProfileUI(){
    const { data, error, isLoading } = useFindUserQuery('4aawyAB9vmqN3uQ7FjRGTy')
 
   
    return(
        <>
        <p>Why?</p>
        
        <ProfileShow/>
        </>
    )
}

export function ProfileShow(){
    const { data, error, isLoading } = useFindUserDetailsQuery("artists");

    return(
        <>
        <p>Rahh!</p>
        {data? <p>
            {data.display_name}
        </p>: <p>Null</p>}
        </>
    )
}