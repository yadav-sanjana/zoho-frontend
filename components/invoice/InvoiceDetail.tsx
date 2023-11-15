import { CldImage } from 'next-cloudinary'
import React, { useEffect, useRef, useState } from 'react'
import ItemTable from './InvoiceItems'
import axios from 'axios';
import { AiFillPrinter, AiOutlineCloudUpload } from 'react-icons/ai';
import { CiMail } from 'react-icons/ci';
import { useReactToPrint } from 'react-to-print';

export interface UserType {
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
    as_role?: null;
}
export interface AsCompanyDetail {
    id: number;
    company_logo: string;
    company_name: string;
    company_address: string;
    company_city: string;
    company_country: string;
    company_zip: number;
}


export interface InvoiceType {
    id: number;
    customer: number;
    invoice_no: string;
    order_no?: null;
    invoice_date: string;
    terms: number;
    due_date: string;
    sales_person: number;
    subject: string;
    discount: number;
    tax: string;
    amount: number;
    balance?: null;
    customer_notes: string;
    ATC: string;
    file: string;
    status: string;
    created_by: number;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
    as_customer: AsCustomer;
    as_items?: (AsItemsEntity)[] | null;
    as_sales_person: AsSalesPerson;
    as_terms: AsTerms;
}
export interface AsCustomer {
    id: number;
    customerType: string;
    contactPerson: string;
    company: string;
    firstname: string;
    lastname: string;
    customer_email: string;
    skype_name: string;
    designation: string;
    work_phone: string;
    mobile_phone: string;
    razorpay_id?: null;
    stripe_id?: null;
    website: string;
    company_detail: number;
    created_by?: null;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
    as_company: AsCompany;
}
export interface AsCompany {
    id: number;
    company_name: string;
    company_address: string;
    company_city: string;
    company_country: string;
    company_zip: number;
    company_logo?: null;
    created_by?: null;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
}
export interface AsItemsEntity {
    id: number;
    cart_id: number;
    invoice_id: number;
    item: string;
    quantity: number;
    rate: number;
    discount?: null;
    tax: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    as_cart: AsCart;
}
export interface AsCart {
    id: number;
    customer_id: number;
    discount: number;
    tax: number;
    total_amount: number;
    payableAmount: number;
    createdAt: string;
    updatedAt: string;
}
export interface AsSalesPerson {
    id: number;
    email: string;
    name: string;
}
export interface AsTerms {
    id: number;
    term: string;
    days: number;
}


const InvoiceView = ({ invoice_id, setShowDetails }) => {
    const invoiceRef: any = useRef()
    const [showInvoiceDetails, setShowInvoiceDetails] = useState(setShowDetails)

    const [data, setData] = useState<InvoiceType[]>([]);
    useEffect(() => {
        const fetchData = async (invoice_id) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/invoice/${invoice_id}`);
                setShowInvoiceDetails(setShowDetails)
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(invoice_id);
    }, [invoice_id]);

    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                throw "Please Login"
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user-info`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                setUser(response.data);

                console.log(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCompanyDetails()
    })


    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    })

    const handleClose = () => {
        setShowInvoiceDetails(false)
    }
    return (
        <>
            {showInvoiceDetails && (
                <div
                    className="flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full"
                >
                    <div className='items-center w-full'>
                        <div className="relative m-1 w-auto my-6 mx-auto md:max-w-3xl">
                            <div className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto'>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex gap-4">
                                        <button onClick={handlePrint} className='flex items-center space-x-2 px-3 py-2 rounded-sm border border-slate-600'>
                                            <AiFillPrinter />
                                            <span>Print/Download</span>
                                        </button>
                                        <button onClick={handleClose} className='flex items-center space-x-2 px-3 py-2 rounded-sm border border-slate-600'>

                                            <span>Close</span>
                                        </button>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className='flex items-center text-blue-600 font-semibold space-x-2 px-3 py-2 rounded-sm border border-blue-600'>
                                            <CiMail />
                                            <span>Send</span>
                                        </button>
                                    </div>
                                </div>
                                <div ref={invoiceRef}>
                                    <form className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center justify-center">
                                                {user?.as_company_detail?.company_logo && (
                                                    <CldImage
                                                        width="110"
                                                        height="110"
                                                        src={user?.as_company_detail?.company_logo}
                                                        alt="invoice logo"
                                                    />
                                                )}
                                            </div>

                                            <h2 className='text-3xl  text-blue-600  uppercase font-semibold'>Invoice</h2>
                                        </div >

                                        {/* Company details */}
                                        < div className="flex flex-col w-1/2 mt-6 p-4" >
                                            <h2 className='font-bold mb-2'>From : </h2>
                                            <div className="flex">
                                                <p className='text-base'>{user?.as_company_detail?.company_name}</p>
                                            </div>

                                            <div className="flex">
                                                <p className='font-semibold text-slate-500'>Company : </p>
                                                <p className='text-base'>{user?.as_company_detail?.company_name}</p>
                                            </div>
                                            <div className="flex">
                                                <p className='font-semibold text-slate-500'>Address : </p>

                                                <p className='text-base'>{user?.as_company_detail?.company_address}</p>
                                            </div>
                                            <div className="flex">
                                                <p className='font-semibold text-slate-500'>City : </p>
                                                <p className='text-base'>{user?.as_company_detail?.company_city}</p>
                                            </div>
                                            <div className="flex">
                                                <p className='font-semibold text-slate-500'>Country : </p>

                                                <p className='text-base'>{user?.as_company_detail?.company_country}</p>
                                            </div>
                                        </div >

                                        {/* bill to   */}
                                        < div className="flex justify-between gap-4 mb-10 p-4" >
                                            <div className="flex flex-col w-1/2 mt-6">
                                                <h2 className='mb-2 font-bold'>Bill To:</h2>
                                                <div className="flex">
                                                    <p className='text-base'>{data[0]?.as_customer?.contactPerson}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className='text-base'>{data[0]?.as_customer?.as_company?.company_address}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className='text-base'>{data[0]?.as_customer?.as_company?.company_city}</p>
                                                </div>
                                                <div className="flex">
                                                    <p className='text-base'>{data[0]?.as_customer?.as_company?.company_country}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col w-1/2 mt-6">
                                                <div className="flex gap-2">
                                                    <p className='font-semibold text-slate-500'>Invoice Number : </p>
                                                    <p className='text-base'>{data[0]?.invoice_no}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <p className='font-semibold text-slate-500'>Invoice Date : </p>
                                                    <p className='text-base'>{data[0]?.invoice_date}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <p className='font-semibold text-slate-500'>Due Date :</p>
                                                    <p className='text-base'>{data[0]?.due_date}</p>
                                                </div>

                                            </div>
                                        </div >
                                        {/* table */}
                                        < ItemTable tableData={data[0]?.as_items} />
                                        <div className="flex flex-col w-1/2 mt-6">
                                            <div className="flex gap-2">
                                                <p className='font-semibold text-slate-500'>Total Amount : </p>
                                                <p className='text-base'>{data[0]?.amount}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className='font-semibold text-slate-500'>Discount : </p>
                                                <p className='text-base'>{data[0]?.discount}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className='font-semibold text-slate-500'>Tax:</p>
                                                <p className='text-base'>{data[0]?.tax}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className='font-semibold text-slate-500'>Amount Payable :</p>
                                                <p className='text-base'>{data[0]?.amount}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className='font-semibold text-slate-500'>Balance :</p>
                                                <p className='text-base'>{data[0]?.balance}</p>
                                            </div>

                                        </div>

                                    </form >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>

    )
}

export default InvoiceView
