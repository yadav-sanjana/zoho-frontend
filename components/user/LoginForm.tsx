'use client'
import React, { useState } from 'react';
import axios from 'axios';
import '../../app/(dashboard)/(routes)/dashboard/page'
import bgImage from '../../public/login/bg images.png'
import Image from 'next/image';
import NavBar from '../common/NavBar';
import Snackbar from '../SnackBar';


const LoginForm: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${email}`);

      localStorage.setItem('token', response.data.token)
      console.log(response.data);
      window.location.href = "/dashboard"
    } catch (error: any) {
      console.error('Error logging in:', error);
      setSnackbarMessage(error?.response?.data?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex w-full min-h-screen mt-14 fixed">

        <div className="w-1/2 bg-gray-200 flex items-center justify-center">
          <div className="bg-gray-200 px-8 rounded-md shadow-md w-96 border-4 border-cyan-800">
            <div className='pb-4'>
              <div className="text-3xl p-2 font-semibold text-center">
                Welcome Back
              </div>
              <div className='w-full text-center text-green-950 mb-5'>
                Secure access, limitless potential.
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-2 rounded-md border-black-300 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="string"
                  id=""
                  className="w-full px-4 py-2 rounded-md border-black-700 focus:ring focus:ring-blue-200"

                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:ring focus:ring-blue-200 ${loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
                <p className='my-5'>Not a user? <a className='text-blue-800' href="/register">Sign Up</a></p>
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

export default LoginForm;


