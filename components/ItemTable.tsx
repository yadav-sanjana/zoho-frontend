import axios from 'axios';
import { Edit } from 'lucide-react';
import React, { useEffect, useState } from 'react'
export interface ItemType {
    id: number;
    cart_id: number;
    item: string;
    quantity: number;
    rate: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
}


const ItemTable = () => {
    //items
    const [item, setItem] = useState<ItemType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/item/${5}`);
                if (!itemResponse.data) {
                    throw new Error('Network response was not ok');
                }

                setItem(itemResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Item Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rate
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.item}
                                </td>
                                <td className="px-6 py-4">{item.quantity}</td>
                                <td className="px-6 py-4">{item.rate}</td>
                                <td className="px-6 py-4">{item.amount}</td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <Edit />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ItemTable