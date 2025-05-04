import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchRequests, fetchGiveaways } from "../../services/fetchServices";
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockItems from '../../components/giveaway/mockItems'

const MyRequests = () => {
    const { user } = useAuth();
    const [myRequests, setMyRequests] = useState([])

    const { data: requests, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['items-request'],
        queryFn: fetchRequests,
    });

    useEffect(() => {
        if (!requests || !user) return;
    
        const myItemRequests = requests.filter(req => req.user?.id === user.id);
        setMyRequests(myItemRequests);
    }, [requests, user]);

    useEffect(() => {
        console.log({ requests, myRequests });
    }, [requests, myRequests]);


    return (
        <motion.section className='user-requests flex-1 p-7 pb-20 max-[466px]:px-5' initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100 mb-10'>My Requests</h2>
            <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-5'>
                <div className="overflow-x-auto">
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
                            {myRequests.map((req, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                    <td>{index + 1}</td>
                                    <td>{req.item.name}</td>
                                    <td>{req.item.state}, {req.item.country}</td>
                                    <td>
                                        <span className={"px-3 py-[2px] rounded-full text-sm font-semibold " +
                                                (req.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700')
                                            }>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="flex justify-evenly items-center h-full gap-x-2">
                                        <button className='px-3 pt-[2px] rounded-xl text-sm text-green-600 cursor-pointer border border-green-600 shadow-sm'>Yes</button>
                                        <button className='px-3 pt-[2px] rounded-xl text-sm text-red-500 cursor-pointer border border-red-400 shadow-sm'>No</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="hidden max-[577px]:block">
                        {myRequests.map((req, index) => (
                            <div key={index} className="space-y-1 leading-[1.2rem] py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                <p><strong>#:</strong> {index + 1}</p>
                                <p><strong>Item:</strong> {req.item.name}</p>
                                <p><strong>Location:</strong> {req.item.state}, {req.item.country}</p>
                                <p><strong>Status: &nbsp;</strong> 
                                    <span className={"px-3 py-[2px] rounded-full text-sm font-semibold " +
                                            (req.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                            req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                            req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700')
                                        }>
                                        {req.status}
                                    </span>
                                </p>
                                <div className='flex items-center'>
                                    <strong>Collected?:</strong>
                                    <div className="ml-3 flex-1 flex justify-start items-center my-auto gap-x-5">
                                        <button className='px-3 pt-[3px] rounded-xl text-sm text-green-600 cursor-pointer border border-green-600 shadow-sm'>Yes</button>
                                        <button className='px-3 pt-[3px] rounded-xl text-sm text-red-500 cursor-pointer border border-red-400 shadow-sm'>No</button>
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
