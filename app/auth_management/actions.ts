"use server";

import { cookies } from "next/headers";

export async function handleLogin(userid:string,accessToken:string,refreshToken:string){

    (await cookies()).set("session_userid",userid,{
        httpOnly:true,
        secure:false,
        maxAge:60*60,
        path:'/'
    });

    (await cookies()).set("session_accessToken",accessToken,{
        httpOnly:true,
        secure:false,
        maxAge:60*60,
        path:'/'
    });

    (await cookies()).set("session_refreshToken",refreshToken,{
        httpOnly:true,
        secure:false,
        maxAge:60*60,
        path:'/'
    });
}

export async function handleLogout(){
    console.log("Server removing cookies");
    (await cookies()).set("session_userid","");
    (await cookies()).set("session_accessToken","");
    (await cookies()).set("session_refreshToken","");
}

export async function getUserId(){
    const session_value=(await cookies()).get("session_userid")?.value
    return session_value?session_value:null
}

export async function getToken(){
    const session_value=(await cookies()).get("session_accessToken")?.value
    const value=session_value?session_value:null   
    return value
}