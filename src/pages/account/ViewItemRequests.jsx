import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchRequests } from "../../services/fetchServices";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader1 } from "../../components/utils/Preloader";


const ViewItemRequests = () => {
    const { slug } = useParams();
    const [itemRequests, setItemRequests] = useState([]);
    const [itemName, setItemName] = useState('');

    const { data: requests, isLoading } = useQuery({
        queryKey: ['items-request'],
        queryFn: fetchRequests,
    });

    useEffect(() => {
        if (!requests || !slug) return;

        const filtered = requests.filter(req => req.item?.slug === slug);
        setItemRequests(filtered);
        if (filtered.length > 0) setItemName(filtered[0].item.name);
    }, [requests, slug]);


    return (
        <motion.section className="user-requests flex-1 p-7 pb-20 max-[466px]:px-5" initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100 mb-10 leading-[1.5rem]'>{itemName}</h2> 
            <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-5'>
                { isLoading ?
                    <div className='h-[65vh]'><Loader1/></div>
                    :
                    <div className={``}>
                        {itemRequests.length === 0 ? (
                            <p className="text-center">No requests found for this item.</p>
                        ) : (
                            <>
                                <table className="w-full max-[577px]:hidden">
                                    <thead className="border-b-2 border-gray-400 text-left">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Location</th>
                                            <th>Reason</th>
                                            <th>Decide</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemRequests.map((req, index) => (
                                            <tr key={index} className="border-b border-gray-300">
                                                <td>{index + 1}</td>
                                                <td>{req.user?.full_name || 'N/A'}</td>
                                                <td>{req.user?.region}, {req.user?.country}</td>
                                                <td>{req.reason || '-----'}</td>
                                                <td className="">
                                                    <div className="flex flex-col justify-center items-center gap-y-3">
                                                        <button className='min-w-[4rem] text-sm text-green-600 cursor-pointer'>Accept <FontAwesomeIcon icon='circle-check' className="translate-y-[1px]" /></button>
                                                        <button className='min-w-[4rem] text-sm text-red-500 cursor-pointer'>Decline <FontAwesomeIcon icon='times' className="translate-y-[1px]" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="hidden max-[577px]:block">
                                    {itemRequests.map((req, index) => (
                                        <div key={index} className="space-y-1 leading-[1.2rem] p-3 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                            <p><strong>#:</strong> {index + 1}</p>
                                            <p><strong>Name:</strong> {req.user?.full_name }</p>
                                            <p><strong>Location:</strong> {req.user?.region}, {req.user?.country}</p>
                                            <p><strong>Reason:</strong> {req.reason || '-----'}</p>
                                            <div className='flex space-x-5 mt-2'>
                                                <button className='min-w-[4rem] text-sm text-green-600 cursor-pointer'>Accept <FontAwesomeIcon icon='circle-check' className="translate-y-[1px]" /></button>
                                                <button className='min-w-[4rem] text-sm text-red-500 cursor-pointer'>Decline <FontAwesomeIcon icon='times' className="translate-y-[1px]" /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                }
            </div>
        </motion.section>
    )
}

export default ViewItemRequests;
