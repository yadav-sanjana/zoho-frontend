'use client'
import React, { useState } from 'react';
import axios from 'axios';
import '../../app/(dashboard)/(routes)/dashboard/page'
import { Home } from 'lucide-react';
import bgImage from '../../public/login/bg images.png'
import Image from 'next/image';
import NavBar from '../landingPage/NavBar';


const LoginForm: React.FC = () => {

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
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex w-full min-h-screen">
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}
        >

          <Image src={bgImage} alt='background' className='w-full h-full'></Image>

          <div className="p-8">
            <Home className='h-9 w-8 text-white' />
            {/* Add any other content here */}
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          {/* Move the login form to the right half */}
          <div className="bg-white p-4 rounded-md shadow-md w-96 border-4 border-cyan-800">
            <div>
              <div className="flex">
                Welcome
              </div>
            <div className='w-full flex text-green-950 mb-5'>
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
                <p className='mt-5'>Not a user? <a className='text-blue-800' href="/register">Sign Up</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;


