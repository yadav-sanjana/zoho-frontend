import axios from 'axios';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react'


const ItemForm = () => {

    const [showModal, setShowModal] = useState(false)

    const [formData, setFormData] = useState({
        item: "",
        quantity: 1,
        rate: 0,
        amount: 0
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/add-item/${5}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
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
        <>
            <button
                className="bg-blue-500 flex text-white px-4 py-2 active:bg-blue-600 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <Plus className="h-6 w-5 mr-3" />Add Item
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full"
                    >
                        <div className="relative pt-20 w-auto my-6 mx-auto md:max-w-3xl">
                            {/*content*/}
                            <div className="border-5 p-5 mt-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white w-98">
                                        Add Item
                                    </h3>
                                    <button
                                        onClick={() => setShowModal(false)}
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
                                                    <label className="block text-gray-600 text-sm w-80">Item Description</label>
                                                    <input
                                                        type="text"
                                                        name="item"
                                                        value={formData.item}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Rate</label>
                                                    <input
                                                        type="text"
                                                        name="rate"
                                                        value={formData.rate}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Quantity</label>
                                                    <input
                                                        type="text"
                                                        name="quantity"
                                                        value={formData.quantity}
                                                        onChange={handleChange}
                                                        className="w-full p-1 mx-4 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Amount</label>
                                                    <input
                                                        type="text"
                                                        name="amount"
                                                        value={formData.amount}
                                                        onChange={handleChange}
                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                {/* Modal footer */}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
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
            ) : null}
        </>
    )
}

export default ItemForm