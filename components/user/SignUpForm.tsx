'use client'
import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../common/NavBar';
import bgImage from '../../public/login/bg images.png'
import Image from 'next/image';
import Snackbar from '../SnackBar';


const SignupForm: React.FC = () => {
    const [snackbarMessage, setSnackbarMessage] = useState('');


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
            setSnackbarMessage("Successfully registered")
            console.log(signUpData);
            window.location.href = '/login';
        } catch (error: any) {
            console.error('Error', error?.response?.data?.message);
            setSnackbarMessage(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='fixed'>
                <NavBar />
            </div>

            <div className="flex w-full min-h-screen mt-14 fixed">

                <div className="w-1/2 bg-gray-200 flex items-center justify-center px-2">

                    <div className="bg-gray-200 px-8 rounded-md w-96 shadow-md border-4 border-cyan-800">
                        <div className='pb-4'>
                            <div className="text-3xl p-2 font-semibold text-center">
                                Let's get Started
                            </div>
                            <div className='w-full text-green-950 mb-5'>
                                Admin access awaits. Sign up in seconds.
                            </div>
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
                                    type="email"
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

                                <p className='my-5'>Already registered? <a className='text-blue-800' href="/login">Login</a></p>

                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}
                >

                    <Image src={bgImage} alt='background' className='w-full h-full'></Image>

                    <div className="p-8">
                        {/* <Home className='h-9 w-8 text-white' /> */}
                    </div>
                </div>
                <Snackbar message={snackbarMessage} />

            </div>
        </>
    );
};

export default SignupForm;




