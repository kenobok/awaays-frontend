import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GiveawayItemDetails = ({ isOpen, item, onCloseModal }) => {
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onCloseModal()
        }
    };

    if (!isOpen || !item) return null;
    const images = item.images || [];

    return (
        <div className={`modal-wrp w-full h-[100vh] absolute top-0 left-0 bg-[rgba(0,0,0,.5)] z-5`}>
            <div ref={modalRef} className="modal flex justify-between bg-[var(--bg-color)] w-[90%] max-[768px]:w-[95%] h-[90vh] p-10 max-[768px]:px-7 max-[768px]:py-0 max-[577px]:px-0 rounded-3xl absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] overflow-hidden">
                <FontAwesomeIcon icon="times" className="absolute top-2 right-3 text-[1.5rem] text-red-500 cursor-pointer" onClick={onCloseModal} />
                <div className="modal-content flex w-full h-full space-x-5 max-[768px]:block max-[768px]:p-5 overflow-y-auto overflow-x-hidden">
                    <motion.div className="flex-1 modal-img overflow-hidden m-auto max-[768px]:mb-5" initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, EffectCards, Mousewheel]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            mousewheel={true}
                            className="modal-img-slide"
                        >
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image} alt={`slide-${index}`} className="w-full h-[30rem] m-auto rounded-xl object-contain"/>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                        </Swiper>
                    </motion.div>
                    <motion.div className="flex-1 modal-text overflow-auto pl-10 py-3 max-[768px]:pl-0 m-auto" initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} >
                        <h3 className="text-[1.5rem] mb-2 font-bold leading-[1.8rem]">{item.purpose}</h3>
                        <h3 className="text-[1.2rem] font-semibold leading-[1.5rem]">{item.name}</h3>
                        <h5 className="my-4 mb-6 inline-block border border-orange-400 px-5 py-2 rounded-md shadow-md" style={{color:'#fd7e14'}}>{item.request > 0 ? item.request : 0} - Request(s)</h5>
                        <div className="mb-3">
                            <h3 className="text-[1.1rem] font-semibold">Description</h3>
                            <p className="leading-[1.3rem]">{item.description}</p>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-[1.1rem] font-semibold">Instructions</h3>
                            <p className="leading-[1.3rem]">{item.instruction}</p>
                        </div>
                        <div className="relative my-5">
                            <p className="absolute border border-green-500 text-green-600 shadow-lg py-[3px] px-7 rounded-s-3xl top-0 right-0" style={{borderRight:'0'}}><b>Donor - </b>{item.donor}</p>
                        </div>
                        <div className="mt-[7rem] w-full flex justify-evenly">
                            <button onClick={() => {onCloseModal()}} className="border border-2 border-red-500 text-red-500 py-3 px-5 rounded-xl shadow-lg cursor-pointer hover:bg-red-100">Close</button>
                            <button className="bg-[var(--p-color)] text-white py-3 px-5 rounded-xl shadow-lg cursor-pointer">Request Item</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default GiveawayItemDetails;
