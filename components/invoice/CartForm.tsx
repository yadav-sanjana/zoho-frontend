import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface ItemType {
    id: number;
    customer_id: number;
    discount: number;
    tax: number;
    total_amount: number;
    payableAmount: number;
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


const CartForm = ({ cart }: { cart: [ItemType] | null | undefined }) => {
    const [cart_id, setCart_id] = useState<number>()
    const propDetail = cart
    const [cartData, setCartData] = useState<any>({
        total_amount: propDetail ? propDetail[0]?.total_amount : 0,
        tax: propDetail ? propDetail[0]?.tax : 0,
        discount: propDetail ? propDetail[0]?.discount : 0,
        payableAmount: propDetail ? propDetail[0]?.payableAmount || null : null
    })

    console.log(cartData);

    useEffect(() => {
        if (propDetail) {
            const id = propDetail[0]?.id;
            setCart_id(id);

            setCartData({
                total_amount: propDetail ? propDetail[0]?.total_amount : 0,
                tax: propDetail ? propDetail[0]?.tax : 0,
                discount: propDetail ? propDetail[0]?.discount : 0,
                payableAmount: propDetail ? propDetail[0]?.payableAmount || null : null
            })
        } else {
            setCartData({
                total_amount: 0,
                tax: 0,
                discount: 0,
                payableAmount: null
            })
        }
    }, [propDetail]);
    console.log(cart_id, cartData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/${cart_id}`, cartData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log('Data sent successfully!');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const cartHandleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'discount' || name === 'tax') {
            const numericValue = parseFloat(value) || 0;

            setCartData((prevData) => ({
                ...prevData,
                [name]: numericValue,
                payableAmount: prevData.total_amount - (prevData.total_amount * (prevData.discount / 100)) + (prevData.total_amount * (prevData.tax / 100)),
            }));
        } else {
            setCartData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    return (
        <>
            <div>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        <form className="mx-auto p-4 bg-white shadow-md rounded-md">

                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">Amount</label>
                                <input
                                    name="total_amount"
                                    value={cartData.total_amount}
                                    onChange={cartHandleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">Tax (%)</label>
                                <input
                                    name="tax"
                                    value={cartData.tax}
                                    onChange={cartHandleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">Discount (%)</label>
                                <input
                                    name="discount"
                                    value={cartData.discount}
                                    onChange={cartHandleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex">
                                <label className="block text-gray-600 text-sm w-1/3">Total Amount</label>
                                <input
                                    name="payableAmount"
                                    value={cartData.payableAmount}
                                    onChange={cartHandleChange}
                                    className="w-2/3 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    required
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartForm