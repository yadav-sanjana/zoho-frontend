'use client'
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { CldUploadButton } from 'next-cloudinary';
import React, { useEffect, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';


interface UserType {
  id: number;
  name: string;
  role: number;
  email: string;
  company_id: number;
  created_by: number;
  updated_by?: null;
  createdAt: string;
  updatedAt: string;
  as_company_detail: AsCompanyDetail;
  as_role: AsRole;
}
interface AsCompanyDetail {
  id: number;
  company_name: string;
  company_address: string;
  company_city: string;
  company_country: string;
  company_zip: number;
}
interface AsRole {
  id: number;
  role: string;
}

const Settings = () => {
  const [companyLogo, setCompanyLogo] = useState("")
  const [data, setData] = useState<UserType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        throw "Please Login"
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user-info`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
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
    company_zip: "",
    company_logo: ""
  })
  const handleSubmit = async (e) => {
    e.preventDefault();

    const myCompanyData ={
      company_name: companyData.company_name,
      company_address : companyData.company_address,
      company_city : companyData.company_city,
      company_country: companyData.company_country,
      company_zip : companyData.company_zip,
      company_logo : companyLogo
    } 

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/company`, myCompanyData, {
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
  
  console.log(companyData, companyLogo,"data payload");
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
                <p>Name : </p><span>{data?.name}</span>
              </div>
              <div className="flex">
                <p>Email : </p><span>{data?.email}</span>
              </div>
              <div className="flex">
                <p>Role : </p><span>{data?.as_role?.role}</span>
              </div>
            </div>

          </div>
          <div className="mx-full p-4 bg-white shadow-md rounded-md">
            {(data?.as_company_detail?.id) ? (
              <>
                <div className="flex">

                  <table>
                    <div className="flex">
                      <thead className='text-black-800 text-2xl'>Company Details</thead>
                      <button className='px-4 text-blue-400 items-end' type='button' onClick={() => setShowCompanyForm(true)}><FaEdit /></button>
                    </div>
                    <tbody>
                      <tr>
                        <td className='font-bold'>Company Name : </td><td>{data?.as_company_detail?.company_name}</td>
                      </tr>

                      <tr>
                        <td className='font-bold'>Address Line 1 : </td><td>{data?.as_company_detail?.company_address}</td>
                      </tr>

                      <tr>
                        <td className='font-bold'>City : </td><td>{data?.as_company_detail?.company_city}</td>
                      </tr>
                      <tr>
                        <td className='font-bold'>Country : </td><td>{data?.as_company_detail?.company_country}</td>
                      </tr>
                      <tr>
                        <td className='font-bold'>Zip : </td><td>{data?.as_company_detail?.company_zip}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>

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
                  <label className="block text-gray-600 text-sm w-full">Company Name : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' type="text" placeholder='Company Name' name='company_name' onChange={handleInputChange} value={companyData.company_name} />
                </div>

                <div className="flex items-center">
                  <label className="block text-gray-600 text-sm w-full">Line 1 : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 ml-4 mb-1 placeholder:text-slate-400' type="text" placeholder='Line 1' name='company_address' onChange={handleInputChange} value={companyData.company_address} />
                </div>

                <div className="flex items-center">

                  <label className="block text-gray-600 text-sm w-full">City : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder="City" name='company_city' onChange={handleInputChange} value={companyData.company_city} />
                </div>

                <div className="flex items-center">
                  <label className="block text-gray-600 text-sm w-full">Country : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder='Country' name='company_country' onChange={handleInputChange} value={companyData.company_country} />
                </div>

                <div className="flex items-center">
                  <label className="block text-gray-600 text-sm w-full">zip : </label>
                  <input className='h-7 text-base border-2 border-gray-200 p-1 mb-1 ml-4 placeholder:text-slate-400' type="text" placeholder='zip' name='company_zip' onChange={handleInputChange} value={companyData.company_zip} />
                </div>
                <div className="flex items-center justify-center">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-48 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <AiOutlineCloudUpload className='w-6 h-6 text-gray-500 dark:text-gray-400' />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {/* <input type="text" /> */}
                        <CldUploadButton  onUpload={(data: any) => {
                          setCompanyLogo(data?.info?.secure_url)

                        }} className='' uploadPreset="InvoicePreset" />
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG (240x240px)</p>
                    </div>
                    {/* <input id="dropzone-file" type="text" className="hidden"  name='company_logo' value={companyData.company_logo} onChange={handleInputChange}/> */}
                  </label>
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