import axios from 'axios';
import { Edit } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import UpdateItemForm from './UpdateItemForm';

interface ItemType {
    id: number;
    customer_id: number;
    discount: number;
    tax: number;
    total_amount: number;
    payableAmount?: null;
    cart_details?: {
        id: number;
        cart_id: number;
        item: string;
        quantity: number;
        rate: number;
        amount: number;
        createdAt: string;
        updatedAt: string;
    }[]

}

const ItemTable = ({ cart }: { cart: any }) => {

    const [updateItemModal, setUpdateItemModal] = useState<boolean>(false)

    const [itemID, setItemID] = useState<number>(0)

    const onClickHandle = (e) => {
        setUpdateItemModal(true)
        setItemID(e.target.value)
        console.log(itemID, "item id received");      
    }



    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
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
                        {cart ? (cart[0]?.cart_details?.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-gray-300 border-b dark:bg-gray-800 dark:border-gray-700"
                            >

                                <>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.item}
                                    </td>
                                    <td className="px-6 py-4">{item.quantity}</td>
                                    <td className="px-6 py-4">{item.rate}</td>
                                    <td className="px-6 py-4">{item.amount}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            type="button"
                                            value={item.id}
                                            name='id'
                                            onClick={onClickHandle}
                                        >
                                           Edit
                                        </button>
                                        {updateItemModal ? <UpdateItemForm setUpdateItemModal={setUpdateItemModal} item_id={itemID} /> : null}
                                    </td></>

                            </tr>
                        ))) : (
                            <div>
                                No Items added
                            </div>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ItemTable