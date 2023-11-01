import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {  X } from 'lucide-react';

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


const CustomerDetail = ({ id, customerModal }) => {
    const [customer, setCustomer] = useState<CustomerType>();

    const [customerDetailModal, setCustomerDetailModal] = useState(customerModal)

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

                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Customer Details</SheetTitle>
                        <SheetDescription>
                            {/* <Card>
                                <CardContent>
                            {customer && (
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                                        <p>ID: {customer.id}</p>
                                        <p>Customer Type: {customer.customerType}</p>
                                        <p>Contact Person: {customer.contactPerson}</p>
                                        <p>Company: {customer.company}</p>
                                        <p>First Name: {customer.firstname}</p>
                                        <p>Last Name: {customer.lastname}</p>
                                    </div>
                                    <div className="w-full md:w-1/2 lg:w-2/3 p-4">
                                        <p>Customer Email: {customer.customer_email}</p>
                                        <p>Skype Name: {customer.skype_name}</p>
                                        <p>Designation: {customer.designation}</p>
                                        <p>Work Phone: {customer.work_phone}</p>
                                        <p>Mobile Phone: {customer.mobile_phone}</p>
                                        <p>Website: {customer.website}</p>
                                    </div>
                                </div>

                            )}
                            {/* </CardContent>
                            </Card> 
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet> */}

            {
                customerDetailModal && (
                    <form className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">

                        {/* invoice image & label */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center justify-center">
                                {customer && (
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                                            <p>ID: {customer.id}</p>
                                            <p>Customer Type: {customer.customerType}</p>
                                            <p>Contact Person: {customer.contactPerson}</p>
                                            <p>Company: {customer.company}</p>
                                            <p>First Name: {customer.firstname}</p>
                                            <p>Last Name: {customer.lastname}</p>
                                        </div>
                                        <div className="w-full md:w-1/2 lg:w-2/3 p-4">
                                            <p>Customer Email: {customer.customer_email}</p>
                                            <p>Skype Name: {customer.skype_name}</p>
                                            <p>Designation: {customer.designation}</p>
                                            <p>Work Phone: {customer.work_phone}</p>
                                            <p>Mobile Phone: {customer.mobile_phone}</p>
                                            <p>Website: {customer.website}</p>
                                            <button onClick={() => setCustomerDetailModal(false)}>
                                                <X />
                                            </button>
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                    </form>
                )
            }

        </>
    );
};

export default CustomerDetail;
