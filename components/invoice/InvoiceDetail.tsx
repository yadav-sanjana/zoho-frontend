import axios from "axios";
import { useEffect, useState } from "react"
import { Card, CardContent } from "../ui/card";
import { InvoicePdf } from './InvoicePdf'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "../ui/sheet";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Button } from "../ui/button";

export interface InvoiceType {
    id: number;
    customer: number;
    invoice_no: string;
    order_no: number;
    invoice_date: string;
    terms: number;
    due_date: string;
    sales_person: number;
    subject: string;
    discount?: null;
    tax?: null;
    amount?: null;
    balance?: null;
    customer_notes: string;
    ATC: string;
    file: string;
    status: string;
    created_by: number;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
    as_customer: AsCustomer;
    as_sales_person: AsSalesPerson;
    as_terms: AsTerms;
    invoice_cart: InvoiceCart;
}
export interface AsCustomer {
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
    razorpay_id?: null;
    stripe_id?: null;
    website: string;
    created_by?: null;
    updated_by?: null;
    createdAt: string;
    updatedAt: string;
}
export interface AsSalesPerson {
    id: number;
    email: string;
    name: string;
}
export interface AsTerms {
    id: number;
    term: string;
    days: number;
}
export interface InvoiceCart {
    id: number;
    customer_id: number;
    cart_details?: (CartDetailsEntity)[] | null;
}
export interface CartDetailsEntity {
    id: number;
    cart_id: number;
    item: string;
    quantity: number;
    rate: number;
    amount: number;
    createdAt: string;
    updatedAt: string;
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

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#E4E4E4',
        },
        section: {
            margin: 10,
            padding: 5,
        },
        field: {
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column'
        },
        fieldLabel: {
            fontWeight: 'bold',
            fontSize: 12
        },
        fieldValue: {
            fontWeight: 'thin',
            fontSize: 12
        },
        table: {
            // display: 'table',
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: 10,
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
        },
        tableCell: {
            flex: 1,
            padding: 4,
            textAlign: 'center',
        },
        headerCell: {
            backgroundColor: '#CCCCCC',
            fontWeight: 'bold',
        },
    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Company:</Text>
                            <Text style={styles.fieldValue}>{invoice.as_customer?.company}</Text>
                        </View>
                    ) : null}

                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Invoice Number:</Text>
                            <Text style={styles.fieldValue}>{invoice.invoice_no}</Text>
                        </View>
                    ) : null}

                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Order Number: </Text>
                            <Text style={styles.fieldValue}>{invoice.order_no}</Text>
                        </View>
                    ) : null}

                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Invoice Date : </Text>
                            <Text style={styles.fieldValue}>{invoice.invoice_date}</Text>
                        </View>
                    ) : null}
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Terms:</Text>
                            <Text style={styles.fieldLabel}>Days:</Text>
                            <Text style={styles.fieldValue}>{invoice.as_terms.days}</Text>
                            <Text style={styles.fieldLabel}>Term:</Text>
                            <Text style={styles.fieldValue}>{invoice.as_terms.term}</Text>
                        </View>
                    ) : null}
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Sales person:</Text>
                            <Text style={styles.fieldValue}>{invoice.as_sales_person.name}</Text>
                        </View>
                    ) : null}
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Subject:</Text>
                            <Text style={styles.fieldValue}>{invoice.subject}</Text>
                        </View>
                    ) : null}
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Customer Notes:</Text>
                            <Text style={styles.fieldValue}>{invoice.customer_notes}</Text>
                        </View>
                    ) : null}
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>ATC:</Text>
                            <Text style={styles.fieldValue}>{invoice.ATC}</Text>
                        </View>
                    ) : null}
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>File:</Text>
                            <Text style={styles.fieldValue}>{invoice.file}</Text>
                        </View>
                    ) : null}
                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Amount:</Text>
                            <Text style={styles.fieldValue}>{invoice.invoice_no}</Text>
                        </View>
                    ) : null}

                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Balance:</Text>
                            <Text style={styles.fieldValue}>{invoice.invoice_no}</Text>
                        </View>
                    ) : null}

                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Status:</Text>
                            <Text style={styles.fieldValue}>{invoice.invoice_no}</Text>
                        </View>
                    ) : null}

                    {invoice ? (
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Item List:</Text>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell]}>Item Name</Text>
                                <Text style={[styles.tableCell]}>Rate</Text>
                                <Text style={[styles.tableCell]}>Quantity</Text>
                                <Text style={[styles.tableCell]}>Total</Text>
                            </View>

                            {/* Table Data */}
                            {invoice.invoice_cart.cart_details ? <>
                                {invoice.invoice_cart.cart_details.map((item, index) => (
                                    <View style={styles.tableRow} key={index}>
                                        <Text style={[styles.tableCell]}>{item.item}</Text>
                                        <Text style={[styles.tableCell]}>{item.rate}</Text>
                                        <Text style={[styles.tableCell]}>{item.quantity}</Text>
                                        <Text style={[styles.tableCell]}>{item.amount}</Text>
                                    </View>
                                ))}</> : <></>}

                        </View>
                    ) : null}

                </View>
            </Page>
        </Document >
    );



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
                                            <div>
                                                <>
                                                    <> <h1>Invoice Details</h1>
                                                        <div className='xs-6 p-2 flex-col'>
                                                            <p> <strong>Company</strong>: {invoice.as_customer?.company}</p>
                                                            <p><strong>Invoice Number</strong> : {invoice.invoice_no}</p>
                                                            <p><strong>Order Number</strong> :  {invoice.order_no}</p>
                                                            <p><strong>Invoice Date</strong> : {invoice.invoice_date}</p>
                                                            <p><strong>Terms</strong>:
                                                                <div className="mx-5">
                                                                    <div><b>Term</b> : {invoice.as_terms.term}</div>
                                                                    <div> <b>Days</b> : {invoice.as_terms.days}</div>
                                                                    <div><b>Due Date</b>:{invoice.due_date} </div>
                                                                </div>
                                                            </p>

                                                            <p><strong>Sales person</strong> : {invoice.as_sales_person?.name}</p>
                                                            <p><strong>Subject</strong>: {invoice.subject}</p>
                                                            <p><strong>Customer Notes</strong>: {invoice.customer_notes}</p>
                                                            <p><strong>ATC</strong>: {invoice.ATC}</p>
                                                            <p><strong>File</strong>: {invoice.file}</p>
                                                            <p><strong>Amount</strong>: {invoice.amount}</p>
                                                            <p><strong>Balance</strong> : {invoice.balance}</p>
                                                            <p><strong>Status</strong>: {invoice.status}</p>
                                                        </div></>
                                                    <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
                                                        {({ blob, url, loading, error }) =>
                                                            loading ? 'Loading document...' : <><Button>Download</Button></>
                                                        }
                                                    </PDFDownloadLink></>
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