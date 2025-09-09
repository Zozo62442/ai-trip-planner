"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { SignInButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const menuOptions = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact us', path: '/contact' },
]

function Header() {

  const { user } = useUser();

  return (
    <div className='flex justify-between items-center p-4'>
        {/* Logo */}
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt={'logo'} width={30} height={30} />
            <h2 className='font-bold text-2xl'>AI Trip Planner</h2>
        </div>
        
        {/* Navigation */}
        <div className='flex gap-8 items-center'>
            {menuOptions.map((menu, index) => (
                <Link key={index} href={menu.path}>
                    <h2 className='text-lg hover:scale-105 text-foreground hover:text-primary transition'>{menu.name}</h2>
                </Link>
            ))}
        </div>

        {/* Get Started Button */}
        { !user? <SignInButton mode='modal'>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition">
          Get Started
          </button> 
        </SignInButton> :
          <Link href={'create-trip'}> 
            <Button> Create New Trip </Button> 
          </Link>
        }
    </div>
  )
}

export default Header
