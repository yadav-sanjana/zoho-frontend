import HelpCard from '@/utils/Card'
import React from 'react'
import { FaFileInvoice } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { MdEventRepeat } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaWhatsapp } from "react-icons/fa6";
import { CgInsights } from "react-icons/cg";

const Features = () => {
    return (
        <div>
            <div className="text-gray-700" id='features'>
                <div className=" mx-auto pt-10">
                    <p className='text-3xl font-semibold text-center justify-center flex'>Features</p>
                    <div className="flex flex-wrap justify-center max-w-screen-2xl items-center">
                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300  hover:-translate-y-1">
                            <HelpCard icon={FaFileInvoice} title="Create Invoices" content="Create professional invoices without any hassle of re-entering data the second time." />
                        </div>
                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
                            <HelpCard icon={MdAttachEmail} title="Email & Track Invoices" content="Send invoice via email and get to know when the invoice was opened." />
                        </div>
                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
                            <HelpCard icon={MdEventRepeat} title="Recurring Invoices" content="Create recurring invoices & never miss your payments. Perfect for billing weekly, monthly or yearly." />
                        </div>
                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
                            <HelpCard icon={MdManageAccounts} title="Client Management" content="Automatically track client-wise invoices, and payments, and maintain additional details." />
                        </div>
                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
                            <HelpCard icon={FaUserPlus} title="Add Users" content="Add multiple team members or users to manage your business and invoices." />
                        </div>

                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
                            <HelpCard icon={LiaFileInvoiceSolid} title="Generate e-Invoices" content="Create invoice or bulk upload invoices and generate unique IRN and QR code for every single invoice." />
                        </div>

                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
                            <HelpCard icon={CgInsights} title="Insightful Reports" content="Reports help you follow compliance and give insight into business performance." />
                        </div>

                        <div className="w-full flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 hover:-translate-y-1">
                            <HelpCard icon={FaWhatsapp} title="Send WhatsApp Reminder" content="Simple way to send your invoices via WhatsApp and schedule them for future use." />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
