'use client';

import { Montserrat } from 'next/font/google';
import logo from '../public/logo.jpeg'
import Image from 'next/image'
import Link from "next/link";
import { LayoutDashboard, FileStack, Settings, Users2, UserCheck, User } from 'lucide-react'
import { cn } from '@/lib/utils';
import { usePathname} from 'next/navigation'

const monsterrat = Montserrat({
    weight: '600', subsets: ['latin']
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: "Customer",
        icon: Users2,
        href: '/customer',
        color: 'text-blue-500'
    },
    {
        label: "Sale Person",
        icon: UserCheck,
        href: '/sales-person',
        color: 'text-pink-500'
    },
    {
        label: "Invoice",
        icon: FileStack,
        href: '/invoice',
        color: 'text-orange-500'
    },
    {
        label: "User",
        icon: User,
        href: '/user',
        color: 'text-blue-500'
    },
    {
        label: "Settings",
        icon: Settings,
        href: '/settings',
        color: 'text-gray-500'
    }
]

const Sidebar = () => {
    const pathName = usePathname()
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white align-item-center">
            <div className="px-3 py-2 flex-1">
                <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
                    <div className='relative w-24 h-16 mr-4'>
                        <Image
                            fill
                            src={logo}
                            alt='logo' />
                    </div>
                </Link>

                <div className='space-y-1'>
                    {routes.map((route) => (
                        <Link href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
                            pathName === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className='flex items-center flex-1'>
                                <route.icon className={cn('h-6 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Sidebar