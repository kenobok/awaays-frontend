import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../../api/axiosInstance';
import { fetchMyGiveaways } from "../../services/fetchServices";
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import { Loader1 } from '../../components/utils/Preloader';
import no_network from '../../assets/images/no-network.png'


const MyGiveaways = () => {
    const { data: items, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['my-giveaway-items'],
        queryFn: fetchMyGiveaways,
    });
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(null)


    const handleDelete = async (slug) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Delete',
            reverseButtons: true,
            customClass: {
                confirmButton: 'my-confirm-btn',
                cancelButton: 'my-cancel-btn',
            }
        });
    
        if (result.isConfirmed) {
            setDeleting(slug)
            try {
                await API.delete(`/giveaway-items/${slug}/`);
                toast.success('Item deleted successfully');
                refetch()
            } catch (error) {
                console.error(error);
                toast.error('An error occurred, try again...');
            } finally {
                setDeleting(null)
            }
        }
    };


    return (
        <motion.section className='user-requests flex-1 p-7 pb-20 max-[1221px]:px-5' initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10'>My Giveaways</h2>
            {
                isError ? 
                <div className="flex flex-col justify-center items-center text-center w-full h-[75vh]">
                        <img src={no_network} alt="Connection error" className="w-[15rem]" />
                        <p className="text-orange-500 text-[1rem] font-semibold mb-3">Check your internet connection</p>
                        <button onClick={() => refetch()} className="p-[5px] px-5 border-2 border-[var(--p-color)] text-[var(--p-color)] rounded-xl cursor-pointer">Retry</button>
                </div>
                :
                <div className='requests-data border border-gray-300 p-10 px-8 max-[1221px]:px-5 min-[1081px]:px-0 min-[1222px]:px-10 rounded-2xl'>
                    { 
                        isLoading ? <div className='h-[75vh]'><Loader1 /></div>
                        :
                        <div className="overflow-x-auto">
                            <table className="w-full h-full max-[1081px]:hidden">
                                <thead className="border-b-2 border-gray-400 text-left">
                                    <tr>
                                        <th>#</th>
                                        <th>Purpose</th>
                                        <th>Item</th>
                                        <th>Description</th>
                                        <th>Instructions</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.purpose}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.instruction}</td>
                                            <td>{item.state}, {item.country}</td>
                                            <td>{item.status}</td>
                                            <td className="flex flex-col justify-center items-center h-full gap-x-2 gap-y-3">
                                                { item.status == 'Collected' ? 
                                                    <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-green-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}`)}>Repost <FontAwesomeIcon icon='list' /></button>
                                                    :
                                                    <>
                                                        <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-blue-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}`)}>Edit <FontAwesomeIcon icon='edit' /></button>
                                                        <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-red-500 cursor-pointer leading-[.9rem]' onClick={() => handleDelete(item.slug)}>
                                                            { deleting === item.slug ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                            : 
                                                            <>Delete <FontAwesomeIcon icon='trash-alt' /></> }
                                                        </button>
                                                    </>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Card Layout for Smaller Screens */}
                            <div className="table-small hidden max-[1081px]:block">
                                {items.map((item, index) => (
                                    <div key={index} className="space-y-1 leading-[1.2rem] py-4 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                        <p><strong>#:</strong> {index + 1}</p>
                                        <p><strong>Purpose:</strong> {item.purpose}</p>
                                        <p><strong>Item:</strong> {item.name}</p>
                                        <p><strong>Description:</strong> {item.description}</p>
                                        <p><strong>Instructions:</strong> {item.instruction}</p>
                                        <p><strong>Location:</strong> {item.state}, {item.country}</p>
                                        <p><strong>Status:</strong> {item.status}</p>
                                        <div className='flex mt-2'>
                                            <div className="flex-1 flex justify-start gap-x-5">
                                                { item.status == 'Collected' ? 
                                                    <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-green-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}`)}>Repost <FontAwesomeIcon icon='list' /></button>
                                                    :
                                                    <>
                                                        <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-blue-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}`)}>Edit <FontAwesomeIcon icon='edit' /></button>
                                                        <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-red-500 cursor-pointer leading-[.9rem]' onClick={() => handleDelete(item.slug)}>
                                                            { deleting === item.slug  ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                            : 
                                                            <>Delete <FontAwesomeIcon icon='trash-alt' /></> }
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            }
        </motion.section>
    )
}

export default MyGiveaways;
