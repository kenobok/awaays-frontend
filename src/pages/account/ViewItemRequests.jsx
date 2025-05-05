import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import API from '/src/api/axiosInstance'
import { fetchRequests, fetchGiveawaysItemDetails } from "../../services/fetchServices";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader1 } from "../../components/utils/Preloader";
import { toast } from "react-toastify";


const useGiveawayItemDetails = (slug) => {
    return useQuery({
        queryKey: ['giveawayItemDetails', slug],
        queryFn: () => fetchGiveawaysItemDetails(slug), 
        enabled: !!slug, 
    });
};

const ViewItemRequests = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data, error, refetch: refresh } = useGiveawayItemDetails(slug);
    const [itemRequests, setItemRequests] = useState([]);
    const [itemName, setItemName] = useState('');
    const [waiting, setWaiting] = useState(null);

    const { data: requests, isLoading, refetch } = useQuery({
        queryKey: ['items-request'],
        queryFn: fetchRequests,
    });

    useEffect(() => {
        if (!requests || !slug) return;

        const filtered = requests.filter(req => req.item?.slug === slug);
        setItemRequests(filtered);
        if (filtered.length > 0) setItemName(filtered[0].item.name);
    }, [requests, slug]);

    useEffect(() => {
        const get_item = itemRequests.some((item) => (item.status == 'Accepted'))
        console.log(get_item)
        console.log(itemRequests)
    }, [itemRequests])

    const handleAccept = async (req_id) => {
        const receiver_id = itemRequests.find(request => request.id === req_id)
        setWaiting(req_id)
        try {
            await API.patch(`/item-requests/${req_id}/`, { 'status': 'Accepted' })
            await API.patch(`/giveaway-items/${data?.slug}/`, { 'status': 'Selected', 'receiver_id': receiver_id.user.id })
            toast.success('Request Accepted')
            refetch()
            refresh()
        } catch (error) {
            toast.error('An error occurred, try again')
        } finally {
            setWaiting(null)
        }
    }

    const handleDecline = async (req_id) => {
        setWaiting(req_id);
        try {
            await API.delete(`/item-requests/${req_id}/`)
            toast.success('Request declined')
            refetch()
            if (itemRequests.length === 1) navigate('/dashboard/item-requests')
        } catch (error) {
            toast.error('An error occurred, try again')
        } finally {
            setWaiting(null)
        }
    }


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
                                                        { req.status === 'Accepted' ?  
                                                            <button className='px-3 py-1 pt-[5px] rounded-xl text-sm text-blue-600 cursor-pointer border border-blue-600 shadow-sm disabled:text-blue-300 disabled:border-blue-300 disabled:cursor-not-allowed'>Contact receiver</button>
                                                        : 
                                                            <>
                                                                <button className='min-w-[4rem] text-sm text-green-600 cursor-pointer disabled:text-green-300 disabled:cursor-not-allowed' disabled={data?.status === 'Selected'} onClick={() => {handleAccept(req.id)}}>
                                                                    { waiting === req.id ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                                    :
                                                                    <>Accept <FontAwesomeIcon icon='circle-check' className="translate-y-[1px]" /></> }
                                                                </button>
                                                                <button className='min-w-[4rem] text-sm text-red-500 cursor-pointer disabled:text-red-300 disabled:cursor-not-allowed' disabled={data?.status === 'Selected'} onClick={() => {handleDecline(req.id)}}>
                                                                    { waiting === req.id ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                                    :
                                                                    <>Decline <FontAwesomeIcon icon='times' className="translate-y-[1px]" /></> }
                                                                </button>
                                                            </>
                                                        }
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
                                                { req.status === 'Accepted' ?  
                                                        <button className='px-3 py-1 pt-[5px] rounded-xl text-sm text-blue-600 cursor-pointer border border-blue-600 shadow-sm disabled:text-blue-300 disabled:border-blue-300 disabled:cursor-not-allowed'>Contact receiver</button>
                                                    :
                                                    <>
                                                        <button className='min-w-[4rem] text-sm text-green-600 cursor-pointer disabled:text-green-300 disabled:cursor-not-allowed' disabled={data?.status === 'Selected'} onClick={() => {handleAccept(req.id)}}>
                                                            { waiting === req.id ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                            :
                                                            <>Accept <FontAwesomeIcon icon='circle-check' className="translate-y-[1px]" /></> }
                                                        </button>
                                                        <button className='min-w-[4rem] text-sm text-red-500 cursor-pointer disabled:text-red-300 disabled:cursor-not-allowed' disabled={data?.status === 'Selected'} onClick={() => {handleDecline(req.id)}}>
                                                            { waiting === req.id ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                            :
                                                            <>Decline <FontAwesomeIcon icon='times' className="translate-y-[1px]" /></> }
                                                        </button>
                                                    </>
                                                }
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
