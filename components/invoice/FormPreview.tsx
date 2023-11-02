import { CldImage } from 'next-cloudinary'
import React, { useState } from 'react'
import PreviewTable from './PreviewTable'

const FormPreview = ({ data }) => {
    const {
        companyName,
        invoiceAuthor,
        companyAddress,
        companyCity,
        companyCountry,
        companylogo,
        clientName,
        clientAddress,
        clientCity,
        clientCountry,
        invoice_num,
        invoiceDate,
        invoiceDueDate } = data.formData

    const {
        customer,
        invoice_no,
        invoice_date,
        sales_person,
        subject,
        amount,
        customer_notes,
        ATC,
        terms,
        discount,
        tax,
        balance,
        tableData
    } = data.combinedData
    console.log(data?.combinedData?.tableData, "table data")


    return (

        <form className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">

            {/* invoice image & label */}
            <div className="flex justify-between items-center">
                <div className="flex items-center justify-center">
                    {companylogo && (
                        <CldImage
                            width="110"
                            height="110"
                            src={companylogo}
                            alt="invoice logo"
                        />
                    )}
                </div>

                <h2 className='text-3xl uppercase font-semibold'>Invoice Preview</h2>
            </div >

            {/* Company details */}
            < div className="flex flex-col w-1/2 mt-6 p-4" >
                <h2 className='font-semibold mb-2'>From : </h2>
                <div className="flex">
                    <p className='text-base'>{companyName}</p>
                </div>

                <div className="flex">
                    <p className='text-base'>{invoiceAuthor}</p>
                </div>
                <div className="flex">
                    <p className='text-base'>{companyAddress}</p>
                </div>
                <div className="flex">
                    <p className='text-base'>{companyCity}</p>
                </div>
                <div className="flex">
                    <p className='text-base'>{companyCountry}</p>
                </div>
            </div >

            {/* bill to   */}
            < div className="flex justify-between gap-4 mb-10 p-4" >
                <div className="flex flex-col w-1/2 mt-6">
                    <h2 className='mb-2 font-semibold'>Bill To:</h2>
                    <div className="flex">
                        <p className='text-base'>{clientName}</p>
                    </div>
                    <div className="flex">
                        <p className='text-base'>{clientAddress}</p>
                    </div>
                    <div className="flex">
                        <p className='text-base'>{clientCity}</p>
                    </div>
                    <div className="flex">
                        <p className='text-base'>{clientCountry}</p>
                    </div>
                </div>

                <div className="flex flex-col w-1/2 mt-6">
                    <div className="flex gap-2">
                        <p className='font-semibold text-slate-500'>Invoice Number : </p>
                        <p className='text-base'>{invoice_num}</p>
                    </div>
                    <div className="flex gap-2">
                        <p className='font-semibold text-slate-500'>Invoice Date : </p>
                        <p className='text-base'>{invoiceDate}</p>
                    </div>
                    <div className="flex gap-2">
                        <p className='font-semibold text-slate-500'>Due Date :</p>
                        <p className='text-base'>{invoiceDueDate}</p>
                    </div>

                </div>
            </div >
            {/* table */}
            < PreviewTable tableData={tableData} />

        </form >
    )
}

export default FormPreview
