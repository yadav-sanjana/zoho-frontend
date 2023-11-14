import axios from 'axios';
import { Edit } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import EditSalesPerson from './EditSalesPerson';
import Snackbar from '../SnackBar';

interface UserType {
    id: number;
    emp_id: string;
    name: string;
    email: string;
    contact_number: string;
    role: string;
}

const SalesPersonTable = () => {
    const [data, setData] = useState<UserType[]>([]);
    const [sales_id, setSales_id] = useState(1)
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [editForm, setEditForm] = useState(false)

    const editHandle = (id) => {
        setEditForm(true)
        setSales_id(id)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sales-person`);
                setData(response.data);
                console.log(response.data);
            } catch (error: any) {
                console.error('Error fetching data:', error?.response?.data?.message);
                setSnackbarMessage(error?.response?.data?.message)
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Snackbar message={snackbarMessage} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Emp id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                role
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
                                    {item.emp_id}
                                </td>
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4">{item.email}</td>

                                <td className="px-6 py-4">{item.contact_number}</td>
                                <td className="px-6 py-4">{item.role}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => editHandle(item.id)} type='button'>

                                        <Edit />
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
                {editForm && (
                    <EditSalesPerson sales_id={sales_id} editForm={editForm} setEditForm={setEditForm} />
                )}
            </div >
        </>
    );
};

export default SalesPersonTable;
