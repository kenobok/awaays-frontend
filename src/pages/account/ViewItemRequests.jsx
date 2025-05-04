import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchRequests } from "../../services/fetchServices";
import { motion } from 'framer-motion';

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
            <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10 leading-[1.5rem]'>
                {itemName}
            </h2> 
            <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-5'>
                {itemRequests.length === 0 ? (
                    <p className="text-center">No requests found for this item.</p>
                ) : (
                    <div className="overflow-x-auto">
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
                                        <td>{req.user?.first_name || 'N/A'}</td>
                                        <td>{req.user?.state}, {req.user?.country}</td>
                                        <td>{req.reason || 'None'}</td>
                                        <td className="flex justify-evenly items-center h-full gap-x-2 max-[1221px]:flex-col max-[1221px]:gap-y-8 max-[1221px]:justify-center">
                                            <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-blue-500 shadow-sm'>Accept</button>
                                            <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-red-400 shadow-sm'>Decline</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.section>
    )
}

export default ViewItemRequests;
