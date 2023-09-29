'use client';
import { useState } from 'react';

const UserPage = () => {
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
        + New User
      </button>
      {/* <CustomerForm isOpen={isFormOpen} onClose={closeForm} /> */}
    </div>
  );
}

export default UserPage