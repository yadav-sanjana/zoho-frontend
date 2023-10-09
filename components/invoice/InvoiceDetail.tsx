import axios from "axios";
import { useEffect, useState } from "react"
import { Card, CardContent } from "../ui/card";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "../ui/sheet";

interface InvoiceType {
    id: number;
    customer: number;
    invoice_no: string;
    order_no: number;
    invoice_date: string;
    terms: number;
    due_date: string;
    sales_person: number;
    subject: string;
    customer_notes: string;
    ATC: string;
    file: string;
    amount: number;
    status: string;
    created_by: number;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
    as_customer: AsCustomer;
    as_sales_person: AsSalesPerson;
    as_terms: AsTerms;
}
interface AsCustomer {
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
interface AsSalesPerson {
    id: number;
    email: string;
    name: string;
}
interface AsTerms {
    id: number;
    term: string;
    days: number;
}

export const InvoiceDetail = ({ id }) => {
    const [invoice, setInvoice] = useState<InvoiceType>()

    useEffect(() => {
        fetchData(id)
    }, [id])

    const fetchData = async (id) => {
        try {

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/invoice/${id}`)
            setInvoice(response.data.invoice)

            console.log(response.data.invoice);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <Sheet>
                <SheetTrigger>View</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Invoice Details</SheetTitle>
                        <SheetDescription>
                            <Card>
                                <CardContent>
                                    {invoice && (
                                        <div>
                                            <div className='xs-6'>
                                                <p>id: {invoice.id}</p>
                                                <p> customer: {invoice.as_customer?.company}</p>
                                                <p>invoice_no : {invoice.invoice_no}</p>
                                                <p>order_no: {invoice.order_no}</p>
                                                <p>invoice_date : {invoice.invoice_date}</p>
                                                <p>terms: {invoice.terms}</p>
                                                <p>due_date:{invoice.due_date} </p>
                                                <p>sales_person : {invoice.as_sales_person?.name}</p>
                                                <p>subject: {invoice.subject}</p>
                                                <p>customer_notes: {invoice.customer_notes}</p>
                                                <p>ATC: {invoice.ATC}</p>
                                                <p>file: {invoice.file}</p>
                                                <p>amount: {invoice.amount}</p>
                                                <p>status: {invoice.status}</p>
                                            </div>
                                            <div>

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
    )
}