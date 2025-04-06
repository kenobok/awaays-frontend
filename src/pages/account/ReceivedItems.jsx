import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockItems from '../../components/giveaway/mockItems'

const ReceivedItems = () => {


    return (
        <motion.section className='user-requests flex-1 p-7 pb-20 max-[466px]:px-5' initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10'>Received Items</h2>
            <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-5'>
                <div className="overflow-x-auto">
                    <table className="w-full h-full max-[577px]:hidden">
                        <thead className="border-b-2 border-gray-400 text-left">
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockItems.slice(0, 10).map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.state}, {item.country}</td>
                                    <td className={`text-green-500`}>Collected</td>
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
                                <strong>Status:</strong> <p className={`inline-block text-green-500`}>Collected</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default ReceivedItems;
