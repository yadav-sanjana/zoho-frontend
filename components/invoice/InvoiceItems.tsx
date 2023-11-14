import React from 'react'

const ItemTable = ({ tableData }) => {
    return (
        <div className="relative overflow-x-auto mb-10">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Item
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rate
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tax
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData?.length > 0 ? (

                        tableData.map((itemdata, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                    {itemdata?.item}
                                </td>
                                <td className="px-6 py-4">{itemdata?.description}</td>
                                <td className="px-6 py-4">{itemdata?.rate}</td>
                                <td className="px-6 py-4">{itemdata?.qty}</td>
                                <td className="px-6 py-4">{itemdata?.tax}</td>
                                <td className="px-6 py-4">{itemdata?.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td>
                                No Items added
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>

    )
}

export default ItemTable
