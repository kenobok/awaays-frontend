import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


const leaderboardData = [
    { name: "John Doe", giveawayItem: "Laptop" },
    { name: "Alice Johnson", giveawayItem: "Smartphone" },
    { name: "Michael Brown", giveawayItem: "Bicycle" },
    { name: "Emily Davis", giveawayItem: "Backpack" },
    { name: "James Wilson", giveawayItem: "Gaming Console" },
    { name: "Sophia Martinez", giveawayItem: "Wristwatch" },
    { name: "William Anderson", giveawayItem: "Tablet" },
    { name: "Olivia Thomas", giveawayItem: "Headphones" },
    { name: "Ethan White", giveawayItem: "Camera" },
    { name: "Emma Roberts", giveawayItem: "Gift Card" }
];


const HomeLeaderboard = () => {

    return (
        <section className="flex-1">
            <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <div className='flex justify-between items-center px-5'>
                    <h3 className="text-[1.7rem] leading-0">Leaderboard</h3>
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
                            {leaderboardData.length > 0 ? (
                                leaderboardData.slice(0, 5).map((data, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                                        <td className="border border-gray-300 p-4 text-center leading-[1.2rem]">{data.name}</td>
                                        <td className="border border-gray-300 p-4 text-center leading-[1.2rem]">{data.giveawayItem}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-gray-300 p-3 text-center" colSpan="2">No data available</td>
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
