import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchRequests, fetchMyGiveaways } from "../../services/fetchServices";
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader1 } from '../../components/utils/Preloader';

const ItemsRequest = () => {
    const { data: requests, isLoading, /*isError, error, refetch*/ } = useQuery({
        queryKey: ['items-request'],
        queryFn: fetchRequests,
    });
    
    const { data: items, isLoading: loadingItems, /*isError, error, refetch*/ } = useQuery({
        queryKey: ['giveaway-items'],
        queryFn: fetchMyGiveaways,
    });
    const [itemRequests, setItemRequests] = useState([])

    useEffect(() => {
        if (!requests || !items) return;

        const donorItemIds = items.map(item => item.id);
        const grouped = {};
    
        requests.forEach(req => {
            const item = req.item;
            const requester = req.user;
    
            if (!item || !requester) return;
    
            const isMyItem = donorItemIds.includes(item.id);
            const isRequesterMe = requester.id === item.donor?.id;
    
            if (isMyItem && !isRequesterMe) {
                if (!grouped[item.id]) {
                    grouped[item.id] = { item: item, requests: [] };
                }
                grouped[item.id].requests.push(req);
            }
        });
    
        const groupedArray = Object.values(grouped);
        setItemRequests(groupedArray);
    }, [requests, items]);


    return (
        <>
            <motion.section className={`user-requests flex-1 p-7 pb-20 max-[466px]:px-5 ${location.pathname === '/dashboard/item-requests' ? '' : 'hidden'}`} initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10'>Item Requests</h2>
                <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-2'>
                    { isLoading || loadingItems ?
                        <div className='h-[65vh]'><Loader1/></div>
                    :
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
                                    {itemRequests.map((req, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td>{index + 1}</td>
                                            <td>{req.item.name}</td>
                                            <td>{req.item.state}, {req.item.country}</td>
                                            <td>{req.item.request_count || 0}</td>
                                            <td className='h-full my-auto'><Link to={`/dashboard/item-requests/${req.item.slug}`} className='inline-block my-auto border border-[var(--p-color)] text-[var(--p-color)] rounded-lg shadow-lg py-[8px] pt-[9px] px-3 cursor-pointer leading-[.9rem]'>View requests</Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="hidden max-[577px]:block">
                                {itemRequests.map((req, index) => (
                                    <div key={index} className="space-y-1 leading-[1.2rem] p-3 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                        <p><strong>#:</strong> {index + 1}</p>
                                        <p><strong>Item:</strong> {req.item.name}</p>
                                        <p><strong>Location:</strong> {req.item.state}, {req.item.country}</p>
                                        <p><strong>Requests:</strong> {req.item.request_count}</p>
                                        <Link to={`/dashboard/item-requests/${req.item.slug}`} className='inline-block my-auto mt-2 border border-[var(--p-color)] text-[var(--p-color)] text-sm rounded-lg shadow-lg py-[8px] pt-[9px] px-3 cursor-pointer leading-[.7rem]'>View requests</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </motion.section>
            <Outlet />
        </>
    )
}

export default ItemsRequest;
