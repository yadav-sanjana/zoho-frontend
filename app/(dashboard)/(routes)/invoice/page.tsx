'use client'
import InvoiceTable from '@/components/invoice/InvoiceTable';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const InvoicePage = () => {
  return (
    <>
      <button
        className="bg-blue-500 flex text-white px-4 py-2 active:bg-blue-600 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        <Link href='/invoice/new'>
          <div className='flex items-center space-x-2'>
            <Plus className="h-6 w-5 mr-3" />
            <span>Add Invoice</span>
          </div>
        </Link>
      </button>
      <InvoiceTable/>
    </>
  );
}

export default InvoicePage