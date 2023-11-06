import axios from 'axios';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const EditSalesPerson = (sales_id, enableEdit) => {
    const [id, setId] = useState(sales_id.sales_id)

    const [editForm, setEditForm] = useState<boolean>(enableEdit)

    const [salePerson, setSalePerson] = useState({})

    const [updateData, setUpdateData] = useState({
        name: "",
        emp_id: "",
        email: "",
        contact_number: "",
        role: ""
    })
    useEffect(() => {
        const fetchData = async () => {
            setId(sales_id.sales_id)
            console.log(sales_id)
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sales-person/${id}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                setSalePerson(response.data);
                console.log(response.data, "sales person data");

                setUpdateData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setId(sales_id.sales_id)
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/sales-person/${id}`, updateData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log('Data sent successfully!');
        } catch (error) {
            console.error('Error sending data:', error);
        }
        setEditForm(!enableEdit)

    }

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setUpdateData({
            ...updateData,
            [name]: value
        })
    }

    const handleClose = () => {
        setEditForm(!enableEdit)
        console.log("closed box")
    }

    return (
        <>
            {editForm ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full"
                    >
                        <div className="relative pt-20 w-auto mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-5 p-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white w-98">
                                        Sales Person Edit
                                    </h3>
                                    <button
                                        onClick={handleClose}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >

                                        <X />
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/*body*/}
                                {/* <div> */}
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    {/* Modal body */}
                                    <div className="p-6 space-y-6">
                                        <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white shadow-md rounded-md">
                                            <div className="flex flex-col w-full mt-6 space-x-2 items-between">
                                                <div className="flex">

                                                </div>
                                                <div className="flex items-center">
                                                    <label className="block text-gray-600 text-sm w-full">Name : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' type="text" placeholder='Sales Person Name' name='name' onChange={handleInputChange} value={updateData.name} />
                                                </div>

                                                <div className="flex items-center">
                                                    <label className="block text-gray-600 text-sm w-full">ID : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' type="text" placeholder='Employee ID' name='emp_id' onChange={handleInputChange} value={updateData.emp_id} />
                                                </div>

                                                <div className="flex items-center">

                                                    <label className="block text-gray-600 text-sm w-full">Email : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder="salesperson@hysus.com" name='email' onChange={handleInputChange} value={updateData.email} />
                                                </div>

                                                <div className="flex items-center">
                                                    <label className="block text-gray-600 text-sm w-full">Contact : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder='+91 1111111111' name='contact_number' onChange={handleInputChange} value={updateData.contact_number} />
                                                </div>

                                                <div className="flex items-center">
                                                    <label className="block text-gray-600 text-sm w-full">Role : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder='Role' name='role' onChange={handleInputChange} value={updateData.role} />
                                                </div>
                                            </div>

                                            {/* Modal footer */}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={handleClose}
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
                                    {/* </div> */}
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

export default EditSalesPerson