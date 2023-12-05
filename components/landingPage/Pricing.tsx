import HelpCard from '@/utils/Card'
import { GiPriceTag } from "react-icons/gi";
import React from 'react'

const Pricing = () => {
  return (
    <div>
      <div className="text-gray-700 bg-slate-200" id='price'>
        <div className="mx-auto flex flex-col pt-10">
          <p className='text-3xl font-semibold text-center justify-center flex'>Pricing</p>
          <div className="flex flex-wrap justify-center">
            <div className="min-w-screen flex-row flex justify-center sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
              <div className="max-w-sm hover:bg-gray-200 p-6 bg-white border border-gray-200 rounded-lg shadow">

                <div className="items-center flex flex-col">
                  <GiPriceTag className="h-8 w-8 text-cyan-400" />
                  <a href="#">
                    <p className="my-2  text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-600">Pay As You Go</p>
                  </a>
                </div>
                <p className="mb-2 font-normal text-gray-500 dark:text-gray-400">{
                  <div><strong>Features</strong>
                    <ul className='list-disc'>
                      <li>Invoices access</li>
                      <li>create users</li>
                      <li>send emails</li>
                      <li>Insights</li>
                    </ul>
                  </div>

                }</p>
              </div >
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
