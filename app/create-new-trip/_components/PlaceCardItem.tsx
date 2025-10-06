"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Hotel } from './ChatBox';
import { Ticket, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Activity } from './ChatBox';
import axios from 'axios';

type Props = {
  activity: Activity;
}

function PlaceCardItem({activity}: Props) {

  const [photoUrl, setPhotoUrl] = useState<string>();

  useEffect(() => {
    activity && GetGooglePlaceDetail();
  }, [activity]);

  const GetGooglePlaceDetail = async () => {
  const result = await axios.post('/api/google-place-detail', {
    placeName: activity?.place_name+":"+activity?.place_address
  });
  if(result?.data.error) {
    return;
  }
  setPhotoUrl(result?.data);
}

  return (
    <div className="bg-white shadow-md overflow-auto">
      {/* Image Section */}
      <div className='relative h-48 w-full'>
        <Image src={photoUrl ? photoUrl : '/placeholder.jpg'} 
          alt={activity?.place_name} 
          fill
          className='object-cover'/>
      </div>
      {/* Details Section */}
      <div className='p-4 flex flex-col gap-2'>
        {/* Title */}
        <h2 className='font-semibold text-lg'> {activity?.place_name} </h2>
        <p className='text-gray-400 line-clamp-2'> {activity?.place_details} </p>
        <p className='mt-1 text-amber-900'> Address: {activity?.place_address} </p>
        <h2 className='flex gap-2 text-sky-800 line-clamp-1'> <Ticket className="w-4 h-4 shrink-0"/> {activity?.ticket_pricing} </h2>
        <p className='flex text-orange-400 gap-2'> <Clock className="w-4 h-4 shrink-0"/> {activity?.best_time_to_visit} </p>
        <Link href={'https://www.google.com/maps/search/?api=1&query='+activity?.place_name} target='_blank'>
            <Button size={'sm'} variant={'outline'} className='w-full mt-2'>View Details <ExternalLink className="w-4 h-4"/></Button>
        </Link>
      </div>
    </div>
  )
}

export default PlaceCardItem