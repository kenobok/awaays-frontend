import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'

const HeroCarousel = () => {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectCards]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 2500, 
                disableOnInteraction: false,
            }}
            // effect="cards" 
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >            
            <SwiperSlide>
                <div className="slide-content">
                    <h2>Slide 1</h2>
                    <p>Welcome to the first slide!</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-content">
                    <h2>Slide 2</h2>
                    <p>Here’s the second slide!</p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-content">
                    <h2>Slide 3</h2>
                    <p>This is the third slide!</p>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default HeroCarousel;
