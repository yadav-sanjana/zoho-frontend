'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface LoginType {
  user: User;
  token: string;
}
interface User {
  id: number;
  role: string;
  name: string;
  email: string;
  as_role: Role;
  as_company_detail: Company;
  created_by: number;
  updated_by?: null;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: number;
  role: string;
}

interface Company {
  id: number;
  company_name: string;
  company_address: string;
  company_city: string;
  company_country: string;
  company_zip: string;
}

const Settings = () => {
  const [data, setData] = useState<LoginType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      const decodeToken = parseJwt(token)
      console.log(decodeToken);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${decodeToken?.email}`);
        setData(response.data);

        console.log(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [showCompanyForm, setShowCompanyForm] = React.useState(false);

  const [companyData, setCompanyData] = useState({
    company_name: "",
    company_address: "",
    company_city: "",
    company_country: "",
    company_zip: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/company`, companyData, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log('Data sent successfully!');
    } catch (error) {
      console.error('Error sending data:', error);
    }
    setShowCompanyForm(false)
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setCompanyData({
      ...companyData,
      [name]: value
    })
  }
  return (
    <>
      <div className="flex bg-white w-full rounded-lg shadow dark:bg-gray-700">
        <div className="p-6 flex-col w-1/2 space-y-6">
          <div className="mx-full p-4 bg-white shadow-md rounded-md">
            <h2 className='text-2xl'>User Details</h2>
            <div className="flex flex-col w-full mt-6 space-x-2 items-between">
              <div className="flex">

              </div>
              <div className="flex">
                <p>Name : </p><span>{data?.user?.name}</span>
              </div>
              <div className="flex">
                <p>Email : </p><span>{data?.user?.email}</span>
              </div>
              <div className="flex">
                <p>Role : </p><span>{data?.user?.as_role?.role}</span>
              </div>
            </div>

          </div>
          <div className="mx-full p-4 bg-white shadow-md rounded-md">
            {(data?.user?.as_company_detail?.id) ? (
              <div className="flex flex-col">
                <h2 className='text-black-800 text-2xl'>Company Details</h2>
                <div className="flex">
                  <p>Company Name : </p><span>{data?.user?.as_company_detail?.company_name}</span>
                </div>
                <div className="flex">
                  <p>Address Line 1 : </p><span>{data?.user?.as_company_detail?.company_address}</span>
                </div>
                <div className="flex">
                  <p>City : </p><span>{data?.user?.as_company_detail?.company_city}</span>
                </div>
                <div className="flex">
                  <p>Country : </p><span>{data?.user?.as_company_detail?.company_city}</span>
                </div>
                <div className="flex">
                  <p>Zip : </p><span>{data?.user?.as_company_detail?.company_city}</span>
                </div>
              </div>
            ) : (
              <button className='bg-blue-600 py-3 px-6 text-white' type='button' onClick={() => setShowCompanyForm(true)}>Add Company</button>
            )}
          </div>
        </div>

        {showCompanyForm ? (
          <div className="p-6 flex-col w-1/2 space-y-6">
            <form onSubmit={handleSubmit} className="mx-auto p-4 bg-white shadow-md rounded-md">

              <div className="flex flex-col w-full mt-6 space-x-2 items-between">
                <h2>Company Details Form</h2>
                <div className="flex">

                </div>

                <div className="flex items-center">
                  <label className="block text-gray-600 text-sm w-full">Name : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' type="text" placeholder='Company Name' name='company_name' onChange={handleInputChange} value={companyData.company_name} />
                </div>

                <div className="flex items-center">
                  <label className="block text-gray-600 text-sm w-full">ID : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' type="text" placeholder='Line 1' name='company_address' onChange={handleInputChange} value={companyData.company_address} />
                </div>

                <div className="flex items-center">

                  <label className="block text-gray-600 text-sm w-full">Email : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder="City" name='company_city' onChange={handleInputChange} value={companyData.company_city} />
                </div>

                <div className="flex items-center">
                  <label className="block text-gray-600 text-sm w-full">Contact : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder='Country' name='company_country' onChange={handleInputChange} value={companyData.company_country} />
                </div>

                <div className="flex items-center">
                  <label className="block text-gray-600 text-sm w-full">Role : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder='zip' name='company_zip' onChange={handleInputChange} value={companyData.company_zip} />
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowCompanyForm(false)}
                >
                  Close
                </button>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (null)}
      </div></>

  )
}

export default Settings

function parseJwt(token: any) {
  throw new Error('Function not implemented.');
}
