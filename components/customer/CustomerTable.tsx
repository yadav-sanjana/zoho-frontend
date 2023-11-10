import axios from 'axios';
import { Edit, Eye } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import CustomerDetail from './CustomerDetail';
import CustomerUpdateForm from './CustomerUpdateForm';

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

const CustomerTable = () => {
    const [data, setData] = useState<CustomerType[]>([]);
    const [showCustomerDetail, setShowCustomerDetail] = useState(false);
    const [showCustomerUpdateForm, setShowCustomerUpdateForm] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);


    const handleCustomerDetailClick = (customerId) => {
        setShowCustomerUpdateForm(false);
        setSelectedCustomerId(customerId);
        setShowCustomerDetail(true);
        console.log(customerId);

    };

    const handleCustomerUpdateClick = (customerId) => {
        setShowCustomerDetail(false);
        setSelectedCustomerId(customerId);
        setShowCustomerUpdateForm(true);
        console.log(customerId, "update ID")
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/customer`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs bg-gray-200 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                company
                            </th>
                            <th scope="col" className="px-6 py-3">
                                contact Person
                            </th>
                            <th scope="col" className="px-6 py-3">
                                customer email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                work phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((detail, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {detail.company}
                                </td>
                                <td className="px-6 py-4">{detail.contactPerson}</td>
                                <td className="px-6 py-4">{detail.customer_email}</td>
                                <td className="px-6 py-4">{detail.work_phone}</td>

                                {/* view */}
                                <td className="px-6 py-4">
                                    <button onClick={() => handleCustomerDetailClick(detail.id)}><Eye />
                                    </button>

                                </td>


                                <td className="px-6 py-4">
                                    {/* edit */}
                                    <button onClick={() => handleCustomerUpdateClick(detail.id)}><Edit />

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {
                        showCustomerDetail && (
                            <CustomerDetail id={selectedCustomerId} setShowDetails={true} />
                        )
                    }
                    {showCustomerUpdateForm && (
                        <CustomerUpdateForm customer_id={selectedCustomerId} setUpdateDetail={true} />
                    )
                    }
                </table>

            </div>
        </>
    );
};

export default CustomerTable;
