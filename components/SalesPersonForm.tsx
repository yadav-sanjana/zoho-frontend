import { useState } from 'react';
import axios from 'axios';
import { Card } from './ui/card';
import { Dialog } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

const BASE_URL = process.env.NEXTAUTH_URL
const SalesPersonForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sales-person`, formData, {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBoeXN1cy5jb20iLCJpYXQiOjE2OTUzMDI4OTB9.tuswBwO8TKKwsJx-y3Nm1S7geotECqb8TRfzyWI8NgI'
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

    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    return (
        <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded flex justify-end" onClick={openForm}>
                + Add New
            </button>

            {isFormOpen &&
            <div className="mx-auto p-4 bg-white shadow-md rounded-md">
                <h1 className="text-xl font-semibold mb-4">Sales Person Form</h1>
                <Card className='mx-auto p-4 bg-white shadow-md rounded-md'>
                    <Dialog>

                        <form onSubmit={handleSubmit}>
                            <div className='flex place-content-end'>
                                <X
                                    type="submit"
                                    className="h-6 w-5 mr-3 hover:bg-red-400"
                                    onClick={closeForm}
                                >
                                </X>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium">Sales Person Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white m-4 p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </Dialog>
                </Card>
            </div>
            }
        </>
    );
};

export default SalesPersonForm;
