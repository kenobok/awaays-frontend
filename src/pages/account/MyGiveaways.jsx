import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockItems from '../../components/giveaway/mockItems'

const MyGiveaways = () => {


    return (
        <motion.section className='user-requests flex-1 p-7 pb-20 max-[1221px]:px-5' initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10'>My Giveaways</h2>
            <div className='requests-data border border-gray-300 p-10 px-8 max-[1221px]:px-5 min-[1081px]:px-0 min-[1222px]:px-10 rounded-2xl'>
                <div className="overflow-x-auto">
                    {/* Normal Table for Larger Screens */}
                    <table className="w-full h-full max-[1081px]:hidden">
                        <thead className="border-b-2 border-gray-400 text-left">
                            <tr>
                                <th>#</th>
                                <th>Purpose</th>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Instructions</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockItems.slice(0, 10).map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.purpose}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.instruction}</td>
                                    <td>{item.state}, {item.country}</td>
                                    <td>Pending</td>
                                    <td className="flex justify-evenly items-center h-full gap-x-2 max-[1221px]:flex-col max-[1221px]:gap-y-8 max-[1221px]:justify-center">
                                        <button className='px-3 pt-[3px] rounded-xl text-sm text-blue-500 cursor-pointer border-2 border-blue-500 shadow-sm'>Edit</button>
                                        <button className='px-3 pt-[3px] rounded-xl text-sm text-red-500 cursor-pointer border-2 border-red-400 shadow-sm'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Card Layout for Smaller Screens */}
                    <div className="table-small hidden max-[1081px]:block">
                        {mockItems.slice(0, 10).map((item, index) => (
                            <div key={index} className="space-y-1 leading-[1.2rem] py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                <p><strong>#:</strong> {index + 1}</p>
                                <p><strong>Purpose:</strong> {item.purpose}</p>
                                <p><strong>Item:</strong> {item.name}</p>
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Instructions:</strong> {item.instruction}</p>
                                <p><strong>Location:</strong> {item.state}, {item.country}</p>
                                <strong>Status:</strong> <p className={`inline-block font-semibold ${index % 2 === 0 ? 'text-green-500' : index % 3 === 0 ? 'text-blue-500' : 'text-red-500'}`}>
                                {index % 2 === 0 ? 'Accepted' : index % 3 === 0 ? 'Pending' : 'Rejected'}
                                </p>
                                <div className='flex mt-2'>
                                    <div className="flex-1 flex justify-center gap-x-5">
                                        <button className='px-3 pt-[3px] rounded-xl text-sm text-blue-500 cursor-pointer border-2 border-blue-500 shadow-sm'>Edit</button>
                                        <button className='px-3 pt-[3px] rounded-xl text-sm text-red-500 cursor-pointer border-2 border-red-400 shadow-sm'>Delete</button>
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

export default MyGiveaways;
