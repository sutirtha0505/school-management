"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter();
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='font-bold text-3xl text-primary'>Welcome to SchoolBoster Remastered</h1>
      <p className='mt-4 text-lg text-accent-foreground p-4'>SchoolBoster Remastered is a modern, accessible, and user-friendly digital platform designed to help students and teachers connect, share, and learn from each other.</p>
      <Button className='bg-primary' onClick={()=>{
        router.push('/dashboard');
      }}>Go to Dashboard</Button>
    </div>
  )
}

export default HomePage