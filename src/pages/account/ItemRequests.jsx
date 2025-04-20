import { useState, useEffect } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockItems from '../../components/giveaway/mockItems'

const ItemsRequest = () => {
    const { slug } = useParams();


    return (
        <>
            <motion.section className={`user-requests flex-1 p-7 pb-20 max-[466px]:px-5 ${location.pathname === '/dashboard/item-requests' ? '' : 'hidden'}`} initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10'>Item Requests</h2>
                <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-2'>
                    <div className={``}>
                        <table className="w-full h-full max-[577px]:hidden">
                            <thead className="border-b-2 border-gray-400 text-left">
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <th>Location</th>
                                    <th>Requests</th>
                                    <th>View Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockItems.slice(0, 10).map((item, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.state}, {item.country}</td>
                                        <td>{item.request || 0}</td>
                                        <td className='h-full my-auto'><Link to={`/dashboard/item-requests/${item.slug}`} className='inline-block my-auto border-2 border-[var(--p-color)] text-[var(--p-color)] rounded-lg shadow-lg py-[8px] pt-[9px] px-3 cursor-pointer leading-[.9rem]'>View requests</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="hidden max-[577px]:block">
                            {mockItems.slice(0, 10).map((item, index) => (
                                <div key={index} className="space-y-1 leading-[1.2rem] p-3 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                    <p><strong>#:</strong> {index + 1}</p>
                                    <p><strong>Item:</strong> {item.name}</p>
                                    <p><strong>Location:</strong> {item.state}, {item.country}</p>
                                    <p><strong>Requests:</strong> {item.request}</p>
                                    <Link to={`/dashboard/item-requests/${item.slug}`} className='inline-block my-auto border-2 border-[var(--p-color)] text-[var(--p-color)] rounded-lg shadow-lg py-[8px] pt-[9px] px-3 cursor-pointer leading-[.7rem]'>View requests</Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </motion.section>
            <Outlet />
        </>
    )
}

export default ItemsRequest;
