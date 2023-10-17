import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Edit } from 'lucide-react';

interface CustomerType {
    id: number;
    customerType: string;
    contactPerson: string;
    company: string;
    username: string;
    customer_email: string;
    skype_name: string;
    designation: string;
    work_phone: string;
    mobile_phone: string;
    website: string;
}

const CustomerUpdateForm = ({ customer_id }) => {
    const [customer, setCustomer] = useState<CustomerType>();

    const fetchData = useCallback(async (id) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/${customer_id}`);
            setCustomer(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [customer_id]);

    useEffect(() => {
        fetchData(customer_id);
    }, [customer_id, fetchData]);

    const [formData, setFormData] = useState({
        customerType: 'business' || 'individual',
        contactPerson: '',
        company: '',
        firstname: '',
        lastname: '',
        customer_email: '',
        skype_name: '',
        designation: '',
        work_phone: '',
        mobile_phone: '',
        website: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/${customer_id}`, formData);
            console.log('Data sent successfully!');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Sheet>
            <SheetTrigger><Edit /></SheetTrigger>
            <SheetContent style={{ maxWidth: '800px' }}>

                <SheetTitle>Update Customer Information</SheetTitle>

                {customer && (
                    <div className="flex flex-wrap">
                        <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white shadow-md rounded-md">
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Customer Type</label>
                                <div className="flex items-center mr-20">
                                    <input
                                        id="radio-1"
                                        type="radio"
                                        value="business"
                                        name="default-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="default-radio-1"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Business
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        checked
                                        id="radio-2"
                                        type="radio"
                                        value="individual"
                                        name="default-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="default-radio-2"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Individual
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Contact Person</label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className="w-auto p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-auto p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className='mb-4 flex'>
                                <label className="block text-gray-600 text-sm w-auto">Owner Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="w-auto p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder='First Name'
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="w-auto ml-2 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder='Last Name'
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Email</label>
                                <input
                                    type="text"
                                    name="customer_email"
                                    value={formData.customer_email}
                                    onChange={handleChange}
                                    className="w-auto p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Contact</label>
                                <input
                                    type="text"
                                    name="work_phone"
                                    value={formData.work_phone}
                                    onChange={handleChange}
                                    className="w-50 p-1 mx-4 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder='Work Phone'
                                    required
                                />
                                <input
                                    type="text"
                                    name="mobile_phone"
                                    value={formData.mobile_phone}
                                    onChange={handleChange}
                                    className="w-50 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder='Mobile Phone'
                                    required
                                />

                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Skype Name</label>
                                <input
                                    type="text"
                                    name="skype_name"
                                    value={formData.skype_name}
                                    onChange={handleChange}
                                    className="w-auto p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-auto p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-auto">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-auto p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>

                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
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
                )}


            </SheetContent>
        </Sheet>
    );
}

export default CustomerUpdateForm;
