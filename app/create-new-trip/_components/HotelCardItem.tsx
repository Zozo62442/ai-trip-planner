"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Wallet, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Hotel } from './ChatBox';
import axios from 'axios';

type Props = {
  hotel: Hotel;
}

function HotelCardItem({ hotel }: Props) {

    const [photoUrl, setPhotoUrl] = useState<string>();

    useEffect(() => {
      hotel && GetGooglePlaceDetail();
    }, [hotel]);

    const GetGooglePlaceDetail = async () => {
    const result = await axios.post('/api/google-place-detail', {
      placeName: hotel?.hotel_name
    });
    if(result?.data.error) {
      return;
    }
    setPhotoUrl(result?.data);
    }

  return (
    <div className="bg-white shadow-md hover:shadow-lg">
      {/* Image Section */}
      <div className='relative h-48 w-full'>
        <Image 
          src={photoUrl ? photoUrl : '/placeholder.jpg'} 
          alt={hotel?.hotel_name || 'Hotel Image'}
          fill
          className='object-cover'
        />
      </div>
      {/* Details Section */}
      <div className='p-4 flex flex-col gap-2'>
        {/* Title */}
        <h2 className='font-semibold text-lg'> {hotel.hotel_name} </h2>
        <h2 className='text-amber-900'> {hotel.hotel_address} </h2>
        <div className='flex justify-between items-center'>
            <p className='flex gap-2 text-sky-800'> <Wallet className="w-4 h-4"/> {hotel.price_per_night} per night</p>
            <p className='flex gap-2 text-amber-400'> <Star className="w-4 h-4"/> {hotel.rating} </p>
        </div>
        <Link href={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name} target='_blank'>
            <Button variant={'outline'} className='mt-1 w-full'>View Details</Button>
        </Link>
        <p className='line-clamp-2 text-gray-400'> {hotel.description} </p>
      </div>
    </div>
  )
}

export default HotelCardItem