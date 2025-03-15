import { getToken } from "../auth_management/actions"

const DJANGO_APP_BASE_URL=process.env.NEXT_PUBLIC_DJANGO_APP_BASE_URL ?process.env.NEXT_PUBLIC_DJANGO_APP_BASE_URL :"http://localhost"
const DJANGO_APP_BASE_PORT=process.env.NEXT_PUBLIC_DJANGO_APP_BASE_PORT ? process.env.NEXT_PUBLIC_DJANGO_APP_BASE_PORT : "8000"
// const BASE_URL="http://localhost:8000/"
// const BASE_URL=`${DJANGO_APP_BASE_URL}:${DJANGO_APP_BASE_PORT}/`
const BASE_URL=process.env.NEXT_PUBLIC_DJANGO_APP_COMPLETE_URL

async function generate_headers(authenticate:boolean){
    let headers={}
    if (authenticate===true){
        
        const token=await getToken()
        headers={
            'Accept':'application/json',
            'Content-Type':'application/json',
            "Authorization":"Bearer "+token
        }

    }else{
        headers={
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
        
        

    }
    return headers
    

}

const apiService={

    get:async function (url:string,authenticate:boolean=true):Promise<any>{
        console.log("SERVICE GET Operation: ",url, "Authentication Required: ",authenticate)
        let headers={}
        if (authenticate){
            headers=await generate_headers(authenticate)
        }
        return new Promise((resolve,reject)=>{
            fetch(BASE_URL+url,{
                method:"GET",
                headers:headers

            }).then((response)=>{
                console.log("Service RESPONSE: ",response);
                resolve(response)
            }).catch((error)=>{
                console.log("Service ERROR",error);
                reject(error)
            })

        })

    },

    post:async function (url:string,body:any,authenticate:boolean=true):Promise<any>{
        console.log("SERVICE POST Operation: ",url, "Authentication Required: ",authenticate)
        let headers={}
        if (authenticate){
            headers=await generate_headers(authenticate)
        }
        return new Promise((resolve,reject)=>{
            fetch(BASE_URL+url,{
                method:"POST",
                body:JSON.stringify(body),
                headers:headers

            }).then((response)=>{
                console.log("Service RESPONSE: ",response);
                resolve(response)
            }).catch((error)=>{
                console.log("Service ERROR",error);
                reject(error)
            })

        })

    },

    put:async function (url:string,body:any,authenticate:boolean=true):Promise<any>{
        console.log("SERVICE PUT Operation: ",url, "Authentication Required: ",authenticate)
        let headers={}
        if (authenticate){
            headers=await generate_headers(authenticate)
        }
        return new Promise((resolve,reject)=>{
            fetch(BASE_URL+url,{
                method:"PUT",
                body:JSON.stringify(body),
                headers:headers

            }).then((response)=>{
                console.log("Service RESPONSE: ",response);
                resolve(response)
            }).catch((error)=>{
                console.log("Service ERROR",error);
                reject(error)
            })

        })

    },

    delete:async function (url:string,body:any,authenticate:boolean=true):Promise<any>{
        console.log("SERVICE DELETE Operation: ",url, "Authentication Required: ",authenticate)
        let headers={}
        if (authenticate){
            headers=await generate_headers(authenticate)
        }
        return new Promise((resolve,reject)=>{
            fetch(BASE_URL+url,{
                method:"DELETE",
                body:JSON.stringify(body),
                headers:headers

            }).then((response)=>{
                console.log("Service RESPONSE: ",response);
                resolve(response)
            }).catch((error)=>{
                console.log("Service ERROR",error);
                reject(error)
            })

        })

    },


}

export default apiService