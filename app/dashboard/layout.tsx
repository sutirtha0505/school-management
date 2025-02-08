"use client"
import Navigation from '@/components/Navigation'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-screen flex'>
            <Navigation />
            <main className="flex-1 p-10 ml-20">{children}</main>
        </div>
    )
}

export default DashboardLayout
