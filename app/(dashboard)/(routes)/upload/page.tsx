'use client'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import React, { useState } from 'react'

const page = () => {

    const [imageUrl, setImageUrl] = useState("")
    return (
        <div className='flex items-center justify-center h-screen flex-col'>

            <h2 className='mb-12'>Upload new file</h2>
            <CldUploadButton onUpload={(data: any) => {
                console.log(data.info.secure_url);
                setImageUrl(data?.info?.secure_url)

            }} className='bg-purple-600 text-white py-3 px-6 rounded  mb-8' uploadPreset="InvoicePreset" />

            {imageUrl && (
                <CldImage
                    width="960"
                    height="600"
                    src={imageUrl}
                    sizes="100vw"
                    alt="Description of my image"
                />
            )}
        </div>
    )
}

export default page