import React from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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

const HTMLInvoiceTemplate = ({ invoice }) => (


    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>



                {invoice && (
                    <>
                        console.log({invoice});
                        <body>
                            <h2>Invoice</h2>

                            <table>
                                <tr>
                                    <th>Company:</th>
                                    <td>{invoice}</td>
                                </tr>
                                <tr>
                                    <th>Invoice Number:</th>
                                    <td>12345</td>
                                </tr>
                                <tr>
                                    <th>Order Number:</th>
                                    <td>54321</td>
                                </tr>
                                <tr>
                                    <th>Invoice Date:</th>
                                    <td>2023-10-16</td>
                                </tr>
                                <tr>
                                    <th>Terms:</th>
                                    <td>Days: 30</td>
                                </tr>
                                <tr>
                                    <th>Term:</th>
                                    <td>Net 30</td>
                                </tr>
                                <tr>
                                    <th>Sales person:</th>
                                    <td>Sales Person Name</td>
                                </tr>
                                <tr>
                                    <th>Subject:</th>
                                    <td>Invoice Subject</td>
                                </tr>
                                <tr>
                                    <th>Customer Notes:</th>
                                    <td>Customer's Notes or Comments</td>
                                </tr>
                                <tr>
                                    <th>ATC:</th>
                                    <td>ATC Code</td>
                                </tr>
                                <tr>
                                    <th>File:</th>
                                    <td>Attachment File Name</td>
                                </tr>
                                <tr>
                                    <th>Amount:</th>
                                    <td>Subtotal Amount</td>
                                </tr>
                                <tr>
                                    <th>Balance:</th>
                                    <td>Balance Amount</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td>Payment Status</td>
                                </tr>
                            </table>

                            <h3>Item List</h3>

                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Cart ID</th>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>1</td>
                                    <td>Item Name</td>
                                    <td>1</td>
                                    <td>$0.00</td>
                                    <td>$0.00</td>
                                </tr>

                            </table>
                        </body>
                    </>
                )}
            </View>
        </Page>
    </Document >

)


export default HTMLInvoiceTemplate;
