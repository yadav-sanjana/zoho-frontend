import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import Snackbar from '../common/SnackBar';

const SalesPersonForm = () => {
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [personData, setPersonData] = useState({
        name: "",
        emp_id: "",
        email: "",
        contact_number: "",
        role: ""

    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sales-person`, personData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log('Data sent successfully!');
            setPersonData({
                name: "",
                emp_id: "",
                email: "",
                contact_number: "",
                role: ""

            })
            setSnackbarMessage("Sales Person Created")
            setShowModal(false)

        } catch (error: any) {
            console.error('Error fetching data:', error?.response?.data?.message);
            setSnackbarMessage(error?.response?.data?.message)
        }

    }
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setPersonData({
            ...personData,
            [name]: value
        })
    }

    return (
        <>
            <Snackbar message={snackbarMessage} />

            <button
                className="bg-blue-500 flex text-white px-4 py-2 active:bg-blue-600 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            > Add
            </button>
            {showModal && (
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
                                        Sales Person Form
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
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' type="text" placeholder='Sales Person Name' name='name' required onChange={handleInputChange} value={personData.name} />
                                                </div>

                                                <div className="flex items-center">
                                                    <label className="block text-gray-600 text-sm w-full">ID : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' required type="text" placeholder='Employee ID' name='emp_id' onChange={handleInputChange} value={personData.emp_id} />
                                                </div>

                                                <div className="flex items-center">

                                                    <label className="block text-gray-600 text-sm w-full">Email : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="email" placeholder="salesperson@gmail.com" required name='email' onChange={handleInputChange} value={personData.email} />
                                                </div>

                                                <div className="flex items-center">
                                                    <label className="block text-gray-600 text-sm w-full">Contact : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' required type="text" placeholder='+91 1111111111' name='contact_number' onChange={handleInputChange} value={personData.contact_number} />
                                                </div>

                                                <div className="flex items-center">
                                                    <label className="block text-gray-600 text-sm w-full">Role : </label>
                                                    <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder='Role' name='role' onChange={handleInputChange} required value={personData.role} />
                                                </div>
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
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    );
};

export default SalesPersonForm;
