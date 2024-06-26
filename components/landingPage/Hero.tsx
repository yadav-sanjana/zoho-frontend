import React from 'react'
import ThemeLink from '../common/ThemeLink'
import invoiceHeaderImage from './../../public/hero/download.png'
import Image from 'next/image'

const Hero = () => {
  return (
    <>
    <div className='mt-16 bg-cyan-600 max-w-screen grid grid-cols-1 md:grid-cols-2 py-8 px-4 md:px-16 md:py-16 text-slate-50 items-center gap-6'>
      <div className="flex flex-col space-y-8 items-center">
        <h2 className='text-3xl md:text-4xl font-bold'>Invoice Generator for Hysus</h2>
        <p className='text-base text-center md:text-xl'>Generate customer invoices, oversee inventory management, download PDFs, and track progress through a user-friendly carousel interface.</p>
        <ThemeLink href='/register' className='bg-rose-400 hover:bg-rose-500 focus:ring-red-300' title='Get Started Now'/>
      </div>
      <div className='flex flex-col space-y-8 items-center'>
        <Image src={invoiceHeaderImage} alt='invoice image' className='w-auto h-full'></Image>
      </div>
    </div>
    
    </>
  )
}

export default Hero
