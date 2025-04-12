import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { forums } from '../../components/utils/UtilsData'
import { Loader1 } from '../../components/utils/Preloader'


const ForumGroups = () => {

    const groups = [
        {
            id: 1,
            name: "Single Parents Support",
            description: "A space for single parents to request and share items for kids and home essentials.",
            members: 128,
            admin: "Grace Thomas",
        },
        {
            id: 2,
            name: "Students Helping Students",
            description: "University and college students exchanging study materials, clothing, and gadgets.",
            members: 205,
            admin: "James Okoro"
        },
        {
            id: 3,
            name: "Job Seekers & Starters",
            description: "Support group for those seeking jobs or starting careers. Share suits, laptops, or advice.",
            members: 89,
            admin: "Lilian Musa"
        },
        {
            id: 4,
            name: "Mothers & Babies",
            description: "For sharing baby items like clothes, diapers, toys, and maternity supplies.",
            members: 312,
            admin: "Fatima Bello"
        },
        {
            id: 5,
            name: "Home Setups & Movers",
            description: "People setting up a new home or relocating can give/receive home essentials.",
            members: 173,
            admin: "Tunde Akinwale",
        }
    ];


    return (
        <motion.section className={`flex-1 p-7 pb-20 max-[941px]:px-5`} initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100'>Forums & Groups</h2>
            <div className='space-y-7 flex max-[851px]:flex-col justify-evenly flex-wrap gap-5'>
                <div className={`w-[16rem] max-[851px]:w-full border border-gray-300 rounded-xl p-2 py-3 shadow-lg`}>
                    <h3 className='text-center font-bold text-[1.25rem] border-b border-gray-300'>Forums</h3>
                    <div className='relative space-y-3 w-full mt-4 pb-2 overflow-y-auto overflow-x-hidden'>
                        {
                            forums.length > 0 ? forums.map((forum, index) => (
                                <Link to={`/community/forums/${forum.link}`} className={`inline-block p-2 py-[7px] rounded-md cursor-pointer hover:text-[var(--p-color)] w-full ${index % 2 == 0 ? 'bg-gray-100' : ''}`} key={index}>
                                    <h5 key={index} className='font-semibold truncate text-[var(--p-color)]'>{forum.name}</h5>
                                    <p className='leading-[1.1rem] line-clamp-2'>{forum.description}</p>
                                </Link>
                            ))
                            :
                            <Loader1 />
                        }
                    </div>
                </div>
                <div className={`flex-1 border border-gray-300 rounded-xl p-4 py-3 shadow-lg overflow-x-hidden overflow-y-auto`}>
                    <h3 className='text-center font-bold text-[1.25rem] border-b border-gray-300'>Groups</h3>
                    <div className='space-y-2 h-[65vh] mt-4 overflow-y-auto overflow-x-hidden'>
                        <table className="w-full h-full max-[577px]:hidden">
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
                                {groups.length>0 ? groups.map((group, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td>{index + 1}</td>
                                        <td>{group.name}</td>
                                        <td>{group.description}</td>
                                        <td>{group.members}</td>
                                        <td>{group.admin}</td>
                                        <td className='h-full my-auto'><Link to={``} className='inline-block my-auto border-2 border-[var(--p-color)] text-[var(--p-color)] rounded-lg shadow-lg py-[8px] pt-[9px] px-3 cursor-pointer leading-[.9rem]'>View group</Link></td>
                                    </tr>
                                )) 
                                :
                                <div className='absolute top-[50%] left-[50%] tranform -translate-x-[50%] -translate-y-[50%] text-center'>
                                    <p className='mb-3'>Create or Join a group</p>
                                    <Link className='text-[var(--p-color)] border-2 border-[var(--p-color)] px-3 py-2 rounded-lg shadow-lg hover:text-[1.1rem]'>Create/Join</Link>
                                </div>
                                }
                            </tbody>
                        </table>

                        <div className="hidden max-[577px]:block">
                            {
                                groups.length>0 ? groups.map((group, index) => (
                                <div key={index} className="space-y-1 leading-[1.2rem] p-3 mb-5 border-b border-gray-200 rounded-lg shadow-sm">
                                    <p><strong>#:</strong> {index + 1}</p>
                                    <p><strong>Name:</strong> {group.name}</p>
                                    <p><strong>Description:</strong> {group.description}</p>
                                    <p><strong>Members:</strong> {group.members}</p>
                                    <p><strong>Admin:</strong> {group.admin}</p>
                                    <Link to={``} className='inline-block my-auto border-2 border-[var(--p-color)] text-[var(--p-color)] rounded-lg shadow-lg py-[8px] pt-[9px] px-3 cursor-pointer leading-[.7rem]'>View Group</Link>
                                </div>
                                ))
                                :
                                <div className='absolute top-[50%] left-[50%] tranform -translate-x-[50%] -translate-y-[50%] text-center'>
                                    <p className='mb-3'>Create or Join a group</p>
                                    <Link className='text-[var(--p-color)] border-2 border-[var(--p-color)] px-3 py-2 rounded-lg shadow-lg hover:text-[1.1rem]'>Create/Join</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default ForumGroups
