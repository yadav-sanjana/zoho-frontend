import { useState, useEffect } from 'react';

type SnackbarProps = {
    message: string;
};

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);

    useEffect(() => {
        if (message) {
            setShowSnackbar(true);
            const timeout = setTimeout(() => {
                setShowSnackbar(false);
            }, 3000)
            return () => clearTimeout(timeout);
        }
    }, [message]);

    return (
        <>
            {showSnackbar && (
                <div className="fixed top-16 right-5 bg-cyan-900 text-white px-4 py-2 rounded-md shadow-md">
                    {message}
                </div>
            )}
        </>
    );
};

export default Snackbar;
