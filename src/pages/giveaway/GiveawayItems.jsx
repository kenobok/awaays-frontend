import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from 'framer-motion'
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate();
    const { locationFromApi } = useUserLocation();
    const [showFilter, setShowFilter] = useState(false);
    let [searchParams] = useSearchParams();
    let searchQuery = searchParams.get("search") || "";
    const [filteredItems, setFilteredItems] = useState({ country: [], state: [] });
    const [userLocation, setUserLocation] = useState({ country: null, state: null });
    const [isCloseToMe, setIsCloseToMe] = useState(false);

    useEffect(() => {
        error || isError && console.log({error, isError})
    }, [error, isError])

    useEffect(() => {
        if(locationFromApi) {
            const userLoc = { country: [locationFromApi.country_name], state: locationFromApi.region ? [locationFromApi.region] : [] };
            setUserLocation(userLoc);
            setFilteredItems(userLoc);
            filterItems(userLoc, searchQuery);
        }
    }, [locationFromApi]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const country = query.get('country')?.split(',') || [];
        const state = query.get('state')?.split(',') || [];
        const closeToMe = query.get('isCloseToMe') !== 'false';
        setFilteredItems({ country, state });
        setIsCloseToMe(closeToMe);
    }, [location.search]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('closeToMe')) {
            localStorage.setItem('closeToMe', JSON.stringify(false));
        }
        const closeToMe = JSON.parse(localStorage.getItem('closeToMe'));
        setIsCloseToMe(closeToMe);
    }, [location.pathname])

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
        if (location?.country?.length) {
            displayItems = displayItems.filter(item => location.country.includes(item.country));
        }
        if (location?.state?.length) {
            displayItems = displayItems.filter(item => location.state.includes(item.state));
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
        const updatedFilters = isCloseToMe
            ? { country: userLocation.country, state: userLocation.state }
            : { country: null, state: null };
    
        setFilteredItems(updatedFilters);
    
        const newUrlParams = new URLSearchParams();
    
        if (isCloseToMe) {
            newUrlParams.set('country', userLocation.country);
            newUrlParams.set('state', userLocation.state);
            newUrlParams.set('closeToMe', 'true');
        }
    
        navigate({ pathname: window.location.pathname, search: newUrlParams.toString() }, { replace: true });
    };
    
    
    const handleLocationChange = (e) => {
        const value = e.target.id;
    
        const newUrlParams = new URLSearchParams(window.location.search);
        newUrlParams.delete('country');
        newUrlParams.delete('state');
        newUrlParams.delete('closeToMe');
    
        if (value === "closeToMe") {
            setIsCloseToMe(true);
            setFilteredItems({ country: userLocation.country, state: userLocation.state });
            localStorage.setItem('closeToMe', JSON.stringify(true));
            newUrlParams.set('country', userLocation.country);
            newUrlParams.set('state', userLocation.state);
            newUrlParams.set('closeToMe', 'true');
        } else {
            setIsCloseToMe(false);
            setFilteredItems({ country: null, state: null });
            localStorage.setItem('closeToMe', JSON.stringify(false));
        }
    
        window.history.replaceState({}, '', `${window.location.pathname}?${newUrlParams.toString()}`);
    };
    
    const handleAllLocations = () => {
        handleClearFilter();
        setIsCloseToMe(false);
        setFilteredItems({ country: null, state: null });
        localStorage.setItem('closeToMe', JSON.stringify(false));
    
        const newUrlParams = new URLSearchParams(window.location.search);
        newUrlParams.delete('country');
        newUrlParams.delete('state');
        newUrlParams.delete('closeToMe');
    
        window.history.replaceState({}, '', `${window.location.pathname}?${newUrlParams.toString()}`);
    };

    const updateURLParams = (filters) => {
        const params = new URLSearchParams();
        if (filters.country?.length) params.set('country', filters.country.join(','));
        if (filters.state?.length) params.set('state', filters.state.join(','));
        if (!isCloseToMe) params.set('isCloseToMe', 'false');
        navigate({ search: params.toString() }, { replace: true });
    };

    const handleMultipleFilter = (updatedFilters) => {
        setFilteredItems((prev) => {
            const newFilters = {
                country: updatedFilters.country
                    ? [...new Set([...(prev.country || []), updatedFilters.country])]
                    : prev.country || [],
                state: updatedFilters.state
                    ? [...new Set([...(prev.state || []), updatedFilters.state])]
                    : prev.state || [],
            };
            updateURLParams(newFilters);
            return newFilters;
        });
    };


    return (
        <main className={`relative overflow-hidden flex`}>
            <div className={`filter-wrp w-70 z-2 ${hideFilter ? 'hidden' : ''} ${showFilter ? 'show-filter' : ''}`}>

                <div ref={filterRef} className="">
                    <FilterItem
                        onClearFilter={handleClearFilter}
                        onLocationChange={handleLocationChange}
                        isCloseToMe={isCloseToMe}
                        setIsCloseToMe={setIsCloseToMe}
                        multipleFilter={handleMultipleFilter}
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
