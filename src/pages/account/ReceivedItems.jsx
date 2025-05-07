import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchRequests } from "../../services/fetchServices";
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader1 } from '../../components/utils/Preloader';


const ReceivedItems = () => {
    const { user } = useAuth();
    const [myReceivedItems, setMyReceivedItems] = useState([])

    const { data: requests, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['items-request'],
        queryFn: fetchRequests,
    });

    useEffect(() => {
        if (!requests || !user) return;
    
        const myItemReceived = requests.filter(req => req.user?.id === user.id && req.status === 'Accepted');
        setMyReceivedItems(myItemReceived);
    }, [requests, user]);


    return (
        <motion.section className='user-requests flex-1 p-7 pb-20 max-[466px]:px-5' initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100 mb-10'>Received Items</h2>
            <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-5'>
                <div className="overflow-x-auto">
                    { isLoading ? <div className='h-[65vh]'><Loader1/></div> :
                        myReceivedItems.length === 0 ? <p className="text-center">You have not received any item.</p>
                        :
                        <>
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
                                    {myReceivedItems.map((req, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{req.item.name}</td>
                                            <td>{req.item.state}, {req.item.country}</td>
                                            <td><span className={"px-3 py-[2px] rounded-full text-sm font-semibold bg-green-100 text-green-700"}>Collected</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="hidden max-[577px]:block">
                                {myReceivedItems.map((req, index) => (
                                    <div key={index} className="space-y-1 leading-[1.2rem] py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                        <p><strong>#:</strong> {index + 1}</p>
                                        <p><strong>Item:</strong> {req.item.name}</p>
                                        <p><strong>Location:</strong> {req.item.state}, {req.item.country}</p>
                                        <strong>Status:</strong> <span className={"px-3 py-[2px] rounded-full text-sm font-semibold bg-green-100 text-green-700"}>Collected</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </div>
            </div>
        </motion.section>
    )
}

export default ReceivedItems;
