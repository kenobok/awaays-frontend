import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchCollectedGiveaways } from '../../services/fetchServices'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HomeLeaderboard = () => {
    const { data: leaderboard, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['collected-items'],
        queryFn: fetchCollectedGiveaways,
        refetchOnWindowFocus: true,
        // refetchInterval: 1000 * 60 * 30,
    });


    const sortByDate = (data) => data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const topGivers = leaderboard && sortByDate(leaderboard?.filter(item => item.top_giver === true));


    return (
        <section className="flex-1">
            <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <div className='flex justify-between items-center px-5'>
                    <h3 className="text-[1.7rem] leading-0">Top Givers</h3>
                    <Link to="/community/leaderboard" className='inline-block text-[var(--p-color)] border border-2 border-[var(--p-color)] px-2 pt-[2px] mb-2 rounded-full'>See more</Link>
                </div>
                <div className="border-2 border-gray-300 overflow-hidden rounded-2xl shadow-lg">
                    <table className="text-white w-full">
                        <thead className="bg-gray-500">
                            <tr>
                                <th className="border border-gray-300 p-5">Name</th>
                                <th className="border border-gray-300 p-5">Giveaway Item</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-700'>
                            {topGivers?.length > 0 ? (
                                topGivers?.slice(0, 5).map((item, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                                        <td className="border border-gray-300 p-4 text-center leading-[1.2rem]">{item?.donor.full_name}</td>
                                        <td className="border border-gray-300 p-4 text-center leading-[1.2rem]">{item?.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    { 
                                    isLoading || isFetching ?
                                    <td className="border border-gray-300 p-3 text-center" colSpan="2"><FontAwesomeIcon icon='spinner' className='animate-spin text-[1.3rem] text-[var(--p-color)]' /></td>
                                    :
                                    <td className="border border-gray-300 p-3 text-center" colSpan="2">No data available</td>
                                    }
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
            </motion.div>
        </section>
    )
}


export default HomeLeaderboard
