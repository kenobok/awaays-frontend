import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { groups } from '/src/components/utils/UtilsData';
import '/src/assets/styles/community.css';


const GroupDetails = () => {
    const location = useLocation();

    const group = useMemo(() => {
        return groups.find(g => location.pathname.includes(g.slug));
    }, [location.pathname, groups])

    return (
        <div className='ml-25 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.3rem] font-semibold mb-5 border-b border-gray-200'>{group.name}</h3>
            <div className='py-10'>
            </div>
        </div>
    );
}

export default GroupDetails;
