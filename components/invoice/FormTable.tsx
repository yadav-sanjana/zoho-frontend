import React, { useState } from 'react'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'

const FormTable = (updateTableData) => {
    const [tableData, setTableData] = useState([
        {
            item: "",
            description: "",
            rate: "",
            qty: "",
            tax: "",
            amount: ""
        },
    ])

    const addRow = () => {
        setTableData([
            ...tableData, {
                item: "",
                description: "",
                rate: "",
                qty: "",
                tax: "",
                amount: ""
            }
        ])
    }

    const removeRow = (index) => {
        const updatedData = [
            ...tableData
        ]

        updatedData.splice(index, 1)
        setTableData(updatedData)
    }

    const handleInputChange = (index, e) => {

        const { name, value } = e.target
        const updatedData = [...tableData]
        updatedData[index][name] = value

        if (name === 'qty' || name === 'rate') {
            const qty = parseFloat(updatedData[index].qty)
            const price = parseFloat(updatedData[index].rate)

            if (!isNaN(qty) && !isNaN(price)) {
                updatedData[index].amount = (price * qty).toFixed(2)
            } else {
                updatedData[index].amount = ""
            }

        }

        setTableData(updatedData)
        console.log(updatedData);
        updateTableData(updateTableData)

    }

    return (
        <div className="relative overflow-x-auto shadow-sm sm:rounded-lg my-6">
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
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((row, index) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    key={index}>
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                        <input className='h-7 w-full text-base border-0 p-1 mb-1 placeholder:text-slate-400'
                                            type="text"
                                            placeholder='Item'
                                            name='item'
                                            value={row.item}
                                            onChange={(e) => handleInputChange(index, e)} />
                                    </th>
                                    <td className="px-6 py-4"><textarea
                                        id="message"
                                        rows={2}
                                        name='description'
                                        value={row.description}
                                        className="block p-2 w-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write item's description..."
                                        onChange={(e) => handleInputChange(index, e)}
                                    ></textarea></td>
                                    <td className="px-6 py-4">
                                        <input className='h-7 w-full text-base border-0 p-1 mb-1 placeholder:text-slate-400'
                                            type="number"
                                            placeholder='rate'
                                            name='rate'
                                            value={row.rate}
                                            onChange={(e) => handleInputChange(index, e)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input className='h-7 w-full text-base border-0 p-1 mb-1 placeholder:text-slate-400'
                                            type="number"
                                            placeholder='qty'
                                            name='qty'
                                            value={row.qty}
                                            onChange={(e) => handleInputChange(index, e)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input className='h-7 text-base w-full border-0 p-1 mb-1 placeholder:text-slate-400'
                                            type="number"
                                            placeholder='tax'
                                            name='tax'
                                            value={row.tax}
                                            onChange={(e) => handleInputChange(index, e)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input className='h-7 w-full text-base border-0 p-1 mb-1 placeholder:text-slate-400'
                                            type="number"
                                            placeholder='amount'
                                            name='amount'
                                            value={row.amount}
                                            onChange={(e) => handleInputChange(index, e)} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button type='button' onClick={() => removeRow(index)}>
                                            <AiOutlineCloseCircle className='text-red-600 text-base' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    <button onClick={addRow} type='button' className='my-3 flex items-center space-x-2 text-purple-600 font-bold'>
                        <AiOutlinePlusCircle className='text-base' />
                        <span>Add line item</span>
                    </button>
                </tbody>
            </table>
        </div>
    )
}

export default FormTable
