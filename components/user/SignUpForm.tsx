'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Warehouse } from 'lucide-react';

const SignupForm: React.FC = () => {

    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        role: 1,
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, signUpData);

            console.log(response.data);
            console.log(signUpData);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="fixed inset-0 flex items-center border-gray-300 justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="z-50 bg-white p-4 rounded-md shadow-md w-96">
                    <div className='flex justify-center'>
                        <Warehouse className='h-9 w-8 mr-4' />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={signUpData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-md border-black-300 focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={signUpData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-md border-black-300 focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-gray-700">
                                Role
                            </label>
                            <input
                                type="number"
                                id="role"
                                name="role"
                                value={signUpData.role}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-md border-black-700 focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:ring focus:ring-blue-200 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
