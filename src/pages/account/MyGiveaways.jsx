import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../../api/axiosInstance';
import { fetchMyGiveaways } from "../../services/fetchServices";
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import { Loader1 } from '../../components/utils/Preloader';
import { SomethingWentWrong } from '../../components/utils/SomethingWentWrong';


const MyGiveaways = () => {
    const { data: itemsData, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ['my-giveaway-items'],
        queryFn: fetchMyGiveaways,
    });
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        if (itemsData) {
            setItems(itemsData);
        }
    }, [itemsData]);


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
                setItems(prevItems => prevItems.filter(item => item.slug !== slug));
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
        <motion.section className='user-requests flex-1 p-7 pb-20 max-[1221px]:px-5 max-[941px]:px-0' initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100 min-[941px]:mb-10'>My Giveaways</h2>
            {
                isError ?
                        <SomethingWentWrong onHandleRefresh={refetch} isError={isError} isFetching={isFetching} />
                    :
                    <div className='requests-data min-[941px]:border border-gray-300 p-10 px-8 max-[1221px]:px-5 min-[1081px]:px-0 min-[1222px]:px-10 max-[941px]:px-0 max-[941px]:py-5 rounded-2xl'>
                        {
                            isLoading ? <div className='h-[75vh]'><Loader1 /></div> :
                            items?.length === 0 ? 
                            <div className='text-center space-y-2'>
                                <p className="text-md font-semibold">No Giveaway item available.</p> 
                                <p className='mb-5'>Click on the button below to give item(s)</p>
                                <Link to='/give-item' className='border-2 border-[var(--p-color)] rounded-2xl py-2 px-3 text-[var(--p-color)] hover:bg-[var(--p-color)] hover:text-white'>Give Item</Link>
                            </div>
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
                                        {items?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.purpose}</td>
                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.instruction}</td>
                                                <td>{item.state}, {item.country}</td>
                                                <td>
                                                    <span className={"px-3 py-[2px] rounded-full text-sm font-semibold " +
                                                            (item.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                            item.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                            item.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-gray-100 text-gray-700')
                                                        }>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex flex-col justify-center items-center gap-y-3">
                                                        {item.status == 'Collected' || item.status == 'Selected' ?
                                                            <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-green-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}?action=repost`)}>Repost <FontAwesomeIcon icon='list' /></button>
                                                            :
                                                            <>
                                                                <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-blue-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}`)}>Edit <FontAwesomeIcon icon='edit' /></button>
                                                                <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-red-500 cursor-pointer leading-[.9rem]' onClick={() => handleDelete(item.slug)}>
                                                                    {deleting === item.slug ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                                        :
                                                                        <>Delete <FontAwesomeIcon icon='trash-alt' /></>}
                                                                </button>
                                                            </>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Card Layout for Smaller Screens */}
                                <div className="table-small hidden max-[1081px]:block">
                                    {items?.map((item, index) => (
                                        <div key={index} className="space-y-1 leading-[1.2rem] py-4 px-5 mb-5 border-b border-gray-200 rounded-lg shadow-lg">
                                            <p><strong>#:</strong> {index + 1}</p>
                                            <p><strong>Purpose:</strong> {item.purpose}</p>
                                            <p><strong>Item:</strong> {item.name}</p>
                                            <p><strong>Description:</strong> {item.description}</p>
                                            <p><strong>Instructions:</strong> {item.instruction}</p>
                                            <p><strong>Location:</strong> {item.state}, {item.country}</p>
                                            <p><strong>Status: &nbsp;</strong> 
                                                <span className={"px-3 py-[2px] rounded-full text-sm font-semibold " +
                                                        (item.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                        item.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        item.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700')
                                                    }>
                                                    {item.status}
                                                </span>
                                            </p>
                                            <div className='flex mt-2'>
                                                <div className="flex-1 flex justify-start gap-x-5">
                                                    {item.status == 'Collected' || item.status == 'Selected' ?
                                                        <button className='ml-2 min-w-[4rem] pt-[3px] rounded-xl text-sm text-green-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}?action=repost`)}>Repost <FontAwesomeIcon icon='list' /></button>
                                                        :
                                                        <>
                                                            <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-blue-500 cursor-pointer' onClick={() => navigate(`/give-item/${item.slug}`)}>Edit <FontAwesomeIcon icon='edit' /></button>
                                                            <button className='min-w-[4rem] pt-[3px] rounded-xl text-sm text-red-500 cursor-pointer leading-[.9rem]' onClick={() => handleDelete(item.slug)}>
                                                                {deleting === item.slug ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin' />
                                                                    :
                                                                    <>Delete <FontAwesomeIcon icon='trash-alt' /></>}
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
