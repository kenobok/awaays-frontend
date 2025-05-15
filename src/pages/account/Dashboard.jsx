import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMyGiveaways, fetchRequests, fetchConversations, fetchForums, fetchMyGroups } from '../../services/fetchServices';
import { useAuth } from '../../context/AuthContext';
import { SomethingWentWrong } from '../../components/utils/SomethingWentWrong';


const Dashboard = () => {
    const { user } = useAuth();
    const [totalGiveaway, setTotalGiveaway] = useState(0)
    const [totalRequest, setTotalRequest] = useState(0)
    const [totalRecieved, setTotalReceived] = useState(0)
    const [unread_msg, setUnreadMsg] = useState(null)
    const queryClient = useQueryClient();

    const { data: items, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ['my-giveaway-items'],
        queryFn: fetchMyGiveaways,
    });

    const { data: requests, isLoading: loading } = useQuery({
        queryKey: ['items-request'],
        queryFn: fetchRequests,
    });

    const { data: conversations } = useQuery({
        queryKey: ['fetch-conversations'],
        queryFn: fetchConversations,
    });

    useEffect(() => {
        if (items) {
            setTotalGiveaway(items?.length || 0);
            setTotalReceived(items?.filter(item => item?.receiver?.id === user?.id).length || 0);
        }

        if (requests && Array.isArray(requests)) {
            setTotalRequest(requests?.filter(req => req?.user?.id === user?.id).length || 0);
        }
    }, [items, user, requests]);

    useEffect(() => {
        const unread_msg = conversations?.some((conv) => conv?.messages?.some((msg) => msg.read === false && msg.receiver === user?.id));
        setUnreadMsg(unread_msg)
    }, [conversations])

    useEffect(() => {
        const prefetchData = async () => {
            try {
                await queryClient.prefetchQuery({
                    queryKey: ['forums-list'],
                    queryFn: fetchForums,
                    staleTime: 1000 * 60 * 60,
                });

                await queryClient.prefetchQuery({
                    queryKey: ['my-groups'],
                    queryFn: fetchMyGroups,
                    staleTime: 1000 * 60 * 60,
                });
            } catch (error) {
                console.error('Prefetching failed:', error);
            }
        };
        const handle = window.requestIdleCallback
            ? requestIdleCallback(() => {
                prefetchData();
            })
            : setTimeout(() => {
                prefetchData();
            }, 5000);
            
        return () => {
            if (window.cancelIdleCallback && typeof handle === 'number') {
                cancelIdleCallback(handle);
            } else {
                clearTimeout(handle);
            }
        };
    }, []);


    return (
        <motion.section className={`space-y-7 flex-1 p-7 pb-20 max-[941px]:px-5 ${location.pathname === '/dashboard' ? '' : 'hidden'}`} initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100'>Dashboard</h2>
            {isError ?
                <SomethingWentWrong onHandleRefresh={refetch} isError={isError} isFetching={isFetching} />
                :
                <>
                    <div className='dash-overview'>
                        <div className='grid grid-cols-3 max-[577px]:grid-cols-1 gap-x-5 max-[577px]:gap-y-5'>
                            <div className='bg-green-500 p-5 h-[10rem] text-center text-white rounded-xl shadow-lg'>
                                <FontAwesomeIcon icon="people-carry" className="text-[2rem]" />
                                <h4 className='text-lg font-bold text-[1.3rem] py-2 leading-[1.2rem]'>Total Giveaway</h4>
                                <p className='text-gray-700 text-[2rem] font-bold'>
                                    {isLoading ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin text-[1.3rem]' /> : totalGiveaway}
                                </p>
                            </div>
                            <div className='bg-orange-400 text-white p-5 h-[10rem] text-center rounded-xl shadow-lg'>
                                <FontAwesomeIcon icon="hand-holding" className="text-[2rem]" />
                                <h4 className='text-lg font-bold text-[1.3rem] py-2 leading-[1.2rem]'>Total Requests</h4>
                                <p className='text-gray-700 text-[2rem] font-bold'>
                                    {loading ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin text-[1.3rem]' /> : totalRequest}
                                </p>
                            </div>
                            <div className='bg-blue-400 p-5 h-[10rem] text-center text-white rounded-xl shadow-lg'>
                                <FontAwesomeIcon icon="boxes" className="text-[2rem]" />
                                <h4 className='text-lg font-bold text-[1.3rem] py-2 leading-[1.2rem]'>Total Received</h4>
                                <p className='text-gray-700 text-[2rem] font-bold'>
                                    {isLoading ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin text-[1.3rem]' /> : totalRecieved}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-evenly flex-wrap gap-5'>
                        <div className='border border-gray-300 rounded-xl p-3 shadow-lg w-[17rem] h-[20rem] overflow-x-hidden overflow-y-auto'>
                            <h4 className='text-lg py-1 bg-[var(--bg-color)] font-bold text-center border-b border-b-gray-300'>Notifications <FontAwesomeIcon icon="bell" className='text-orange-500 animate-bounce' /></h4>
                            { isLoading ? <div className='flex justify-center mt-5'><FontAwesomeIcon icon='spinner' className='animate-spin' /></div> :
                                <ul className='space-y-3 mt-4 list-none px-2'>
                                    { unread_msg && <li className='leading-[1.1rem]'> <FontAwesomeIcon icon="envelope" className='text-blue-500 animate-pulse' />&nbsp; You have a new message.</li> }
                                    {/* <li className='leading-[1.1rem]'>You have 2 new requests.</li>
                                    <li className='leading-[1.1rem]'>You have 1 new message. You have 1 new message.</li>
                                    <li className='leading-[1.1rem]'>You have 2 new requests.</li>
                                    <li className='leading-[1.1rem]'>You have 2 new requests.</li>
                                    <li className='leading-[1.1rem]'>You have 1 new message. You have 1 new message.</li> */}
                                </ul>
                            }
                        </div>
                        <div className='flex-1 min-w-[17rem] border border-gray-300 rounded-xl p-3 shadow-lg h-[20rem] overflow-x-hidden overflow-y-auto'>
                            <h4 className='text-lg py-1 font-bold text-center border-b border-b-gray-300'>Forum & Groups <FontAwesomeIcon icon="users" /></h4>
                            <ul className='space-y-3 mt-4 list-disc px-7'>
                                {/* <li className='leading-[1.1rem]'>You have 2 new requests.</li>
                                <li className='leading-[1.1rem]'>You have 2 new requests.</li>
                                <li className='leading-[1.1rem]'>You have 1 new message. You have 1 new message.</li> */}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </motion.section>
    )
}

export default Dashboard

