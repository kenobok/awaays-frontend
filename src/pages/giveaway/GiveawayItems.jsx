import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from 'framer-motion'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from '@tanstack/react-query';
import { fetchGiveaways } from "../../services/fetchServices";
import FilterItem from '../../components/giveaway/FilterItems';
import { useUserLocation } from "/src/hooks/useUserLocationFromAPI";
import { Loader1 } from '../../components/utils/Preloader';
import no_network from '../../assets/images/no-network.png'

const GiveawayItems = () => {
    const { data: items, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['giveaway-items'],
        queryFn: fetchGiveaways,
    });

    const hideFilter = useMediaQuery({ query: "(max-width: 940px)" });
    const filterIconRef = useRef(null);
    const filterRef = useRef(null);
    const location = useLocation();
    const { locationFromApi } = useUserLocation();
    const [showFilter, setShowFilter] = useState(false);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [filteredItems, setFilteredItems] = useState({ country: [], state: [] });
    const [userLocation, setUserLocation] = useState({ country: null, state: null });
    const [isCloseToMe, setIsCloseToMe] = useState(true);

    useEffect(() => {
        error || isError && console.log({error, isError})
    }, [error, isError])

    useEffect(() => {
        const userLoc = { country: [locationFromApi.country], state: locationFromApi.region ? [locationFromApi.region] : [] };
        setUserLocation(userLoc);
        setFilteredItems(userLoc);
        filterItems(userLoc, searchQuery);
    }, [locationFromApi]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const closeBy = JSON.parse(localStorage.getItem('closeToMe'));
        setIsCloseToMe(closeBy);
    }, [location.pathname === '/giveaway-items'])

    const filterItems = (allItems, location, query) => {
        let displayItems = allItems || []; 
    
        if (query) {
            displayItems = displayItems.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.purpose.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.country.toLowerCase().includes(query.toLowerCase()) ||
                item.state.toLowerCase().includes(query.toLowerCase())
            );
        }
        const closeBy = JSON.parse(localStorage.getItem('closeToMe'));
        if (closeBy) {
            if (location?.country?.length) {
                displayItems = displayItems.filter(item => location.country.includes(item.country));
            }
            if (location?.state?.length) {
                displayItems = displayItems.filter(item => location.state.includes(item.state));
            }
        }
        return displayItems;
    };

    const filteredDisplayItems = useMemo(() => {
        return filterItems(items, filteredItems, searchQuery);
    }, [items, filteredItems, searchQuery]);

    const handleClickOutside = (e) => {
        if (filterIconRef.current && !filterIconRef.current.contains(e.target) && filterRef.current && !filterRef.current.contains(e.target)) {
            setShowFilter(false)
        }
    };

    const handleClearFilter = () => {
        if (isCloseToMe) {
            setFilteredItems(userLocation);
        }
        else {
            setFilteredItems({ country: null, state: null });
        }
        localStorage.removeItem('closeToMe')
    };

    const handleLocationChange = (e) => {
        const value = e.target.id;
        if (value === "closeToMe") {
            setIsCloseToMe(true)
            setFilteredItems({ country: userLocation.country, state: userLocation.state });
            JSON.stringify(localStorage.setItem('closeToMe', true));
        } else {
            setIsCloseToMe(false)
            setFilteredItems({ country: null, state: null });
            JSON.stringify(localStorage.setItem('closeToMe', false));
        }
    };

    const handleAllLocations = () => {
        setIsCloseToMe(false)
        setFilteredItems({ country: null, state: null });
        JSON.stringify(localStorage.setItem('closeToMe', false));
    };

    const handleMultipleFilter = (updatedFilters) => {
        setFilteredItems((prev) => ({
            country: updatedFilters.country
                ? [...new Set([...(Array.isArray(prev?.country) ? prev.country : [prev.country]).filter(Boolean), updatedFilters.country])]
                : prev?.country || [],

            state: updatedFilters.state
                ? [...new Set([...(Array.isArray(prev?.state) ? prev.state : [prev.state]).filter(Boolean), updatedFilters.state])]
                : prev?.state || [],
        }));
    };


    return (
        <main className={`relative overflow-hidden flex`}>
            <div className={`filter-wrp w-70 z-2 ${hideFilter ? 'hidden' : ''} ${showFilter ? 'show-filter' : ''}`}>

                <div ref={filterRef} className="">
                    <FilterItem
                        onClearFilter={handleClearFilter}
                        onLocationChange={handleLocationChange}
                        isCloseToMe={isCloseToMe}
                        multisilencedpleFilter={handleMultipleFilter}
                        onRemoveCountry={(updatedCountries) => { setFilteredItems(prev => ({ ...prev, country: updatedCountries })); }}
                        onRemoveState={(updatedStates) => { setFilteredItems(prev => ({ ...prev, state: updatedStates })); }}
                    />
                </div>
                <div className="filter-layer hidden max-[941px]:block"></div>
            </div>
            <div className={`flex justify-between fixed bg-[var(--bg-color)] w-full pt-7 top-[3.5rem] left-0 text-lg z-2 ${hideFilter ? '' : 'hidden'}`}>
                <button ref={filterIconRef} className="ml-12 max-[768px]:ml-5 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
                    <FontAwesomeIcon icon="filter" /> {showFilter ? 'Close' : 'Filters'}
                </button>
            </div>

            {
                isError ? 
                    <div className="flex flex-col justify-center items-center text-center w-full h-[75vh] mt-10">
                            <img src={no_network} alt="Connection error" className="w-[15rem]" />
                            <p className="text-orange-500 text-[1rem] font-semibold mb-3">Check your internet connection</p>
                            <button onClick={() => refetch()} className="p-[5px] px-5 border-2 border-[var(--p-color)] text-[var(--p-color)] rounded-xl cursor-pointer">Retry</button>
                    </div>
                :
                <section className="relative flex-1 min-h-[75vh] ml-2 max-[941px]:ml-0 mt-[6rem] max-[941px]:mt-[6.5rem]">
                    {isLoading ? <div className='h-[75vh]'><Loader1 /></div> :
                        <motion.div className="relative grid grid-cols-4 max-[1401px]:grid-cols-3 max-[1081px]:grid-cols-2 max-[941px]:grid-cols-3 max-[768px]:grid-cols-2 max-[321px]:grid-cols-1 gap-7 max-[941px]:gap-x-5 p-5 pb-50 max-[561px]:gap-x-3" initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }}>
                            {filteredDisplayItems.length > 0 ? (
                                filteredDisplayItems.map((item) => (
                                    <motion.div key={item.id} className="single-giveaway-item {w-[15rem]} bg-white rounded-2xl shadow-lg pb-3 hover:shadow-xl hover:scale-[1.05] transition-all duration-200 ease-in-out cursor-pointer" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1, ease: "easeInOut" }}>
                                        <Link to={`/giveaway-item-details/${item.slug}`} className='block'>
                                            <img src={item.images[0]} alt={item.name} loading="lazy" className="w-full h-45 object-cover rounded-2xl" />
                                            <h3 className="font-bold mt-3 truncate">{item.purpose}</h3>
                                            <h3 className="font-semibold truncate">{item.name}</h3>
                                            <p className="truncate">{item.description}</p>
                                            <p className="truncate">
                                                <FontAwesomeIcon icon="location-dot" className="mr-1 text-sm" />
                                                {item.country}, {item.state}
                                            </p>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="absolute w-full h-[50vh] mt-[7rem] w-[78vw] text-center text-[1rem] px-5">
                                    <div>
                                        <FontAwesomeIcon icon="box-open" className="mb-5 text-[5rem] text-orange-400" />
                                        { isCloseToMe ?
                                            <>
                                                <p className="text-orange-500 text-[1.2rem] text-center font-semibold ">No items available close to you.</p>
                                                <p className="text-center">Use the filter <FontAwesomeIcon icon="filter" /> to browse other location(s) or click the button below for all locations.</p>
                                            </>
                                            :
                                            <p className="text-gray-500 text-[1.2rem] font-semi-bold ">No items available in this/those location(s).</p>
                                        }
                                        <button className='mt-5 w-[8rem] text-[var(--p-color)] text-bold py-[5px] border-2 border-[var(--p-color)] rounded-xl mx-auto cursor-pointer' id='allLocate' onClick={() => handleAllLocations()}>All locations</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    }
                </section>
            }
        </main>
    );
};

export default GiveawayItems;
