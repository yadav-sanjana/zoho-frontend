import Image from 'next/image';
import React from 'react';

const GlobalBusinessSection: React.FC = () => {
    return (
        <section className="w-full table relative py-0 px-0 pb-50 bg-cyan-600">
            <div className="flex flex-wrap justify-center">
                <div className="map m-14">
                    <div className='flex-row items-center text-center'>
                        <div className='text-gray-800 text-center text-3xl mb-6'>
                            Build for Global Business
                        </div>
                      
                        <Image className='items-center justify-center text-center m-auto' src={'map.png'}
                        width={700}
                        height={100}
                        alt="map" />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default GlobalBusinessSection;
