"use client"
import React, { useEffect } from 'react';
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const TRIP_DATA = {
        "destination": "Paris",
        "duration": "3 days",
        "origin": "Amsterdam",
        "budget": "Moderate",
        "group_size": "1",
        "hotels": [
            {
                "hotel_name": "Novotel Paris Centre Tour Eiffel",
                "hotel_address": "61 Quai de Grenelle, 75015 Paris, France",
                "price_per_night": "€140-160",
                "hotel_image_url": "https://example.com/images/novotel-paris-eiffel.jpg",
                "geo_coordinates": {
                    "latitude": 48.8425,
                    "longitude": 2.2889
                },
                "rating": 4.2,
                "description": "A modern 4-star hotel near the Eiffel Tower, offering comfortable rooms with views of the Seine River. Ideal for solo travelers with easy access to public transport and nearby dining options."
            },
            {
                "hotel_name": "Ibis Styles Paris Saint Denis",
                "hotel_address": "9 Rue de la Caborne, 93200 Tremblay-en-France, France",
                "price_per_night": "€100-120",
                "hotel_image_url": "https://example.com/images/ibis-styles-paris.jpg",
                "geo_coordinates": {
                    "latitude": 48.9681,
                    "longitude": 2.3611
                },
                "rating": 4,
                "description": "Budget-friendly 3-star hotel with stylish rooms and breakfast included. Convenient location near the airport and metro, perfect for a moderate stay in Paris."
            },
            {
                "hotel_name": "Mercure Paris Centre Tour Eiffel",
                "hotel_address": "20 Rue Jean Rey, 75015 Paris, France",
                "price_per_night": "€150-170",
                "hotel_image_url": "https://example.com/images/mercure-paris-eiffel.jpg",
                "geo_coordinates": {
                    "latitude": 48.8556,
                    "longitude": 2.2905
                },
                "rating": 4.3,
                "description": "Elegant 4-star hotel in the heart of Paris, close to major attractions. Features cozy rooms and a rooftop terrace, suitable for solo explorers on a moderate budget."
            }
        ],
        "itinerary": [
            {
                "day": 1,
                "day_plan": "Arrival in Paris via high-speed train from Amsterdam (approx. 3.5 hours, €50-100 one-way). Check into hotel, explore central Paris landmarks, and enjoy an evening Seine River cruise.",
                "best_time_to_visit_day": "Morning arrival to evening",
                "activities": [
                    {
                        "place_name": "Eiffel Tower",
                        "place_details": "Iconic iron lattice tower offering panoramic views of Paris. Climb or take the elevator to the top for stunning cityscapes.",
                        "place_image_url": "https://example.com/images/eiffel-tower.jpg",
                        "geo_coordinates": {
                            "latitude": 48.8584,
                            "longitude": 2.2945
                        },
                        "place_address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
                        "ticket_pricing": "€11.30 (stairs) - €28.30 (summit elevator)",
                        "time_travel_each_location": "2-3 hours",
                        "best_time_to_visit": "Late afternoon to sunset for fewer crowds and beautiful lighting"
                    },
                    {
                        "place_name": "Seine River Cruise",
                        "place_details": "Relaxing boat tour passing landmarks like Notre-Dame and Louvre. Includes audio guide for historical insights.",
                        "place_image_url": "https://example.com/images/seine-cruise.jpg",
                        "geo_coordinates": {
                            "latitude": 48.853,
                            "longitude": 2.35
                        },
                        "place_address": "Port de la Bourdonnais, 75007 Paris, France",
                        "ticket_pricing": "€15-20",
                        "time_travel_each_location": "1-1.5 hours",
                        "best_time_to_visit": "Evening (7-9 PM) for illuminated sights"
                    }
                ]
            },
            {
                "day": 2,
                "day_plan": "Focus on art and history with visits to the Louvre and Notre-Dame. Afternoon stroll through the Latin Quarter for cafes and local culture.",
                "best_time_to_visit_day": "Morning to late afternoon",
                "activities": [
                    {
                        "place_name": "Louvre Museum",
                        "place_details": "World's largest art museum housing masterpieces like the Mona Lisa and Venus de Milo. Explore Egyptian antiquities and French paintings.",
                        "place_image_url": "https://example.com/images/louvre-museum.jpg",
                        "geo_coordinates": {
                            "latitude": 48.8606,
                            "longitude": 2.3376
                        },
                        "place_address": "Rue de Rivoli, 75001 Paris, France",
                        "ticket_pricing": "€17 (adults), free under 18",
                        "time_travel_each_location": "3-4 hours",
                        "best_time_to_visit": "Early morning (9 AM opening) to avoid peak crowds"
                    },
                    {
                        "place_name": "Notre-Dame Cathedral",
                        "place_details": "Gothic masterpiece under restoration; view the exterior, rose windows, and surrounding Île de la Cité. Climb towers if reopened.",
                        "place_image_url": "https://example.com/images/notre-dame.jpg",
                        "geo_coordinates": {
                            "latitude": 48.853,
                            "longitude": 2.3499
                        },
                        "place_address": "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France",
                        "ticket_pricing": "Free exterior; €10 for towers (if available)",
                        "time_travel_each_location": "1-2 hours",
                        "best_time_to_visit": "Mid-morning (10 AM - 12 PM) for good light"
                    },
                    {
                        "place_name": "Latin Quarter",
                        "place_details": "Vibrant neighborhood with historic streets, bookstores, and bistros. Perfect for lunch and people-watching.",
                        "place_image_url": "https://example.com/images/latin-quarter.jpg",
                        "geo_coordinates": {
                            "latitude": 48.8468,
                            "longitude": 2.3453
                        },
                        "place_address": "Rue de la Huchette, 75005 Paris, France",
                        "ticket_pricing": "Free",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Afternoon (1-4 PM) for lively atmosphere"
                    }
                ]
            },
            {
                "day": 3,
                "day_plan": "Discover Montmartre's artistic side and Champs-Élysées. Depart in the evening back to Amsterdam.",
                "best_time_to_visit_day": "Morning to early evening",
                "activities": [
                    {
                        "place_name": "Sacré-Cœur Basilica",
                        "place_details": "Domed basilica atop Montmartre hill with views over Paris. Explore the artists' square and funicular ride up.",
                        "place_image_url": "https://example.com/images/sacre-coeur.jpg",
                        "geo_coordinates": {
                            "latitude": 48.8867,
                            "longitude": 2.3431
                        },
                        "place_address": "35 Rue du Chevalier de la Barre, 75018 Paris, France",
                        "ticket_pricing": "Free entry; €2 for dome",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Morning (9-11 AM) for clearer views and fewer tourists"
                    },
                    {
                        "place_name": "Champs-Élysées and Arc de Triomphe",
                        "place_details": "Famous avenue leading to the triumphal arch. Shop, dine, and climb the arch for city vistas.",
                        "place_image_url": "https://example.com/images/arc-de-triomphe.jpg",
                        "geo_coordinates": {
                            "latitude": 48.8738,
                            "longitude": 2.295
                        },
                        "place_address": "Place Charles de Gaulle, 75008 Paris, France",
                        "ticket_pricing": "€13 for arch summit",
                        "time_travel_each_location": "2-3 hours",
                        "best_time_to_visit": "Afternoon (2-5 PM) to see the avenue in full swing"
                    }
                ]
            }
        ]
    }

function Itinerary() {
    const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
    const [ tripData, setTripData] = useState<TripInfo | null>(null);

    useEffect(() => {
        tripDetailInfo&& setTripData(tripDetailInfo);
    }, [tripDetailInfo]);

  const data = tripData ? [
    {
      title: "Recommended Hotels",
      content: (
        <div>
            {tripData?.hotels.map((hotel, index) => (
                <HotelCardItem key={index} hotel={hotel}/>
            ))}
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData) => ({
        title: `Day ${dayData.day}`,
        content: (
            <div>
                <p> Best Time: {dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {dayData?.activities.map((activity, index) => (
                    <PlaceCardItem key={index} activity={activity}/>
                ))}
            </div>
        </div>
        ),
    }))
  ]: [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData ? <Timeline data={data} tripData={tripData} />
      : 
        <div>
            <h2 className='flex gap-2 items-center absolute bottom-20 text-3xl text-white left-15' > <ArrowLeft /> Getting to know you to build your perfect trip here ... </h2>

            <Image src={'/travel.png'} alt="Travel" width={800} height={800} className='w-full h-full object-cover rounded-3xl' />
        </div>
}
    </div>
  );
}

export default Itinerary