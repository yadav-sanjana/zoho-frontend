'use client'
import { UserType, CustomerType } from '@/app/types'
import FormPreview from '@/components/invoice/FormPreview'
import FormTable from '@/components/invoice/FormTable'
import axios from 'axios'
import { CldImage, CldUploadButton } from 'next-cloudinary'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillEye, AiFillPrinter, AiOutlineCloudUpload, AiOutlineDownload, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'
import { CiMail } from 'react-icons/ci'
import { useReactToPrint } from 'react-to-print';

const InvoicePage = () => {
    const [selectedTerm, setSelectedTerm] = useState('');
    const [preview, setPreview] = useState(false)
    const [logoUrl, setLogoUrl] = useState("")
    const [loading, setLoading] = useState<boolean>(true)

    const [userInfo, setUserInfo] = useState<UserType>()
    const [combinedData, setCombinedData] = useState({})
    const invoiceRef: any = useRef()

    //setting user info
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user-info`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                setUserInfo(response.data);
                setFormData({
                    ...formData,
                    companyName: response.data.as_company_detail.company_name,
                    invoiceAuthor: response.data.name,
                    companyAddress: response.data.as_company_detail.company_address,
                    companyCity: response.data.as_company_detail.company_city,
                    companyCountry: response.data.as_company_detail.company_country,
                    companylogo: response.data.as_company_detail.company_logo,
                });
                setInvoiceForm({
                    ...invoiceForm,
                    sales_person: response.data.id
                })

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUserData();
    }, []);


    //form Data 
    const [formData, setFormData] = useState({
        companyName: '',
        invoiceAuthor: '',
        companyAddress: '',
        companyCity: '',
        companyCountry: '',
        companylogo: '',
        customer_id: 0,
        clientName: "",
        clientAddress: "",
        clientCity: "",
        clientCountry: "",
        invoice_num: "",
        term: "",
        invoiceDate: "",
        invoiceDueDate: "",
        subject: "",
        customerNotes: "",
        ATC: "",
        discount: "",
        cgst: 0,
        sgst: 0
    })

    //invoice form
    const [invoiceForm, setInvoiceForm] = useState({
        customer: 1,
        invoice_no: '',
        invoice_date: '',
        sales_person: 1,
        subject: '',
        amount: 0,
        customer_notes: '',
        ATC: '',
        terms: 1,
        discount: '',
        tax: '0',
        balance: 0
    })


    //terms
    const [term, setTerm] = useState<any>([]);
    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                const termsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/terms`);
                if (!termsResponse.data) {
                    throw new Error('Network response was not ok');
                }

                setTerm(termsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchTermsData();
    }, []);

    //terms by id
    const [termID, setTermID] = useState(1)
    const [termData, setTermData] = useState<any>([]);
    useEffect(() => {
        fetchTermData(termID);
    }, []);
    const fetchTermData = async (termID) => {
        try {
            const termsData = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/terms/${termID}`);
            if (!termsData.data) {
                throw new Error('Network response was not ok');
            }

            setTermData(termsData.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const [customer, setcustomer] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/customer`);
                if (!customerResponse.data) {
                    throw new Error('Network response was not ok');
                }
                setcustomer(customerResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const [customer_id, setCustomer_id] = useState<number>(1)
    const [customerData, setcustomerData] = useState<CustomerType>()
    const fetchCustomerData = async (customer_id) => {
        try {
            const customerInfo = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/${customer_id}`);
            if (!customerInfo.data) {
                throw new Error('Network response was not ok');
            }
            setcustomerData(customerInfo.data);
            setLoading(false);

            setFormData((prevData) => ({
                ...prevData,
                customer_id: formData.customer_id,
                clientName: customerInfo.data.firstname,
                clientAddress: customerInfo.data.as_company.company_address,
                clientCity: customerInfo.data.as_company.company_city,
                clientCountry: customerInfo.data.as_company.company_country
            }));
            setInvoiceForm({
                ...invoiceForm,
                customer: customerInfo.data.id
            })

            console.log(customerData, "customer data received")

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomerData(customer_id);
    }, []);

    const handleCustomerDropdownChange = (e) => {
        const client_id = e.target.value

        console.log(client_id, "client id fetched")
        setCustomer_id(client_id)
        fetchCustomerData(client_id)
    };

    //show due date as per term selected
    const handleTermDropdownChange = (e) => {
        const termID = e.target.value
        console.log(termID, "term id fetched")
        setTermID(termID)
        fetchTermData(termID)

        const selectedTerm = termData

        const invoiceDate = new Date(formData.invoiceDate);
        if (invoiceDate && selectedTerm) {
            const dueDate = new Date(invoiceDate);
            dueDate.setDate(invoiceDate.getDate() + selectedTerm.days);
            const formattedDueDate = dueDate.toISOString().split('T')[0];
            setFormData({
                ...formData,
                term: termID,
                invoiceDueDate: formattedDueDate
            });

        } else {
            setFormData({
                ...formData,
                term: selectedTerm.term,
                invoiceDueDate: ''
            });
        }
    };

    //calculation
    const handleTaxDropdown = (e) => {
        const selectedValue = e.target.value;
        setSelectedTerm(selectedValue);

        const calculatedDiscount = formData.discount;
        const taxableAmount = total - Number(calculatedDiscount);
        const cgst = taxableAmount * 0.09; // 9% CGST
        const sgst = taxableAmount * 0.09; // 9% SGST
        const finalTotal = taxableAmount + cgst + sgst;

        setFormData({
            ...formData,
            discount: calculatedDiscount
        });
        setInvoiceForm({
            ...invoiceForm,
            amount: finalTotal,
            discount: calculatedDiscount,
            tax: '18%',
            balance: finalTotal
        })
    }

    const [tableData, setTableData] = useState([])

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    //setting table content
    const updateTableData = (newTableData) => {
        setTableData(newTableData)
    }

    const [total, setTotal] = useState(0)
    const totalAmt = (amt) => {
        setTotal(amt)
    }

    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    })

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        setInvoiceForm({
            ...invoiceForm,
            customer: customer_id,
            invoice_no: formData.invoice_num,
            // order_no: "",
            invoice_date: formData.invoiceDate,
            sales_person: userInfo?.id || 1,
            subject: formData.subject,
            customer_notes: formData.customerNotes,
            ATC: formData.ATC,
            terms: termID
        })

        const allData = {
            ...invoiceForm,
            tableData: tableData
        }

        console.log(allData, " data")
        setCombinedData(allData)
        console.log(combinedData, "combined objected");



        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/invoice`, combinedData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log('Data sent successfully!');
        } catch (error) {
            console.error('Error sending data:', error);
        }
        setPreview(!preview)
    }

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
                        <FormPreview data={{ combinedData, formData }} />
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
                                <div className="h-7 flex text-base border-0 p-1 mb-1">
                                    <label className="block text-gray-600 text-sm w-1/3">Client</label>
                                    <select id="customer_id" name="customer_id" className="w-2/3  border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" required onChange={handleCustomerDropdownChange}>
                                        {customer.map((val) => (
                                            <option key={val.id} value={val.id}>
                                                {val.firstname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
                                    <label className='font-semibold text-slate-500' htmlFor="term">Term : </label>
                                    <select id="term" name="term" className="h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400 border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" required onChange={handleTermDropdownChange}>
                                        {term?.map((val) => (
                                            <option key={val.id} value={val.id}>
                                                {val.term}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <label className='font-semibold text-slate-500' htmlFor="due_date">Due Date :</label>
                                    <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="date" name='invoiceDueDate' onChange={handleInputChange} value={formData.invoiceDueDate} disabled />
                                </div>
                            </div>



                        </div >
                        {/* table */}
                        < FormTable updateTableData={updateTableData} totalAmt={totalAmt} />
                        <div className="flex">
                            <div className="flex flex-row w-1/2">
                                <div className='w-full mr-8'>
                                    <div className="flex font-semibold text-slate-500 justify-between">
                                        <p className='text-base p-2'>Subject:</p>
                                        <textarea className='text-xl p-2 placeholder:text-base' placeholder='Write subject...' name='subject' onChange={handleInputChange} value={formData.subject}></textarea>
                                    </div>
                                    <div className="flex font-semibold text-slate-500  justify-between">
                                        <p className='text-base p-2'>Notes:</p>
                                        <textarea className='text-xl p-2 placeholder:text-base' placeholder='Notes...'></textarea>
                                    </div>
                                    <div className="flex font-semibold text-slate-500  justify-between">
                                        <p className='text-base p-2'>Additional:</p>
                                        <textarea className='text-xl p-2' placeholder='...'></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row w-1/2">
                                <table >

                                    <tbody className='flex flex-col'>
                                        <tr className='w-full' >
                                            <td className='w-1/2'>
                                                <label className='font-semibold text-slate-500' htmlFor="discount">Tax : </label>
                                            </td>
                                            <td className='w-1/2'>
                                                <select id="term" name="term" className="h-7 text-base border-0 placeholder:text-slate-400 border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" required onChange={handleTaxDropdown}>
                                                    {term?.map((val) => (
                                                        <option key={val.id} value={val.id}>
                                                            {val.term}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className='w-full'>
                                            <td className='w-1/2'> <label className='text-slate-500' htmlFor="subtotal">Sub-total :</label></td>
                                            <td className='w-1/2'>{total}</td>
                                        </tr>
                                        <tr className='w-full'>
                                            <td className='w-1/2'>
                                                <label className='font-semibold text-slate-500' htmlFor="discount">Discount :</label>
                                            </td>
                                            <td className='w-1/2'><input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="number" name='discount' onChange={handleInputChange} value={formData.discount} /></td>
                                        </tr>
                                        <tr className='w-full'>
                                            <td className='w-1/2'>
                                                <label className='font-semibold text-slate-500' htmlFor="amount">Taxable Amount :</label>
                                            </td>
                                            <td className='w-1/2'><input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="number" name='amount' onChange={handleInputChange} value={total} /></td>
                                        </tr>
                                        <tr className='w-full'>
                                            <td className='w-1/2'>
                                                <label className='font-semibold text-slate-500' htmlFor="cgst">CGST :</label></td>
                                            <td className='w-1/2'>
                                                <input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="number" name='cgst' onChange={handleInputChange} value={formData.cgst} /></td>
                                        </tr>
                                        <tr className='w-full'>
                                            <td className='w-1/2'>
                                                <label className='font-semibold text-slate-500' htmlFor="sgst">SGST : </label></td>
                                            <td className='w-1/2'><input className='h-7 text-base border-0 p-1 mb-1 placeholder:text-slate-400' type="number" name='sgst' onChange={handleInputChange} value={formData.sgst} /></td>
                                        </tr>
                                        <tr className='w-full'>
                                            <td className='w-1/2'>
                                                <label className=' text-3xl' htmlFor="discount">Total :</label></td>
                                            <td className='w-1/2'><input className=' text-xl' type="number" name='total' onChange={handleInputChange} value={total} /> </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <button className='bg-blue-600 py-3 px-6 text-white' type='submit'>Create</button>
                    </form >
                )
            }

        </div >
    )
}

export default InvoicePage

