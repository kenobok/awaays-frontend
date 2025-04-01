import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GiveawayItemDetails = ({ isOpen, item, onCloseModal }) => {
    if (!isOpen || !item) return null;

    const images = item.images || [];

    useEffect(() => {
        console.log(item);
    }, [isOpen]);

    return (
        <div className={`modal-wrp w-full h-[100vh] absolute top-0 left-0 bg-[rgba(0,0,0,.5)] z-5`}>
            <div className="modal flex justify-between bg-[var(--bg-color)] w-[90%] h-[40rem] p-10 rounded-3xl absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] overflow-hidden">
                <FontAwesomeIcon
                    icon="times"
                    className="absolute top-2 right-3 text-[1.5rem] text-red-500 cursor-pointer"
                    onClick={onCloseModal}
                />

                <div className="modal-content flex w-full h-full space-x-5">
                    <motion.div
                        className="flex-1 modal-img overflow-hidden m-auto"
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
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
                                        <img
                                            src={image}
                                            alt={`slide-${index}`}
                                            className="w-full max-h-[35rem] m-auto object-contain"
                                        />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                        </Swiper>
                    </motion.div>

                    <motion.div className="flex-1 modal-text overflow-auto pl-10" initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} >
                        <h3 className="text-[1.5rem] mb-2 font-bold leading-[1.8rem]">{item.purpose}</h3>
                        <h3 className="text-[1.2rem] font-semibold leading-[1.5rem]">{item.name}</h3>
                        <h5 className="my-3 mb-7 inline-block text-white bg-orange-500 px-5 py-2 rounded-lg shadow-lg" style={{color:'#fff'}}>3 - Request(s)</h5>
                        <div className="mb-3">
                            <h3 className="text-[1.1rem] font-semibold">Description</h3>
                            <p className="leading-[1.3rem]">{item.description}</p>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-[1.1rem] font-semibold">Instructions</h3>
                            <p className="leading-[1.3rem]">{item.instruction}</p>
                        </div>
                        <div className="relative my-4">
                            <p className="absolute bg-green-500 text-white shadow-lg py-1 px-7 rounded-s-3xl top-0 right-0"><b>Donor - </b>Tom Holland</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default GiveawayItemDetails;
