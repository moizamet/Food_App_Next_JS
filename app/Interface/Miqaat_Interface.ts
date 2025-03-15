import { Venue_Interface } from "./Venue_Interface"
export interface Miqaat_interface {
    venue:Venue_Interface
    id:string,
    title:string,
    information:string,
    date:string,
    cutoff_date:string
}

export interface Miqaat_Registration{
    miqaat : string,
    sabeel_id : string,
    user_count : string,
    date : string
}

// export interface Miqaat_Venue_Inteface {
//     venue:Venue_Interface
//     id:string,
//     title:string,
//     information:string,
//     date:string,
//     cutoff_date:string
  
// }