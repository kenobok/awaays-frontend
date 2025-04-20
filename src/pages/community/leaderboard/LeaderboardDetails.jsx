import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { leaderboardLinks, leaderboard } from '/src/components/utils/UtilsData'


const LeaderboardDetails = () => {
    const location = useLocation();
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14);

    const sortByDate = (data) => data.sort((a, b) => new Date(b.date) - new Date(a.date));

    const topGivers = sortByDate(leaderboard.filter(item => item.top_giver === true));
    const lastWeek = sortByDate(leaderboard.filter(item => new Date(item.date) < oneWeekAgo && new Date(item.date) >= twoWeeksAgo));
    const allTime = sortByDate([...leaderboard]);

    let leaderboardData, title;

    if(location.pathname.includes('last-week')) {
        leaderboardData = lastWeek;
        title = 'Last Week'
    } else if(location.pathname.includes('all-time')) {
        leaderboardData = allTime;
        title = 'All Time'
    } else {
        leaderboardData = topGivers;
        title = 'Top Givers'
    }

    return (
        <div className=''>
            <h3 className='text-center text-[1.4rem] font-semibold mb-10 border-b border-gray-200'>{title} Leaderboard</h3>
            <table className="w-full max-[577px]:hidden overflow-y-auto">
                <thead className="border-b-2 border-gray-400 text-left">
                    <tr>
                        <th>#</th>
                        <th>Donor</th>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Receiver</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        leaderboardData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.donor || 'Anonymous'}</td>
                                <td>{item.item}</td>
                                <td>{item.location.state}, {item.location.country}</td>
                                <td>{item.receiver}</td>
                                <td className={`text-green-500`}>{item.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="hidden max-[577px]:block px-3">
                {leaderboardData.map((item, index) => (
                    <div key={index} className="space-y-1 leading-[1.2rem] px-4 py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                        <p><strong>#:</strong> {index + 1}</p>
                        <p><strong>Donor:</strong> {item.donor || 'Anonymous'}</p>
                        <p><strong>Item:</strong> {item.item}</p>
                        <p><strong>Location:</strong> {item.location.state}, {item.location.country}</p>
                        <p><strong>Receiver:</strong> {item.receiver}</p>
                        <strong>Status:</strong> <p className={`inline-block text-green-500`}>{item.status}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeaderboardDetails
