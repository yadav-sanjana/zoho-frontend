import HelpCard from '@/utils/Card'
import React from 'react'
import { LiaSellsy } from "react-icons/lia";
import { FaHandHoldingMedical } from "react-icons/fa";
import { CgHello } from "react-icons/cg";
import { FaFileInvoice } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { CgInsights } from "react-icons/cg";
import { GrUserManager } from "react-icons/gr";

const Features = () => {
    return (
        <div>
            <div className="text-gray-700" id='features'>
                <div className="container mx-auto pt-10">
                    <p className='text-3xl font-semibold text-center justify-center flex'>Features</p>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={GrUserManager} title="Create Invoices" content="Create professional invoices without any hassle of re-entering data the second time." />
                        </div>
                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={LiaSellsy} title="Email & Track Invoices" content="Send invoice via email and get to know when the invoice was opened." />
                        </div>
                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={FaHandHoldingMedical} title="Recurring Invoices" content="Create recurring invoices & never miss your payments. Perfect for billing weekly, monthly or yearly." />
                        </div>
                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={CgHello} title="Client Management" content="Automatically track client-wise invoices, and payments, and maintain additional details." />
                        </div>
                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={FaFileInvoice} title="Add Users" content="Add multiple team members or users to manage your business and invoices." />
                        </div>

                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={FaCarAlt} title="Generate e-Invoices" content="Create invoice or bulk upload invoices and generate unique IRN and QR code for every single invoice." />
                        </div>

                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={MdOutlinePrecisionManufacturing} title="Insightful Reports" content="Reports help you follow compliance and give insight into business performance." />
                        </div>

                        <div className="w-full flex-row flex sm:w-1/2 lg:w-1/4 p-4 transition-transform duration-300 transform hover:-translate-y-1">
                            <HelpCard icon={CgInsights} title="Send WhatsApp Reminder" content="Simple way to send your invoices via WhatsApp and schedule them for future use." />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
