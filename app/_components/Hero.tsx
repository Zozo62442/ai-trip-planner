import React, { useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, Globe2, Lightbulb, Map, Mountain, ArrowDown } from "lucide-react"
import HeroVideoDialog from "@/components/magicui/hero-video-dialog"


const suggestions=[
    {
        title: 'Create New Trip',
        icon: <Globe2 className='w-5 h-5 text-blue-600' />
    },
    {
        title: 'Inspire me where to go',
        icon: <Lightbulb className='w-5 h-5 text-amber-500' />
    },
    {
        title: 'Discover Hidden gems',
        icon: <Map className='w-5 h-5 text-red-500' />
    },
    {
        title: 'Adventure Destinations',
        icon: <Mountain className='w-5 h-5 text-green-600' />
    }
]

function Hero() {
    return (
        <div className='mt-24 w-full flex justify-center'>
            <div className='max-w-3xl w-full text-center space-y-8'>
                {/* Heading + Subtitle */}
                <div className='space-y-4'>
                    <h1 className='text-3xl md:text-5xl font-bold'>
                        Hey, I'm your personal <span className='text-primary'>Trip Planner</span>
                    </h1>
                    <p className='text-lg text-muted-foreground'>
                        Tell me what you’re looking for, and I’ll handle the rest — from flights to hotels, I’ve got you covered.
                    </p>
                </div>

                {/* Input Box */}
                <div className='border rounded-2xl p-4 bg-card shadow-md flex flex-col gap-4'>
                    <Textarea
                        placeholder='Plan a weekend in Rome'
                        className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                    />
                    <Button size={'icon'} className="self-end flex items-center gap-2">
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
                {/* Suggestion list */} 
                <div className='flex gap-5'>
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className='flex items-center gap-2 p-2 rounded-full cursor-pointer border shadow-sm hover:bg-primary transition hover:text-white'>
                            {suggestion.icon}
                            <h2 className="text-sm">{suggestion.title}</h2>
                        </div>
                    ))}
                </div>
                
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='my-7 mt-14 flex gap-2 text-center'>Not sure where to start? <strong>See how it works</strong> <ArrowDown /></h2>

                    {/* Video Selection */}
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc="https://www.example.com/dummy-video"
                        thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
                        thumbnailAlt="Dummy Video Thumbnail"
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero
