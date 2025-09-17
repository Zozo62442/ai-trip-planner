import React from 'react'
import { Globe2 } from 'lucide-react'

function FinalUi({viewTrip}:any) {
  return (
    <div className='flex flex-col items-center justify-center mt-6 p-6 bg-white rounded-2xl'>
        <Globe2 className='text-primary text-4xl animate-bounce' />
        <h2 className='mt-3 text-lg font-semibold text-primary'>
            Planning your dream trip ...
        </h2>
        <p className='text-gray-500 text-center text-sm mt-1'>
            This may take a few moments. Sit back and relax while we craft the perfect itinerary for you.
        </p>
        <button disabled
            onClick={viewTrip}
            className='mt-2 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-all'>
                View Trip
        </button>
        {/* <div className='w-48 h2 bg-gray-200 rounded-full mt-4 overflow-hidden'>
            <div className='h-2 bg-primary animate-pulse w-3/4'></div>
        </div> */}

    </div>
  )
}

export default FinalUi