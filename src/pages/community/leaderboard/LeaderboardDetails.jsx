import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchCollectedGiveaways } from '../../../services/fetchServices'


const LeaderboardDetails = () => {
    const location = useLocation();
    const [leaderboard, setLeaderboard] = useState(null)
    let title;

    const { data: items, isLoading } = useQuery({
        queryKey: ['collected-items'],
        queryFn: fetchCollectedGiveaways,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60 * 30,
    });

    // useEffect(() => {
    //     console.log(items)
    //     console.log(items?.map((itm) => itm?.name))
    //     console.log(items?.map((itm) => itm?.donor))
    // }, [items])

    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14);

    const sortByDate = (items) => items?.sort((a, b) => new Date(b.date) - new Date(a.date));

    const topGivers = items && sortByDate(items?.filter(item => item?.top_giver === true));
    const lastWeek = items && sortByDate(
        items.filter(item => { const created = new Date(item.created_at); 
        return created >= twoWeeksAgo && created < oneWeekAgo })
    );    
    const allTime = items && sortByDate([...items]);

    useEffect(() => {
        if (location.pathname.includes('last-week')) {
            setLeaderboard(lastWeek);
            title = 'Last Week'
        } else if (location.pathname.includes('all-time')) {
            setLeaderboard(allTime);
            title = 'All Time'
        } else {
            setLeaderboard(topGivers);
            title = 'Top Givers'
        }
    }, [location.pathname, items])

    return (
        <div className=''>
            <h3 className='text-center text-[1.4rem] font-semibold mb-10 border-b border-gray-200'>{title} Leaderboard</h3>
            <table className="w-full max-[577px]:hidden overflow-y-auto">
                <thead className="border-b-2 border-gray-400 text-left">
                    <tr>
                        <th>Donor</th>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Receiver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leaderboard?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.donor?.full_name || 'Anonymous'}</td>
                                <td>{item.name}</td>
                                <td>{item.state}, {item.country}</td>
                                <td>{item?.receiver?.full_name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="hidden max-[577px]:block px-3">
                {leaderboard?.map((item, index) => (
                    <div key={index} className="space-y-1 leading-[1.2rem] px-4 py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                        <p><strong>Donor:</strong> {item.donor?.full_name || 'Anonymous'}</p>
                        <p><strong>Item:</strong> {item.name}</p>
                        <p><strong>Location:</strong> {item.state}, {item.country}</p>
                        <p><strong>Receiver:</strong> {item.receiver?.full_name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeaderboardDetails
