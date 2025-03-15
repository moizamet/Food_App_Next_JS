// "use client";
import Image from "next/image";
import Protected_Component from "./components/protected_component";
import Login from "./components/checkLogin";
import Miqaat_Home from "./components/miqaat_home";



export default function Home() {


  const DJANGO_APP_BASE_URL=process.env.NEXT_PUBLIC_DJANGO_APP_BASE_URL ?process.env.NEXT_PUBLIC_DJANGO_APP_BASE_URL :"http://localhost"
const DJANGO_APP_BASE_PORT=process.env.NEXT_PUBLIC_DJANGO_APP_BASE_PORT ? process.env.NEXT_PUBLIC_DJANGO_APP_BASE_PORT : "8000"
// const BASE_URL="http://localhost:8000/"
const BASE_URL=`${DJANGO_APP_BASE_URL}:${DJANGO_APP_BASE_PORT}/`



  return (
   <div>
    this will be home page
    main_url_connection {BASE_URL}
    <Miqaat_Home/>
    

   </div>
  );
}
