import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { EyeIcon } from 'lucide-react';

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


const CustomerDetail = ({ id }) => {
    const [customer, setCustomer] = useState<CustomerType>();

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
            <Sheet>
                <SheetTrigger><EyeIcon /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Customer Details</SheetTitle>
                        <SheetDescription>
                            <Card>
                                <CardContent>
                                    {customer && (
                                        <div>
                                            <div className='xs-6'>
                                                <p>ID: {customer.id}</p>
                                                <p>Customer Type: {customer.customerType}</p>
                                                <p>Contact Person: {customer.contactPerson}</p>
                                                <p>Company: {customer.company}</p>
                                                <p>First Name: {customer.firstname}</p>
                                                <p>Last Name: {customer.lastname}</p>
                                            </div>
                                            <div>
                                                <p>Customer Email: {customer.customer_email}</p>
                                                <p>Skype Name: {customer.skype_name}</p>
                                                <p>Designation: {customer.designation}</p>
                                                <p>Work Phone: {customer.work_phone}</p>
                                                <p>Mobile Phone: {customer.mobile_phone}</p>
                                                <p>Website: {customer.website}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default CustomerDetail;
