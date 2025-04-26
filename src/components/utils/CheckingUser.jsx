import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <FontAwesomeIcon icon="fa-solid fa-spinner" className="animate-spin text-[1.9rem] text-[var(--p-color)] " />;
            <div className='text-center'>
                <p className='text-base font-semibold'>Just a moment...</p>
                { showMessage &&
                    <p className='text-sm text-orange-500'>
                        If it takes too long, <button className='text-[var(--p-color)] cursor-pointer translate-y-[2px]' onClick={handlePageRefresh}>Click here</button>
                    </p>
                }
            </div>
        </div>
    )
}

export { CheckingUser }

