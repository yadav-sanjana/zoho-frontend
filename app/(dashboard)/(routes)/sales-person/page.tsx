'use client';
import { useState } from 'react';

const SalePerson = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded flex justify-end" onClick={openForm}>
        + Add New
      </button>
      {/* <CustomerForm isOpen={isFormOpen} onClose={closeForm} /> */}
    </div>
  );
}

export default SalePerson