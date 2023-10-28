import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import ItemTable from './ItemTable';
import ItemForm from './ItemForm';
import CartForm from './CartForm';
import UpdateItemForm from './UpdateItemForm';

interface TermType {
    id: number;
    term: string;
    days: number;
    created_by: number;
    createdAt: string;
    updatedAt: string;
}

interface SalesPersonType {
    id: number;
    name: string;
    email: string;
    created_by: number;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
}
interface CustomerType {
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
    website: string;
    created_by?: null;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
}
interface ItemType {
    id: number;
    customer_id: number;
    discount: number;
    tax: number;
    total_amount: number;
    payableAmount: number;
    cart_details?: {
        id: number;
        cart_id: number;
        item: string;
        quantity: number;
        rate: number;
        amount: number;
        createdAt: string;
        updatedAt: string;
    }[]

}

interface InvoiceFormProps {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}


const InvoiceForm: React.FC<InvoiceFormProps> = ({ showForm, setShowForm }) => {

    const [customer_id, setCustomer_id] = useState<number>(0);

    const [formData, setFormData] = useState({
        customer: '' || 5,
        invoice_no: '',
        order_no: '',
        invoice_date: '',
        terms: null,
        sales_person: null,
        subject: '',
        customer_notes: '',
        ATC: '',
        payableAmount: 0,
        file: 'default',
        status: 'active',
        created_by: '',
        updated_by: '',
        createdAt: ''
    });

    //sales persons
    const [value, setValue] = useState<SalesPersonType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const sales_personResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sales-person`);
                if (!sales_personResponse.data) {
                    throw new Error('Network response was not ok');
                }

                setValue(sales_personResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //terms
    const [term, setTerm] = useState<TermType[]>([]);
    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, []);

    //customer
    const [customer, setcustomer] = useState<CustomerType[]>([]);
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

    //cart
    const [itemData, setItemData] = useState<[ItemType] | null | undefined>();

    const fetchItemData = useCallback(async () => {
        try {
            const itemResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/item/${customer_id}`);
            if (!itemResponse.data) {
                throw new Error('Network response was not ok');
            }
            console.log(itemResponse.data, customer_id, "asfvghv,h");

            setItemData(itemResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }, [customer_id])

    useEffect(() => {

        fetchItemData();
    }, [fetchItemData]);

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setCustomer_id(formData.customer)
        console.log(customer_id, "customer id clicked");
        fetchItemData()
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/invoice`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log('Data sent successfully!');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const changeState = () => {
        setShowForm(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            {showForm &&
                <>
                    <div className="flex z-50 inset-0 items-center p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white w-full">
                            Invoice
                        </h3>
                        <button
                            onClick={changeState}
                            type="submit"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >

                            <X />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/*body*/}

                    {/* <div className="relative bg-white rounded-lg shadow dark:bg-gray-700"> */}
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white shadow-md rounded-md">
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">Customer</label>
                                <select id="customer" name="customer" className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" required onChange={handleDropdownChange}>
                                    {customer.map((val) => (
                                        <option key={val.id} value={val.id}>
                                            {val.firstname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">Invoice no.</label>
                                <input
                                    type="text"
                                    name="invoice_no"
                                    value={formData.invoice_no}
                                    onChange={handleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">Order no.</label>
                                <input
                                    type="text"
                                    name="order_no"
                                    value={formData.order_no}
                                    onChange={handleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className='mb-4 flex'>
                                <label className="block text-gray-600 text-sm w-1/3">Invoice Date</label>
                                <input
                                    type="date"
                                    name="invoice_date"
                                    value={formData.invoice_date}
                                    onChange={handleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className='mb-4 flex'>
                                <div className='w-full flex'>
                                    <label className="block text-gray-600 text-sm w-1/3">Terms</label>
                                    <select id="sales_person" name="terms" className="w-1/2 mx-0 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300" required onChange={handleDropdownChange}>
                                        {term.map((val) => (
                                            <option key={val.id} value={val.id}>
                                                {val.term}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div className='w-full flex'>
                                    <label className="block text-gray-600 ml-10 text-sm w-1/2">due_date</label>
                                    <input
                                        type="text"
                                        name="due_date"
                                        onChange={handleChange}
                                        className="p-1 border border-neutral-400 w-1/2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                </div> */}
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">sales_person</label>
                                <select id="sales_person" className="p-1 border border-neutral-400 w-2/3 rounded-md focus:outline-none focus:ring focus:border-blue-300" name="sales_person" required onChange={handleDropdownChange}>
                                    {value.map((val) => (
                                        <option key={val.id} value={val.id}>
                                            {val.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">subject</label>
                                <textarea
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>

                            <div className='mb-4'> <ItemTable cart={itemData} />
                                <ItemForm customer_id={customer_id} /></div>
                            <div>
                                {/* <UpdateItemForm item_id={item_id}/> */}
                            </div>
                            <div className="mb-4 flex">
                                <div className='w-1/2 pr-2'>
                                    <div className="mb-4 flex">
                                        <label className="block text-gray-600 text-sm w-1/3">customer_notes</label>
                                        <textarea
                                            name="customer_notes"
                                            value={formData.customer_notes}
                                            onChange={handleChange}
                                            className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>
                                    <div className="mb-4 flex">
                                        <label className="block text-gray-600 text-sm w-1/3">ATC</label>
                                        <textarea
                                            name="ATC"
                                            value={formData.ATC}
                                            onChange={handleChange}
                                            className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='w-1/2 pr-1'>

                                    <CartForm cart={itemData} />
                                </div>
                            </div>


                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    onClick={changeState}
                                >
                                    Close
                                </button>
                                <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"

                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </>
    );
};

export default InvoiceForm;
