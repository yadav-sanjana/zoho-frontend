import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                            company
                            </th>
                            <th scope="col" className="px-6 py-3">
                            contact Person
                            </th>
                            <th scope="col" className="px-6 py-3">
                            customer_email
                            </th>
                            <th scope="col" className="px-6 py-3">
                            work_phone
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
                                    {item.company}
                                </td>
                                <td className="px-6 py-4">{item.contactPerson}</td>
                                <td className="px-6 py-4">{item.customer_email}</td>
                                <td className="px-6 py-4">{item.work_phone}</td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomerTable;