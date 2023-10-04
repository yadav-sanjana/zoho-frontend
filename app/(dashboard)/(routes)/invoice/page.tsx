'use client';
import InvoiceForm from '@/components/InvoiceForm';
import InvoiceTable from '@/components/InvoiceTable';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const InvoicePage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const changeState = () => {
    setShowForm(true)
  }
  return (
    <>
      <button
        className="bg-blue-500 flex text-white px-4 py-2 active:bg-blue-600 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={changeState}
      >
        <Plus className="h-6 w-5 mr-3" />Add Invoice
      </button>
      {showForm ? <InvoiceForm showForm={showForm} setShowForm={setShowForm}/> : <InvoiceTable />}
    </>
  );
}

export default InvoicePage