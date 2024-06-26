import { NavBar } from '@/components/NavBar'
import React from 'react'
import Sidebar from '@/components/common/Header/Sidebar'

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className='h-full relative'>
            <div className='hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900'>
                <div>
                    <Sidebar />
                </div>
            </div>
            <main className='md:pl-72'>
                <NavBar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout