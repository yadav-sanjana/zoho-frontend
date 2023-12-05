'use client'
import React, { useState } from 'react';
import Snackbar from '../../../../components/common/SnackBar' 

const YourPage: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleShowSnackbar = () => {
    setSnackbarMessage('Your message here');
  };

  return (
    <div>
      <button onClick={handleShowSnackbar}>Show Snackbar</button>

      <Snackbar message={snackbarMessage} />
    </div>
  );
};

export default YourPage;
