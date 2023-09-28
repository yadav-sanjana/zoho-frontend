import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';

interface LoginType {
    user: User;
    token: string;
}
interface User {
    id: number;
    role: string;
    email: string;
    created_by: number;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
}


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    }
    const [data, setData] = useState<LoginType | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${email}`);
                setData(response.data);
                console.log(data);

                localStorage.setItem('token', response.data.token)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token')
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="h-10">
            <Avatar name={data?.user?.email}
                onClick={toggleDropdown}
                className="rounded-full cursor-pointer h-1"
                alt="User dropdown"
                size='50'
            />

            {/* Dropdown menu */}
            {isDropdownOpen && data && (
                <div className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <>
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="font-medium truncate">{data?.user?.email}</div>
                        </div>
                        <div className="py-1">
                            <button
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={() => { handleLogout }}
                            >
                                Sign out
                            </button>
                        </div></>


                </div>

            )}
        </div>
    );
}

export default UserLogin