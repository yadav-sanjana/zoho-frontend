import Link from 'next/link'
import React from 'react'
import ThemeLink from '../ThemeLink'
import Image from 'next/image'

const NavBar = () => {
  return (
    <header className='bg-cyan-600 fixed top-0 right-0 w-full left-0 h-16 flex items-center justify-between px-16 py-7 text-slate-50'>
      <Link className='font-bold text-2xl md:text-4xl ' href={'/'}>
        <Image src={'bl.png'} alt='logo' width={100} height={100}/>
      </Link>

      <nav className='flex items-center gap-3'>
        <Link href={'/#features'}>Features</Link>
        <Link href={'/#price'}>Pricing</Link>
        <Link href={'/#customer'}>Customers</Link>
      </nav>

      <div className='flex items-center gap-4'>
        <Link href={'/login'}>Login</Link>
        <ThemeLink className=' bg-red-400 hover:bg-red-500 focus:ring-red-300 mb-2' title='Register' href='/register' />

      </div>
    </header>
  )
}

export default NavBar
