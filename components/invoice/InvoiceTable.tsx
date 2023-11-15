import axios from 'axios'
import { Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { InvoiceDetail } from './extra/InvoiceDetail'
import InvoiceView from './InvoiceDetail';


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


const InvoiceTable = () => {
    const [data, setData] = useState<InvoiceType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/invoice`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [invoiceShowDetail, setInvoiceShowDetail] = useState(false)
    const [invoiceId, setInvoiceId] = useState(null)

    const handleDetailClick = (id) => {
        setInvoiceId(id)
        setInvoiceShowDetail(true)

        console.log(invoiceId);

    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Invoice#
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 w-full">
                                Due  Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Balance Due
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.invoice_date}
                                </td>
                                <td className="px-6 py-4">{item.invoice_no}</td>
                                <td className="px-6 py-4">{item.order_no}</td>
                                <td className="px-6 py-4">{item.as_customer.firstname}</td>
                                <td className="px-6 py-4">{item.status}</td>
                                <td className="px-6 py-4">{item.due_date}</td>
                                <td className="px-6 py-4">{item.amount}</td>
                                <td className="px-6 py-4">123</td>
                                <button className="px-6 py-4" onClick={() => handleDetailClick(item.id)}><Eye />

                                </button>
                            </tr>
                        ))}
                    </tbody>
                    {invoiceShowDetail && (
                        <InvoiceView invoice_id={invoiceId} setShowDetails={true}/>
                    )}
                </table>
            </div>
        </>
    )
}

export default InvoiceTable