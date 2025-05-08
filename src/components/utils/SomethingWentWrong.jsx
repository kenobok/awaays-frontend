import { useState, useEffect } from 'react';
import error_pic from '../../assets/images/no-network.png';
import { Loader1 } from './Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const SomethingWentWrong = ({ onHandleRefresh, isError, isFetching }) => {
    const [refreshTime, setRefreshTime] = useState(10);

    useEffect(() => {
        if (!isError) return; 

        const countdown = setInterval(() => {
            setRefreshTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [isError]);

    useEffect(() => {
        if (refreshTime === 0 && isError) {
            onHandleRefresh();           
            setRefreshTime(5);        
        }
    }, [refreshTime, isError, onHandleRefresh]);

    return (
        <div className="flex flex-col justify-center items-center text-center w-full h-[75vh] mt-10">
            { isFetching ? <Loader1 /> :
            <>
                <FontAwesomeIcon icon="exclamation-triangle" className='block text-[5rem] text-orange-600 mb-2 '/>
                <p className="text-orange-500 text-[1.4rem] font-semibold">Something went wrong...</p>
                <p>Check your internet connection</p>
                <p className='text-blue-600'>Retrying in {refreshTime} second{refreshTime !== 1 ? 's' : ''}...</p>
            </>
            }
        </div>
    );
};
