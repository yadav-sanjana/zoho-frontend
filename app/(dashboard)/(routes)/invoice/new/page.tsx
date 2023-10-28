'use client'
import FormPreview from '@/components/invoice/FormPreview'
import FormTable from '@/components/invoice/FormTable'
import axios from 'axios'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillEye, AiFillPrinter, AiOutlineCloudUpload, AiOutlineDownload, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'
import { CiMail } from 'react-icons/ci'
import { useReactToPrint } from 'react-to-print';

interface UserType {
    id: number;
    name: string;
    role: number;
    email: string;
    company_id: number;
    created_by: number;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
    as_company_detail: AsCompanyDetail;
    as_role: AsRole;
}
interface AsCompanyDetail {
    id: number;
    company_name: string;
    company_address: string;
    company_city: string;
    company_country: string;
    company_zip: number;
    company_logo: string;
}
interface AsRole {
    id: number;
    role: string;
}


const InvoicePage = () => {

    const [userInfo, setUserInfo] = useState<UserType>()
    const [combinedData, setCombinedData] = useState({})
    const invoiceRef: any = useRef()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user-info`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                setUserInfo(response.data);
                setFormData({
                    companyName: response.data.as_company_detail.company_name,
                    invoiceAuthor: response.data.name,
                    companyAddress: response.data.as_company_detail.company_address,
                    companyCity: response.data.as_company_detail.company_city,
                    companyCountry: response.data.as_company_detail.company_country,
                    companylogo: response.data.as_company_detail.company_logo,
                    clientName: '',
                    clientAddress: '',
                    clientCity: '',
                    clientCountry: '',
                    invoice_num: '',
                    invoiceDate: '',
                    invoiceDueDate: '',
                });

                console.log(response.data, "user data");

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const [preview, setPreview] = useState(false)
    const [logoUrl, setLogoUrl] = useState("")

    const [formData, setFormData] = useState({
        companyName: '',
        invoiceAuthor: '',
        companyAddress: '',
        companyCity: '',
        companyCountry: '',
        companylogo: '',
        clientName: "",
        clientAddress: "",
        clientCity: "",
        clientCountry: "",
        invoice_num: "",
        invoiceDate: "",
        invoiceDueDate: ""

    })
    const [tableData, setTableData] = useState([])

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const updateTableData = (newTableData) => {
        setTableData(newTableData)
    }

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    })

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const allData = {
            ...formData,
            tableData
        }
        console.log(allData, " data")
        setCombinedData(allData)
        console.log(combinedData, "combined objected");

        setPreview(!preview)
    }

    // console.log(tableData);

    return (
        <div className='bg-slate-50 py-8 md:py-8 px-4 md:px-16'>
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    <button onClick={() => setPreview(!preview)} className='px-3 py-2 rounded-sm border border-slate-600'>
                        {preview ? (
                            <div className='flex items-center space-x-2'>
                                <AiOutlineEdit />
                                <span>Edit Form</span>
                            </div>
                        ) : (
                            <div className='flex items-center space-x-2'>
                                <AiFillEye />
                                <span>Preview</span>
                            </div>
                        )}
                    </button>
                    <button onClick={handlePrint} className='flex items-center space-x-2 px-3 py-2 rounded-sm border border-slate-600'>
                        <AiFillPrinter />
                        <span>Print/Download</span>
                    </button>
                </div>
                <div className="flex gap-4">
                    <button className='flex items-center space-x-2 px-3 py-2 rounded-sm border border-slate-600'>
                        <AiOutlineCloudUpload />
                        <span>Save online</span>
                    </button>
                    <button className='flex items-center text-blue-600 font-semibold space-x-2 px-3 py-2 rounded-sm border border-blue-600'>
                        <CiMail />
                        <span>Send</span>
                    </button>
                </div>
            </div>

            {
                preview ? (
                    <div ref={invoiceRef}>
                        <FormPreview data={combinedData} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">

                        {/* invoice image & label */}
                        <div className="flex justify-between items-center">
                            {/* image */}
                            <div className="flex items-center justify-center">
                                {formData.companylogo ? (
                                    <CldImage
                                        width="110"
                                        height="110"
                                        src={formData.companylogo}
                                        alt="invoice logo"
                                    />
                                ) : (

                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-48 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <AiOutlineCloudUpload className='w-6 h-6 text-gray-500 dark:text-gray-400' />
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <CldUploadButton onUpload={(data: any) => {
                                                    setLogoUrl(data?.info?.secure_url)

                                                }} className='' uploadPreset="InvoicePreset" />
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG (240x240px)</p>
                                        </div>
                                        <input type="text" className="hidden" name='companylogo' value={formData.companylogo} />
                                    </label>
                                )
                                }
                            </div>

                            <h2 className='text-3xl uppercase font-semibold'>Invoice Form</h2>
                        </div >

                        {/* Company details */}
                        < div className="flex flex-col w-1/2 mt-6" >
                            <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" name='companyName' onChange={handleInputChange} value={formData.companyName} />
                            <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='Name' name='invoiceAuthor' onChange={handleInputChange} value={formData.invoiceAuthor} />
                            <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder="Company's Address" name='companyAddress' onChange={handleInputChange} value={formData.companyAddress} />
                            <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='City, State Zip' name='companyCity' onChange={handleInputChange} value={formData.companyCity} />
                            <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='Country' name='companyCountry' onChange={handleInputChange} value={formData.companyCountry} />
                        </div >

                        {/* bill to   */}
                        < div className="flex justify-between gap-4" >
                            <div className="flex flex-col w-1/2 mt-6">
                                <h2 className='mb-2'>Bill To:</h2>
                                <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='Client Name' name='clientName' onChange={handleInputChange} value={formData.clientName} />
                                <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder="Client's Address" name='clientAddress' onChange={handleInputChange} value={formData.clientAddress} />
                                <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='City, State Zip' name='clientCity' onChange={handleInputChange} value={formData.clientCity} />
                                <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='Country' name='clientCountry' onChange={handleInputChange} value={formData.clientCountry} />
                            </div>

                            <div className="flex flex-col w-1/2 mt-6">
                                <div className="flex gap-2">
                                    <label className='font-semibold text-slate-500' htmlFor="invoice_no.">Invoice #</label>
                                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="text" placeholder='INV -001' name='invoice_num' onChange={handleInputChange} value={formData.invoice_num} />
                                </div>
                                <div className="flex gap-2">
                                    <label className='font-semibold text-slate-500' htmlFor="invoice_date">Invoice Date : </label>
                                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="date" name='invoiceDate' onChange={handleInputChange} value={formData.invoiceDate} />
                                </div>
                                <div className="flex gap-2">
                                    <label className='font-semibold text-slate-500' htmlFor="due_date">Due Date :</label>
                                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="date" name='invoiceDueDate' onChange={handleInputChange} value={formData.invoiceDueDate} />
                                </div>

                            </div>
                        </div >
                        {/* table */}
                        < FormTable updateTableData={updateTableData} />

                        <button className='bg-blue-600 py-3 px-6 text-white' type='submit'>Create</button>
                    </form >
                )
            }

        </div >
    )
}

export default InvoicePage
function parseJwt(token: string | null) {
    throw new Error('Function not implemented.')
}

