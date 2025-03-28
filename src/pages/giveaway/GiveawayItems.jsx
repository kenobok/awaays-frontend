import { useState, useEffect } from "react";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockItems from "../../components/giveaway/mockItems";
import FilterItem from '../../components/giveaway/FilterItems';

const GiveawayItems = () => {
    const [items, setItems] = useState([]);
    const hideFilter = useMediaQuery({ query: "(max-width: 940px)" });
    

    useEffect(() => {
        setItems(mockItems);
    }, []);

    return (
        <main className="overflow-hidden flex">
            <section className={`relative w-70 ${hideFilter ? 'hidden' : ''}`}>
                <FilterItem />
            </section>
            <motion.section className="flex-1 translate-y-[8rem] max-[993px]:translate-y-[7rem] max-[768px]:translate-y-[6rem]" initial={{ opacity: 0, y: 500 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
                <div className="flex justify-evenly flex-wrap p-5 pb-50 gap-x-5 max-[561px]:gap-x-3 gap-y-7">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <motion.div key={item.id} className="single-giveaway-item w-[15rem] max-[561px]:w-[12rem] max-[461px]:w-[11rem] max-[431px]:w-[10rem] max-[401px]:w-[9rem] max-[356px]:w-[8rem] max-[320px]:w-[12rem] bg-white rounded-2xl shadow-lg pb-3 hover:shadow-xl hover:scale-[1.05] transition-all duration-200 ease-in-out" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }}>
                                <Link to="">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-50 object-cover rounded-2xl" />
                                    <h3 className="text-lg font-semibold m-0 mt-3 truncate">{item.purpose}</h3>
                                    <h3 className="text-md font-semibold truncate mt-1"> 
                                        <FontAwesomeIcon icon="share" className="mr-1 text-xs" />
                                        {item.name}
                                    </h3>
                                    <p className="p-0 m-0 mt-1 truncate">{item.description}</p>
                                    <h3 className="p-0 m-0 mt-1 truncate">
                                        <FontAwesomeIcon icon="location-dot" className="mr-1 text-sm" />
                                        {item.country}, {item.state}
                                    </h3>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">No items availabla.</p>
                    )}
                </div>
            </motion.section>
        </main>
    );
};

export default GiveawayItems;
