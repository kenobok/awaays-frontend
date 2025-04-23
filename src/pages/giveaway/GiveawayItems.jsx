import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockItems from "../../components/giveaway/mockItems";
import FilterItem from '../../components/giveaway/FilterItems';
import { GetUserLocationFromAPI } from "../../components/utils/GetUserLocationFromAPI";
import { Loader1 } from '../../components/utils/Preloader';

const GiveawayItems = () => {
    const hideFilter = useMediaQuery({ query: "(max-width: 940px)" });
    const filterIconRef = useRef(null);
    const filterRef = useRef(null);
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [items, setItems] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const [filteredItems, setFilteredItems] = useState({ country: [], state: [] });
    const [userLocation, setUserLocation] = useState({ country: null, state: null });
    const [loading, setLoading] = useState(true);
    const [isCloseToMe, setIsCloseToMe] = useState(true);


    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const locationData = await GetUserLocationFromAPI();
                const userLoc = { country: [locationData.country], state: locationData.region ? [locationData.region] : []};
                setUserLocation(userLoc);
                setFilteredItems(userLoc); 
                filterItems(userLoc, searchQuery); 
            } catch (error) {
                console.error("Error fetching user location:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserLocation();
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        filterItems(filteredItems, searchQuery);
    }, [filteredItems, searchQuery]);

    const filterItems = (location, query) => {
        let displayItems = mockItems;

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
        setItems(displayItems);
    };

    const handleClickOutside = (e) => {
        if (filterIconRef.current && !filterIconRef.current.contains(e.target) && filterRef.current && !filterRef.current.contains(e.target)) {
            setShowFilter(false)
        }
    };

    const handleClearFilter = () => {
        navigate('/giveaway-items')
        if (isCloseToMe) {
            setFilteredItems(userLocation);
        }
        else {
            setFilteredItems({country: null, state: null});
        }
    };

    const handleLocationChange = (e) => {
        const value = e.target.id;
        setIsCloseToMe(value === "closeToMe");
        if (value === "allLocation") {
            setFilteredItems({ country: null, state: null });  
        } else {
            setFilteredItems({ country: userLocation.country, state: userLocation.state }); 
        }
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
                
                <div  ref={filterRef} className="">
                    <FilterItem 
                        onClearFilter={handleClearFilter} 
                        onLocationChange={handleLocationChange} 
                        isCloseToMe={isCloseToMe} 
                        multipleFilter={handleMultipleFilter} 
                        onRemoveCountry={(updatedCountries) => {setFilteredItems(prev => ({...prev, country: updatedCountries}));}}
                        onRemoveState={(updatedStates) => {setFilteredItems(prev => ({...prev, state: updatedStates}));}}
                    />
                </div>
                <div className="filter-layer hidden max-[941px]:block"></div>
            </div>
            <div className={`flex justify-between fixed bg-[var(--bg-color)] w-full pt-7 top-[3.5rem] left-0 text-lg z-2 ${hideFilter ? '' : 'hidden'}`}>
                <button ref={filterIconRef} className="ml-12 max-[768px]:ml-5 cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
                    <FontAwesomeIcon icon="filter" /> {showFilter ? 'Close' : 'Filters'}
                </button>
            </div>
            
            <section className="relative flex-1 ml-2 max-[941px]:ml-0 mt-[6rem] max-[941px]:mt-[6.5rem]">
                { loading ? <div className='h-[75vh]'><Loader1 /></div> :
                    <motion.div className="relative grid grid-cols-4 max-[1401px]:grid-cols-3 max-[1081px]:grid-cols-2 max-[941px]:grid-cols-3 max-[768px]:grid-cols-2 max-[321px]:grid-cols-1 gap-7 max-[941px]:gap-x-5 p-5 pb-50 max-[561px]:gap-x-3" initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }}>
                        {items.length > 0 ? (
                            items.map((item) => (
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
                            <div className="flex flex-col justify-center absolute transform top-10 left-[50%] -translate-x-[50%] text-[1rem]">
                                <p className="text-gray-500">No items available.</p>
                                <FontAwesomeIcon icon="box-open" className="text-[var(--p-color)]" />
                            </div>
                        )}
                    </motion.div>
                }
            </section>
        </main>
    );
};

export default GiveawayItems;
