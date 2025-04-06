import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockItems from '../../components/giveaway/mockItems'

const MyRequests = () => {


    return (
        <motion.section className='user-requests flex-1 p-7 pb-20 max-[466px]:px-5' initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10'>My Requests</h2>
            <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-5'>
                <div className="overflow-x-auto">
                    {/* Normal Table for Larger Screens */}
                    <table className="w-full h-full max-[577px]:hidden">
                        <thead className="border-b-2 border-gray-400 text-left">
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Collected?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockItems.slice(0, 10).map((item, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.state}, {item.country}</td>
                                    <td className={`${index % 2 === 0 ? 'text-green-500' : index % 3 === 0 ? 'text-blue-500' : 'text-red-500'}`}>
                                        {index % 2 === 0 ? 'Accepted' : index % 3 === 0 ? 'Pending' : 'Rejected'}
                                    </td>
                                    <td className="flex justify-evenly items-center h-full gap-x-2">
                                        <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-green-600 shadow-sm'>Yes</button>
                                        <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-red-400 shadow-sm'>No</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="hidden max-[577px]:block">
                        {mockItems.slice(0, 10).map((item, index) => (
                            <div key={index} className="space-y-1 leading-[1.2rem] py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                <p><strong>#:</strong> {index + 1}</p>
                                <p><strong>Item:</strong> {item.name}</p>
                                <p><strong>Location:</strong> {item.state}, {item.country}</p>
                                <strong>Status:</strong> <p className={`inline-block font-semibold ${index % 2 === 0 ? 'text-green-500' : index % 3 === 0 ? 'text-blue-500' : 'text-red-500'}`}>
                                {index % 2 === 0 ? 'Accepted' : index % 3 === 0 ? 'Pending' : 'Rejected'}
                                </p>
                                <div className='flex items-center'>
                                    <strong>Collected?:</strong>
                                    <div className="ml-3 flex-1 flex justify-start items-center my-auto gap-x-5">
                                        <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-green-600 shadow-sm'>Yes</button>
                                        <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-red-400 shadow-sm'>No</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default MyRequests;
