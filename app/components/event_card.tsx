'use client';

import React, { useState } from 'react';
import { Miqaat_interface } from '../Interface/Miqaat_Interface';
import Miqaat_Register_Modal from './miqaat_register_modal';
import Miqaat_Common_Card from './miqaat_common_card';

interface EventCardInterface{
    miqaat:Miqaat_interface
}

const EventCard:React.FC<EventCardInterface> =({miqaat})=> {


  // miqaat.date=new Date(miqaat.date).toLocaleString()
  // miqaat.cutoff_date=new Date(miqaat.cutoff_date).toLocaleString()

  return (
    <div className="w-f[90%] mx-10 my-10 bg-gradient-to-r from-gray-100 to-gray-200 p-6 shadow-xl rounded-lg border border-gray-300">
     <Miqaat_Common_Card miqaat={miqaat}>

     </Miqaat_Common_Card>
      
      {/* Action Buttons */}

      <Miqaat_Register_Modal miqaat_id={miqaat.id}></Miqaat_Register_Modal>
    </div>
  );
}

export default EventCard
