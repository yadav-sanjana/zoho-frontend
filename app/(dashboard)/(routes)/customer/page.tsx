"use client"
import CustomerForm from '@/components/CustomerForm';
import { useState } from 'react';


const CustomerPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded flex" onClick={openForm}>
        + Add Customer
      </button>
      <div className='min-h-screen flex justify-items-stretch'>
        <CustomerForm />
      </div>

    </div>
  );
}

export default CustomerPage