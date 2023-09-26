// components/CustomerForm.tsx
import { useState } from 'react';
import axios from 'axios';
import { Card } from './ui/card';

const CustomerForm = () => {
    const [formData, setFormData] = useState({
        customerType: 'business' || 'individual',
        contactPerson: '',
        company: '',
        username: '',
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
            // Send data to your Node.js REST API
            await axios.post('http://localhost:3007/api/customer', formData);
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
        <div className="mx-auto p-4 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-semibold mb-4">Customer Form</h1>
            <Card className='mx-auto p-4 bg-white shadow-md rounded-md'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Customer Type</label>
                        <input
                            type="text"
                            name="CustomerType"
                            value={formData.customerType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Contact Person</label>
                        <input
                            type="text"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">User name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Customer Email</label>
                        <input
                            type="text"
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Work Phone</label>
                        <input
                            type="text"
                            name="work_phone"
                            value={formData.work_phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Mobile Phone</label>
                        <input
                            type="text"
                            name="mobile_phone"
                            value={formData.mobile_phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Skype Name</label>
                        <input
                            type="text"
                            name="skype_name"
                            value={formData.skype_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium">Website</label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default CustomerForm;
