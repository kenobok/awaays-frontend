import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import mockItems from '../../components/giveaway/mockItems'


const ViewItemRequests = () => {
    const { itemName, itemId } = useParams();
    const [requests, setRequests] = useState(null)

    useEffect(() => {
        const fetchedItem = mockItems.find(item => item.id == itemId)
        setRequests(fetchedItem)
    }, [itemId])

    return (
        <motion.section className={`user-requests flex-1 p-7 pb-20 max-[466px]:px-5`} initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10 leading-[1.5rem]'>Item Requests<br/><small className="text-[1rem] font-semibold">{itemName}</small></h2>
            <div className='requests-data border border-gray-300 p-10 px-8 rounded-2xl max-[577px]:px-5'>
                <div>
                    <table className="w-full h-full max-[577px]:hidden">
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
                            { requests.length>0 &&
                                requests.slice(0, 10).map((item, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.state}, {item.country}</td>
                                        <td>{item.description || 'None'}</td>
                                        <td className="flex justify-evenly items-center h-full gap-x-2 max-[1221px]:flex-col max-[1221px]:gap-y-8 max-[1221px]:justify-center">
                                            <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-blue-500 shadow-sm'>Accept</button>
                                            <button className='px-3 pt-[4px] rounded-xl text-sm text-white cursor-pointer bg-red-400 shadow-sm'>Decline</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {/* <div className="hidden max-[577px]:block">
                        {mockItems.slice(0, 10).map((item, index) => (
                            <div key={index} className="space-y-1 leading-[1.2rem] py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                <p><strong>#:</strong> {index + 1}</p>
                                <p><strong>Item:</strong> {item.name}</p>
                                <p><strong>Location:</strong> {item.state}, {item.country}</p>
                                <p><strong>Requests:</strong> {item.request}</p>
                                <Link to={`/dashboard/item-requests/${item.name}`} className='inline-block my-auto bg-[var(--p-color)] text-white rounded-lg shadow-lg py-[8px] pt-[9px] px-3 cursor-pointer leading-[.7rem]'>View requests</Link>
                            </div>
                        ))}
                    </div> */}
                </div>

            </div>
        </motion.section>
    )
}

export default ViewItemRequests
