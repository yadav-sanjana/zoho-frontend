import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';


const CustomerUpdateForm = ({ customer_id, setUpdateDetail }) => {

    const [customer, setCustomer] = useState({
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

    const [updateDetailModal, setUpdateDetailModal] = useState<boolean>(setUpdateDetail)

    useEffect(() => {
        const fetchData = async (customer_id) => {
            try {
                setUpdateDetailModal(setUpdateDetail)
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/${customer_id}`);
                setCustomer(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData(customer_id);
    }, [customer_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedCustomer = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/${customer_id}`, customer);
            console.log(updatedCustomer?.data.message);
        } catch (error) {
            console.error('Error sending data:', error);
        }
        setUpdateDetailModal(false)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (

        <>
            {updateDetailModal && (
                <>
                    <div
                        className="justify-center items-center flex overflow-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full"
                    >
                        <div className="relative pt-20 w-auto my-6 mx-auto md:max-w-3xl">
                            {/*content*/}
                            <div className="border-5 p-5 mt-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white w-98">
                                        Customer Information
                                    </h3>
                                    <button
                                        onClick={() => setUpdateDetailModal(false)}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >

                                        <X />
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div>
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        {/* Modal body */}
                                        <div className="p-6 space-y-6">
                                            <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white shadow-md rounded-md">

                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Customer Type</label>
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
                                                    <label className="block text-gray-600 text-sm w-80">Contact Person</label>
                                                    <input
                                                        type="text"
                                                        name="contactPerson"
                                                        value={customer?.contactPerson}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Company Name</label>
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        value={customer?.company}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className='mb-4 flex'>
                                                    <label className="block text-gray-600 text-sm w-80">Owner Name</label>
                                                    <input
                                                        type="text"
                                                        name="firstname"
                                                        value={customer?.firstname}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        name="lastname"
                                                        value={customer?.lastname}
                                                        onChange={handleChange}
                                                        className="w-96 ml-2 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Email</label>
                                                    <input
                                                        type="text"
                                                        name="customer_email"
                                                        value={customer?.customer_email}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Contact</label>
                                                    <input
                                                        type="text"
                                                        name="work_phone"
                                                        value={customer?.work_phone}
                                                        onChange={handleChange}
                                                        className="w-50 p-1 mx-4 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                    <input
                                                        type="text"
                                                        name="mobile_phone"
                                                        value={customer?.mobile_phone}
                                                        onChange={handleChange}
                                                        className="w-50 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />

                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Skype Name</label>
                                                    <input
                                                        type="text"
                                                        name="skype_name"
                                                        value={customer?.skype_name}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Designation</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        value={customer?.designation}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Website</label>
                                                    <input
                                                        type="text"
                                                        name="website"
                                                        value={customer?.website}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setUpdateDetailModal(false)}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}</>
    )
}

export default CustomerUpdateForm;
