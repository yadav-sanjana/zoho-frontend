import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { X } from 'lucide-react';

interface CustomerType {
    id: number;
    customerType: string;
    contactPerson: string;
    company: string;
    firstname: string;
    lastname: string;
    customer_email: string;
    skype_name: string;
    designation: string;
    work_phone: string;
    mobile_phone: string;
    website: string;
    created_by?: null;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
}

const CustomerDetail = ({ id, sheetTrigger }) => {
    const [customer, setCustomer] = useState<CustomerType>();
    const [showDetails, setShowDetails] = useState(sheetTrigger)

    const fetchData = useCallback(async (id) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/${id}`);
            setCustomer(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData(id);
    }, [id, fetchData]);

    return (
        <>
            {/* <Sheet>
                {sheetTrigger}
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Customer Details</SheetTitle>
                        <SheetDescription>
                            {customer && (
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                                        <p>ID: {customer?.id}</p>
                                        <p>Customer Type: {customer?.customerType}</p>
                                        <p>Contact Person: {customer?.contactPerson}</p>
                                        <p>Company: {customer?.company}</p>
                                        <p>First Name: {customer?.firstname}</p>
                                        <p>Last Name: {customer?.lastname}</p>
                                    </div>
                                    <div className="w-full md:w-1/2 lg:w-2/3 p-4">
                                        <p>Customer Email: {customer?.customer_email}</p>
                                        <p>Skype Name: {customer?.skype_name}</p>
                                        <p>Designation: {customer?.designation}</p>
                                        <p>Work Phone: {customer?.work_phone}</p>
                                        <p>Mobile Phone: {customer?.mobile_phone}</p>
                                        <p>Website: {customer?.website}</p>
                                    </div>
                                </div>
                            )}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet> */}
            {showDetails && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full"
                    >
                        <div className="relative pt-20 w-auto my-6 mx-auto md:max-w-3xl">
                            {/*content*/}
                            <div className="border-5 p-5 mt-20 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white w-98">
                                        Customer Information
                                    </h3>
                                    <button
                                        onClick={() => setShowDetails(!sheetTrigger)}
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >

                                        <X />
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div>
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        {/* Modal body */}
                                        <div className="p-6 space-y-6">
                                            <form className="mx-auto p-4 bg-white shadow-md rounded-md">
                                                { }
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Customer Type</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="customerType"
                                                        value={customer?.customerType}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                    />
                                            
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Contact Person</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="contactPerson"
                                                        value={customer?.contactPerson}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Company Name</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="company"
                                                        value={customer?.company}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className='mb-4 flex'>
                                                    <label className="block text-gray-600 text-sm w-80">Owner Name</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="firstname"
                                                        value={customer?.firstname}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        placeholder='First Name'
                                                        required
                                                    />
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="lastname"
                                                        value={customer?.lastname}

                                                        className="w-96 ml-2 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        placeholder='Last Name'
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Email</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="customer_email"
                                                        value={customer?.customer_email}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Contact</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="work_phone"
                                                        value={customer?.work_phone}

                                                        className="w-50 p-1 mx-4 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        placeholder='Work Phone'
                                                        required
                                                    />
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="mobile_phone"
                                                        value={customer?.mobile_phone}

                                                        className="w-50 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        placeholder='Mobile Phone'
                                                        required
                                                    />

                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Skype Name</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="skype_name"
                                                        value={customer?.skype_name}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Designation</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="designation"
                                                        value={customer?.designation}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 flex">
                                                    <label className="block text-gray-600 text-sm w-80">Website</label>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="website"
                                                        value={customer?.website}

                                                        className="w-96 p-1 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        required
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    );
};

export default CustomerDetail;
