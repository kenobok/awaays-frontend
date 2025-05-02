import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import no_network from '../../assets/images/no-network.png';


const CheckingUser = () => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const handlePageRefresh = () => {
        window.location.reload();
    };

    return (
        <div className='relative flex flex-col justify-center items-center my-[12rem] m-auto bg-[var(--bg-color)] w-[25rem] max-[577px]:w-[90%] h-[15rem] z-5 rounded-4xl'>
            <FontAwesomeIcon icon="fa-solid fa-spinner" className="animate-spin text-[1.9rem] text-[var(--p-color)] mb-2" />
            <div className='text-center'>
                <p className='text-base font-semibold'>Just a moment...</p>
                <p className={`text-sm text-orange-500 ${showMessage ? 'visible' : 'invisible'}`}>
                    If it takes too long...&nbsp; 
                    <button className='text-[var(--p-color)] cursor-pointer translate-y-[2px]' onClick={handlePageRefresh}>Refresh Page</button>
                </p>
            </div>
        </div>
    )
}


const NetworkStatus = () => {

    const handlePageRefresh = () => {
        window.location.reload();
    };

    return (
        <div className='relative flex flex-col justify-center items-center my-[12rem] m-auto bg-[var(--bg-color)] w-[25rem] max-[577px]:w-[90%] h-[15rem] z-5 rounded-4xl'>
            <div className='flex flex-col justify-center items-center text-center'>
                <img src={no_network} alt='no network' className='w-[15rem]' />
                <p className='text-base font-semibold text-orange-500'>Check your internet connection...</p>
                <p className={`text-sm text-orange-500`}>
                    <button className='text-[var(--p-color)] cursor-pointer translate-y-[2px]' onClick={handlePageRefresh}>Refresh Page</button>
                </p>
            </div>
        </div>
    )
}


export { CheckingUser, NetworkStatus }

