import { CldImage } from 'next-cloudinary'
import React, { useState } from 'react'
import PreviewTable from './PreviewTable'

const FormPreview = ({ data }) => {
    const companyLogo = ""

    const {
        companyName,
        invoiceAuthor,
        companyAddress,
        companyCity,
        companyCountry,
        
        clientName,
        clientAddress,
        clientCity,
        clientCountry,
        invoice_num,
        invoiceDate,
        invoiceDueDate } = data

    const [tableData, setTableData] = useState()
    return (
        <form className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">

            {/* invoice image & label */}
            <div className="flex justify-between items-center">
                {/* image */}
                <div className="flex items-center justify-center">
                    {companyLogo && (
                        <CldImage
                            width="110"
                            height="110"
                            src={companyLogo}
                            alt="invoice logo"
                        />
                    )}
                </div>

                <h2 className='text-4xl uppercase font-semibold'>Invoice Preview</h2>
            </div >

            {/* Company details */}
            < div className="flex flex-col w-1/2 mt-6" >
                <div className="flex">
                    <p className='font-bold text-base'> Company Name:</p>
                    <p className='text-base'>comapny</p>
                </div>

                <div className="flex">
                    <p className='font-bold text-base'>Invoice author : </p>
                    <p className='text-base'>comapny</p>
                </div>
                <div className="flex">
                    <p className='font-bold text-base'>Company Address : </p>
                    <p className='text-base'>comapny</p>
                </div>
                <div className="flex">
                    <p className='font-bold text-base'> Company City:</p>
                    <p className='text-base'>comapny</p>
                </div>
                <div className="flex">
                    <p className='font-bold text-base'> Company Country:</p>
                    <p className='text-base'>comapny</p>
                </div>
            </div >

            {/* bill to   */}
            < div className="flex justify-between gap-4 mb-8" >
                <div className="flex flex-col w-1/2 mt-6">
                    <h2 className='mb-2'>Bill To:</h2>
                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='Client Name' name='clientName' value={clientName} />
                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder="Client's Address" name='clientAddress' value={clientAddress} />
                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='City, State Zip' name='clientCity' value={clientCity} />
                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='Country' name='clientCountry' value={clientCountry} />
                </div>

                <div className="flex flex-col w-1/2 mt-6">
                    <div className="flex gap-2">
                        <p className='font-semibold text-slate-500'>Invoice #</p>
                        <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='INV -001' name='invoice_num' value={invoice_num} />
                    </div>
                    <div className="flex gap-2">
                        <p className='font-semibold text-slate-500'>Invoice Date : </p>
                        <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="date" name='invoiceDate' value={invoiceDate} />
                    </div>
                    <div className="flex gap-2">
                        <p className='font-semibold text-slate-500'>Due Date :</p>
                        <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="date" name='invoiceDueDate' value={invoiceDueDate} />
                    </div>

                </div>
            </div >
            {/* table */}
            < PreviewTable />

            <button className='bg-blue-600 py-3 px-6 text-white' type='submit'>Create</button>
        </form >
    )
}

export default FormPreview
