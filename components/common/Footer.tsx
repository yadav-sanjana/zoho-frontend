
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="bg-gray-800 min-w-full rounded-lg shadow">
      <div className={`mx-auto flex flex-col gap-8 max-w-screen-3xl p-4`}>


        <div className="flex flex-col">

          <div className="flex items-center justify-between flex-wrap gap-4 ">
            <div className="font-extrabold text-[24px] text-white-700 flex flex-col text-center justify-center ">
              <div className="flex flex-col gap-4  text-gray-300">
                <div className="flex text-center justify-center">
                  Invoicer
                  {/* <img
                    src='bl.png'
                    alt="headset"
                    width={100}
                    height={100}
                  /> */}
                </div>
                {/* <div className="flex gap-4">
                  {socials.map((socialMedia) => (
                    <socialMedia.url
                      key={socialMedia.name}
                      src={socialMedia.url}
                      alt={socialMedia.name}
                      className="w-[24px] h-[24px] object-contain cursor-pointer"
                    />
                  ))}
                </div> */}
                <div className="text-sm font-semibold">
                  Follow & Stay connected
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-wrap">
              <ul className='flex  text-gray-400'>
                <a href='#'><li className='p-2 space-x-1'>Home  |</li></a>
                <a href='#'><li className='p-2 space-x-1'>Features  |</li></a>
                <a href='#'><li className='p-2 space-x-1'>Pricing |</li></a>
                <a href='#'><li className='p-2 space-x-1'>Contact Us</li></a>
              </ul>

            </div>

            <div className="gap-4 text-gray-400 flex flex-col">
              <div className="flex flex-col gap-4 text-wrap text-sm">
                <span>
                  <div className="flex flex-row gap-2">
                    <div className="flex items-center align-middle">
                      <FaPhoneAlt />
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col">
                        <span><a href="tel:+91 70420 93450">+91 1111111111</a></span>
                      </div>
                    </div>

                  </div>
                </span>
              </div>
              <div>
                <span>
                  <div className="flex flex-row gap-2">
                    <div className="flex items-center align-middle">
                      <MdEmail />
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col">
                        <span><a href="mailto:hysusdigital@gmail.com">hysusdigital@gmail.com</a></span>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
              <div>
                <span>
                  <div className="flex flex-row gap-2">
                    <div className="flex items-center align-middle">
                      <IoLocation />
                    </div>
                    <div className="w-full">
                      <div className="text-wrap w-60">
                        <span><a href="https://www.google.com/maps/place" className="text-wrap">
                          Gurugram, Haryana 122022</a></span>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="font-normal text-[14px] text-gray-200 opacity-50 text-center">
          Copyright  ©{new Date().getFullYear()}  - Hysus Digital . All rights reserved.
        </p>
      </div>
    </div>

  )
}

export default Footer
