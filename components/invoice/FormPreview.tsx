import React, { useState } from 'react'

const FormPreview = ({ data }) => {

    const { companyName,
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
        invoiceDueDat, } = data
    return (
        <div className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
            {/* preview */}
            <h2>Preview</h2>
            <h2>{data.companyAddress}</h2>

        </div>
    )
}

export default FormPreview
