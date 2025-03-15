
import { Miqaat_interface } from '../Interface/Miqaat_Interface';

interface Miqaat_Common_Card_interface {
    miqaat:Miqaat_interface
}

export default function Miqaat_Common_Card(params:Miqaat_Common_Card_interface){
    const {miqaat}=params

    miqaat.date=new Date(miqaat.date).toLocaleString()
    miqaat.cutoff_date=new Date(miqaat.cutoff_date).toLocaleString()

    return (<>
     {/* Heading */}
     <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{miqaat.title}</h2>
        <p className="text-md text-gray-700 mt-2">Additional Information</p>
      </div>
      
      
      {/* Event Information */}
      <div className="mx-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="text-md font-semibold text-gray-800">📍 <span className="font-normal text-gray-600">{miqaat.venue.name}</span></p>
        <p className="text-md font-semibold text-gray-800">📅 <span className="font-normal text-gray-600">{miqaat.date} </span></p>
        <p className="text-md font-semibold text-gray-800">⏳ <span className="font-normal text-gray-600">{miqaat.cutoff_date}</span></p>
      </div>
    </>)
}