import React, { useState } from 'react';
import axios from 'axios';
import '../../app/(dashboard)/(routes)/dashboard/page'
import { LogIn, LogInIcon, Warehouse } from 'lucide-react';

const LoginForm: React.FC = (isOpen, onClose) => {

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
    <div className="max-w-md mx-auto">
      <div className="fixed inset-0 flex items-center  border-gray-300 justify-center z-50">

        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="z-50 bg-white p-4 rounded-md shadow-md w-96">
          <div className='flex justify-center'>
            <Warehouse className='h-9 w-8 mr-4' />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
