import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from 'framer-motion'
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";
import { useMediaQuery } from "react-responsive";
// import useSWRInfinite from 'swr/infinite';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAllGiveaways } from "../../services/fetchServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterItem from '../../components/giveaway/FilterItems';
import { useUserLocation } from "/src/hooks/useUserLocationFromAPI";
import { Loader1 } from '../../components/utils/Preloader';
import { SomethingWentWrong } from "../../components/utils/SomethingWentWrong";


// const PAGE_SIZE = 4;
// const getKey = (pageIndex, previousPageData) => {
//     if (previousPageData && !previousPageData.next) return null;
//     if (pageIndex === 0) return `/giveaway-items/?page=1`;
//     return previousPageData.next;
// };


const GiveawayItems = () => {
    // const { data, size, setSize, isLoading, isValidating, error } = useSWRInfinite(getKey, fetcher);
    // const allItems = data ? data.flatMap(page => page.results) : [];
    // const hasMore = data && data[data.length - 1]?.next !== null;

    const queryClient = useQueryClient();
    const hideFilter = useMediaQuery({ query: "(max-width: 940px)" });
    const { user } = useAuth();
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

    const { data: allItems, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ['all-giveaway-items'],
        queryFn: fetchAllGiveaways,
        refetchOnWindowFocus: true,
        refetchInterval: 1000 * 60 * 30 
    });

    // const deduplicatedItems = useMemo(() => {
    //     const seen = new Set();
    //     return allItems.filter(item => {
    //         if (seen.has(item.id)) return false;
    //         seen.add(item.id);
    //         return true;
    //     });
    // }, [allItems]);

    // useEffect(() => {
    //     if (!allItems || !Array.isArray(allItems)) return;

    //     const validIds = new Set(allItems.map(item => String(item.id)));

    //     Object.keys(localStorage).forEach((key) => {
    //         if (key.startsWith('requested-')) {
    //             const id = key.split('requested-')[1];
    //             if (!validIds.has(id)) {
    //                 localStorage.removeItem(key);
    //             }
    //         }
    //     });
    // }, [allItems]);


    useEffect(() => {
        if (user && isCloseToMe) {
            const userLoc = { country: [user.country], state: user.region ? [user.region] : [] };
            setUserLocation(userLoc);
            setFilteredItems(userLoc);
            filterItems(userLoc, searchQuery);
        }
    }, [user, isCloseToMe]);

    useEffect(() => {
        if (!user && locationFromApi && isCloseToMe) {
            const userLoc = { country: [locationFromApi.country_name], state: locationFromApi.region ? [locationFromApi.region] : [] };
            setUserLocation(userLoc);
            setFilteredItems(userLoc);
            filterItems(userLoc, searchQuery);
        }
    }, [!user, locationFromApi, isCloseToMe]);

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
        return filterItems(allItems, filteredItems, searchQuery);
    }, [allItems, filteredItems, searchQuery, isCloseToMe]);

    const handleClickOutside = (e) => {
        if (filterIconRef.current && !filterIconRef.current.contains(e.target) && filterRef.current && !filterRef.current.contains(e.target)) {
            setShowFilter(false)
        }
    };

    const handleClearFilter = () => {
        const updatedFilters = !isCloseToMe ? { country: null, state: null } : { country: userLocation.country, state: userLocation.state };

        setFilteredItems(updatedFilters);
        navigate('/giveaway-items')
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

    const handleSearchAllLocations = () => {
        setIsCloseToMe(false);
        setFilteredItems({ country: null, state: null });
        localStorage.setItem('closeToMe', JSON.stringify(false));
    };

    const handleAllLocations = () => {
        handleClearFilter()
        setIsCloseToMe(false);
        setFilteredItems({ country: null, state: null });
        localStorage.setItem('closeToMe', JSON.stringify(false));
        navigate('/giveaway-items')
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
                isError ? <SomethingWentWrong onHandleRefresh={refetch} isError={isError} isFetching={isFetching} />
                :
                <section className="relative flex-1 min-h-[75vh] ml-2 max-[941px]:ml-0 my-[6rem] max-[941px]:mt-[6.5rem]">
                    {isLoading ? <div className='h-[75vh]'><Loader1 /></div> :
                        <motion.div className="relative grid grid-cols-4 max-[1401px]:grid-cols-3 max-[1081px]:grid-cols-2 max-[941px]:grid-cols-3 max-[768px]:grid-cols-2 max-[321px]:grid-cols-1 gap-7 max-[941px]:gap-x-5 p-5 pb-5 max-[561px]:gap-x-" initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }}>
                            {filteredDisplayItems.length > 0 ? (
                                filteredDisplayItems.map((item) => (
                                    <motion.div key={item.id} className="single-giveaway-item {w-[15rem]} bg-white rounded-2xl shadow-lg pb-3 hover:shadow-xl hover:scale-[1.05] transition-all duration-200 ease-in-out cursor-pointer" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1, ease: "easeInOut" }}>
                                        <Link to={`/giveaway-item-details/${item.slug}`} className='block'>
                                            <img src={item.images[0]} alt={item.name} loading="lazy" className="w-full h-45 object-cover rounded-2xl" />
                                            <h3 className="font-bold mt-3 truncate">{item.purpose}</h3>
                                            <h3 className="text-[var(--p-color)] font-semibold truncate">{item.name}</h3>
                                            <p className="truncate">{item.description}</p>
                                            <p className="truncate">
                                                <FontAwesomeIcon icon="location-dot" className="mr-1 text-sm text-[var(--p-color)]" />
                                                {item.country}, {item.state}
                                            </p>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="absolute w-full h-[50vh] mt-[7rem] w-[78vw] text-center text-[1rem] px-5">
                                    <div>
                                        <FontAwesomeIcon icon="box-open" className="mb-5 text-[5rem] text-orange-400" />
                                        {isCloseToMe ?
                                            <>
                                                <p className="text-orange-500 text-[1.2rem] text-center font-semibold ">No items available close to you.</p>
                                                <p className="text-center">Use the filter <FontAwesomeIcon icon="filter" /> to browse other location(s) or click the button below for all locations.</p>
                                                <button className='mt-5 w-[10.5rem] text-[var(--p-color)] text-bold py-[5px] border-2 border-[var(--p-color)] rounded-xl mx-auto cursor-pointer' id='allLocate' onClick={handleSearchAllLocations}>Search All locations</button>
                                            </>
                                            :
                                            <>
                                                <p className="text-gray-500 text-[1.2rem] font-semi-bold ">Your search was not found</p>
                                                <button className='mt-5 w-[10rem] text-[var(--p-color)] text-bold py-[5px] border-2 border-[var(--p-color)] rounded-xl mx-auto cursor-pointer' id='allLocate' onClick={handleAllLocations}>All items/locations</button>
                                            </>
                                        }
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
