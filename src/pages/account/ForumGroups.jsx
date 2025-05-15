import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '/src/context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { fetchForums, fetchMyGroups } from '../../services/fetchServices'
import { motion } from 'framer-motion'
import API from '/src/api/axiosInstance'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loader1 } from '../../components/utils/Preloader'


const ForumGroups = () => {
    const { user } = useAuth();
    const [groups, setGroups] = useState([])
    const [deleting, setDeleting] = useState(null)

    const { data: forums, isLoading } = useQuery({
        queryKey: ['forums-list'],
        queryFn: fetchForums
    })

    const { data: groupsData, isLoading: loading, refetch, isFetching } = useQuery({
        queryKey: ['my-groups'],
        queryFn: fetchMyGroups
    })

    useEffect(() => {
        if (groupsData) {
            setGroups(groupsData)
        }
    }, [groupsData])
    
    const handleDelete = async (groupId) => {
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
            setDeleting(groupId)
            try {
                await API.delete(`/community/groups/${groupId}/`);
                toast.success('Group deleted successfully');
                setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
                refetch()
            } catch (error) {
                console.log(error)
                toast.error('An error occurred, try again...');
            } finally {
                setDeleting(null)
            }
        }
    };


    return (
        <motion.section className={`flex-1 p-7 pb-20 max-[941px]:px-5`} initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100 mb-5'>Forums & Groups</h2>
            <div className='space-y-7 flex max-[851px]:flex-col justify-evenly flex-wrap gap-5'>
                <div className={`w-[16rem] max-[851px]:w-full border border-gray-300 rounded-xl p-2 py-3 shadow-lg`}>
                    <h3 className='text-center font-bold text-[1.25rem] border-b border-gray-300'>Forums</h3>
                    <div className='relative space-y-3 w-full mt-4 pb-2 overflow-y-auto overflow-x-hidden'>
                        {
                            isLoading ? <div className='h-[28rem]'><Loader1 /></div> :
                            forums?.length > 0 && forums?.map((forum, index) => (
                                <Link to={`/community/forums/${forum?.slug}`} className={`inline-block p-2 py-[7px] rounded-md cursor-pointer hover:text-[var(--p-color)] w-full ${index % 2 == 0 ? 'bg-gray-100' : ''}`} key={index}>
                                    <h5 key={index} className='font-semibold truncate text-[var(--p-color)]'>{forum?.name}</h5>
                                    <p className='leading-[1.1rem] line-clamp-2'>{forum?.description}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className={`flex-1 border border-gray-300 rounded-xl p-4 py-3 shadow-lg overflow-x-hidden overflow-y-auto`}>
                    <h3 className='text-center font-bold text-[1.25rem] border-b border-gray-300'>Groups</h3>
                    { isFetching && <div className='flex justify-center my-4'><FontAwesomeIcon icon='spinner' className='animate-spin text-[1.3rem] text-[var(--p-color)]' /></div> }
                    <div className='space-y-2 h-[65vh] mt-4 overflow-y-auto overflow-x-hidden'>
                        {
                            loading ? <div className='h-[28rem]'><Loader1 /></div> :
                            <>
                                <table className="relative w-full max-[577px]:hidden">
                                    <thead className="border-b-2 border-gray-400 text-left">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Members</th>
                                            <th>Admin</th>
                                            <th>View Groups</th>
                                        </tr>
                                    </thead>
                                    <tbody className='relative'>
                                        {groups?.length>0 ? groups?.map((group, index) => (
                                            <tr key={index} className={`relative border-b border-gray-300`}>
                                                <td>{index + 1}</td>
                                                <td>{group.name}</td>
                                                <td>{group.description}</td>
                                                <td>{group.members.length}</td>
                                                <td>{group.admin.full_name}</td>
                                                <td className='h-full flex flex-col justify-center'>
                                                    <Link to={`/community/groups/${group.slug}`} className='block my-2 text-[.95rem] text-[var(--p-color)] rounded-lg cursor-pointer leading-[.9rem]'>View <FontAwesomeIcon icon='eye' /></Link>
                                                    { group.admin.id === user.id &&
                                                        <>
                                                            <Link to={`/community/groups/${group.slug}?mode=edit`} className='text-[.9rem] text-blue-500 my-1 cursor-pointer'>Edit <FontAwesomeIcon icon='edit' /></Link>
                                                            <button className='block text-[.9rem] text-red-500 my-1 cursor-pointer disable:text-red-400' disabled={deleting === group.id } onClick={() => {handleDelete(group.id)}}>
                                                                Delete <FontAwesomeIcon icon={`${deleting === group.id ? 'spinner' : 'trash-alt'}`} className={`${deleting === group.id ? 'animate-spin' : ''}`} />
                                                            </button>
                                                        </> 
                                                    }
                                                </td>
                                            </tr>
                                        )) 
                                        :
                                        <tr>
                                            <td colSpan={6} className="text-center relative">
                                                { isFetching ? <FontAwesomeIcon icon='spinner' className='animate-spin text-[var(--p-color)] text-[1.3rem] mt-20' /> :
                                                    <>
                                                        <p className='mt-20 mb-3'>Create or Join a group</p>
                                                        <Link to={`/community/groups`} className='text-[var(--p-color)] border border-[var(--p-color)] px-3 py-2 rounded-lg shadow-lg hover:text-[1.1rem]'>Create/Join</Link>
                                                    </>
                                                }
                                            </td>
                                        </tr>
                                        }
                                    </tbody>
                                </table>

                                <div className="relative hidden max-[577px]:block">
                                    {
                                        groups?.length>0 ? groups?.map((group, index) => (
                                        <div key={index} className="relative space-y-1 leading-[1.2rem] p-3 mb-5 border-b border-gray-200 rounded-lg shadow-sm">
                                            <p><strong>#:</strong> {index + 1}</p>
                                            <p><strong>Name:</strong> {group.name}</p>
                                            <p><strong>Description:</strong> {group.description}</p>
                                            <p><strong>Members:</strong> {group.members.length}</p>
                                            <p><strong>Admin:</strong> {group.admin.full_name}</p>
                                            <div className='flex space-x-7'>
                                                <Link to={`/community/groups/${group.slug}`} className='block my-1 text-[.95rem] text-[var(--p-color)] rounded-lg cursor-pointer leading-[.9rem]'>View <FontAwesomeIcon icon='eye' /></Link>
                                                { group.admin.id === user.id &&
                                                    <>
                                                            <Link to={`/community/groups/${group.slug}?mode=edit`} className='text-[.9rem] text-blue-500 my-1 cursor-pointer'>Edit <FontAwesomeIcon icon='edit' /></Link>
                                                            <button className='block text-[.9rem] text-red-500 my-1 cursor-pointer disable:text-red-400' disabled={deleting === group.id } onClick={() => {handleDelete(group.id)}}>
                                                            Delete <FontAwesomeIcon icon={`${deleting === group.id ? 'spinner' : 'trash-alt'}`} className={`${deleting === group.id ? 'animate-spin' : ''}`} />
                                                        </button>
                                                    </> 
                                                }
                                            </div>
                                        </div>
                                        ))
                                        :
                                        <div className='text-center mt-[5rem]'>
                                            { isFetching ? <FontAwesomeIcon icon='spinner' className='animate-spin text-[var(--p-color)] text-[1.3rem]' /> :
                                                <>
                                                    <p className='mb-3'>Create or Join a group</p>
                                                    <Link to="/community/groups" className='text-[var(--p-color)] border border-[var(--p-color)] px-3 py-2 rounded-lg shadow-lg hover:text-[1.1rem]'>Create/Join</Link>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default ForumGroups
