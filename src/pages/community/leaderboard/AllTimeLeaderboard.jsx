import { useParams } from 'react-router-dom'
import mockItems from '/src/components/giveaway/mockItems'


const AllTimeLeaderboard = () => {

    return (
        <div className=''>
            <h3 className='text-center text-[1.4rem] font-semibold mb-10 border-b border-gray-200'>All Time Leaderboard</h3>
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
                    {mockItems.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.donor || 'Anonymous'}</td>
                            <td>{item.name}</td>
                            <td>{item.state}, {item.country}</td>
                            <td>{item.donor}</td>
                            <td className={`text-green-500`}>Collected</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="hidden max-[577px]:block px-3">
                {mockItems.map((item, index) => (
                    <div key={index} className="space-y-1 leading-[1.2rem] px-4 py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                        <p><strong>#:</strong> {index + 1}</p>
                        <p><strong>Donor:</strong> {item.donor || 'Anonymous'}</p>
                        <p><strong>Item:</strong> {item.name}</p>
                        <p><strong>Location:</strong> {item.state}, {item.country}</p>
                        <p><strong>Receiver:</strong> {item.donor || 'Anonymous'}</p>
                        <strong>Status:</strong> <p className={`inline-block text-green-500`}>Collected</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllTimeLeaderboard
