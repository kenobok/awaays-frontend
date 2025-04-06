import { motion } from 'framer-motion'


const ForumGroups = () => {

    return (
        <motion.section className={`space-y-7 flex-1 p-7 pb-20 max-[941px]:px-5`} initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100'>Forum & Groups</h2>
            <div className='flex justify-evenly flex-wrap gap-5'>
                <div className={`flex-1 border border-gray-300 rounded-xl p-4 py-3 shadow-lg overflow-x-hidden overflow-y-auto`}>
                    
                </div>
                <div className={`flex-1 border border-gray-300 rounded-xl p-4 py-3 shadow-lg overflow-x-hidden overflow-y-auto`}>
                    
                </div>
            </div>
        </motion.section>
    )
}

export default ForumGroups
