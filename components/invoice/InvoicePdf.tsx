import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { InvoiceDetail } from './InvoiceDetail';
import { Button } from '../ui/button';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

// Define your PDF content
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Invoice Details</Text>
                <div>
                    <h2>Invoice for Acme Inc.</h2>
                    <p>Date: September 30, 2023</p>

                    <h3>Bill To:</h3>
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>City, State, ZIP</p>
                    <p>Email: john.doe@example.com</p>

                    <h3>Invoice Items:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Product A</td>
                                <td>2</td>
                                <td>$50.00</td>
                                <td>$100.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>Subtotal: $100.00</p>
                    <p>Tax (10%): $10.00</p>
                    <p>Total Amount Due: $110.00</p>

                    <h3>Payment Instructions:</h3>
                    <p>Please make checks payable to Acme Inc.</p>
                    <p>Payment is due within 30 days of the invoice date.</p>

                    <h4>Thank you for your business!</h4>
                    <p>Contact us at support@acme.com for any inquiries.</p>
                </div>

            </View>
        </Page>
    </Document>
);

export const InvoicePdf = ({ clickButton, invoice_detail }) => {
    return (
        <div>
            <> <h1>Invoice Details</h1>
                <> {invoice_detail}</>
                <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : <><Button>Download</Button></>
                    }
                </PDFDownloadLink></>
        </div>
    );
};

