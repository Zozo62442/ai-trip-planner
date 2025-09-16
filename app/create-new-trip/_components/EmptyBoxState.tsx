import React from 'react'
import { suggestions } from '../../_components/Hero'


function EmptyBoxState({onSelectOption}:any) {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-3xl text-center'> Start Planning your next <strong className='text-primary'>Trip</strong> using AI</h2>
        <p className='text-center text-[#76818e] mt-2'> Discover new destinations, create itineraries, and get personalised recommendations all powered by AI.</p>
    
            <div className='flex flex-col gap-5'>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} 
                        onClick={() => onSelectOption(suggestion.title)}
                        className='flex items-center gap-2 p-2 rounded-xl cursor-pointer border shadow-sm hover:border-primary transition hover:text-primary'>
                            {suggestion.icon}
                            <h2 className="text-sm">{suggestion.title}</h2>
                        </div>
                    ))}
            </div>
    </div>
  )
}

export default EmptyBoxState