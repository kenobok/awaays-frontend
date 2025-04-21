import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetUserLocationFromAPI } from '../utils/GetUserLocationFromAPI';
import countriesData from '../utils/countriesFile';
import CustomSelect from '../utils/CustomSelect';

const countryOptions = Object.keys(countriesData).map(country => ({
    label: country,
    value: country
}));

const FilterItems = ({ onClearFilter, onLocationChange, isCloseToMe, multipleFilter, onRemoveCountry, onRemoveState }) => {
    const [userLocation, setUserLocation] = useState({ country: null, state: null });
    const [countryFilter, setCountryFilter] = useState([]);
    const [stateFilter, setStateFilter] = useState('');
    const [selectedStates, setSelectedStates] = useState([]);
    const [activeCountry, setActiveCountry] = useState('');
    const [activeState, setActiveState] = useState('');


    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const locationData = await GetUserLocationFromAPI();
                setUserLocation({country: locationData.country, state: locationData.region || ""});
                setCountryFilter([{label: locationData.country, value: locationData.country}]);
                setStateFilter({label: locationData.region, value: locationData.region})
                setSelectedStates([{label: locationData.region, value: locationData.region}])
            } catch(error) {
                console.error(error)
            }
        };

        fetchUserLocation();
    }, []);

    useEffect(() => {
        resetLocation();
    }, [isCloseToMe]);


    const handleCountryFilter = (selectedOption) => {
        setCountryFilter((prev) => {
            const updated = prev.filter(country => country.value !== selectedOption.value);
            return [selectedOption, ...updated];
        });
        setStateFilter();
        multipleFilter({ country: selectedOption.value });
        setActiveCountry(selectedOption);
    };

    
    const handleRemoveCountry = (countryValue) => {
        setCountryFilter((prev) => {
            const updatedCountries = prev.filter(country => country.value !== countryValue);
            onRemoveCountry(updatedCountries.map(c => c.value));
            return updatedCountries;
        });
        setSelectedStates((prev) => {
            const updatedStates = prev.filter(state => !countriesData[countryValue]?.includes(state.value));    
            onRemoveState(updatedStates.map(state => state.value));
            return updatedStates;
        });
        if (stateFilter && countriesData[countryValue]?.includes(stateFilter.value)) {
            setStateFilter(null);
        }
    };

    const stateOptions = (countryFilter.length > 0 && countriesData[countryFilter[0].value]) 
    ? countriesData[countryFilter[0].value].map(state => ({
        label: state,
        value: state
    })) 
    : [];

    const handleStateFilter = (selectedOption) => {
        setStateFilter(selectedOption);
        setSelectedStates((prev) => {
            if (prev.some(state => state.value === selectedOption.value)) {
                return prev;
            }
            return [selectedOption, ...prev];
        });
        multipleFilter({ state: selectedOption.value });
        setActiveState(selectedOption);
    };

    const handleRemoveState = (stateValue) => {
        setSelectedStates((prev) => {
            const updatedStates = prev.filter((state) => state.value !== stateValue);
            onRemoveState(updatedStates.map(c => c.value));
            return updatedStates;
        });    
    };

    const resetLocation = () => {
        if(isCloseToMe) {
            setCountryFilter([{label: userLocation.country, value: userLocation.country}]);
            setStateFilter(userLocation.state);
            setSelectedStates([{label: userLocation.state, value: userLocation.state}]);
        } 
        else {
            setCountryFilter([]);
            setStateFilter();
            setSelectedStates([]);
        }
    }  


    return (
        <div className="relative max-w-[1600px] mx-auto">
            <div className="relative w-full">
                <motion.aside className="space-y-5 fixed top-[6rem] ml-2 max-[941px]:ml-0 max-[941px]:top-[7rem] left-0 min-[1600px]:left-[calc((100vw-1600px)/2)] h-[90vh] max-[941px]:h-[78vh] w-[17rem] bg-[var(--bg-color)] p-5 min-[941px]:rounded-lg max-[941px]:rounded-r-lg border border-gray-300 overflow-y-auto z-2" initial={{opacity: 0, x: -200}} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: 'easeInOut' }}>
                    <div className="flex justify-between fixed top-[6.5rem] max-[941px]:top-[7.05rem] pt-3 pb-0 w-[14.7rem] bg-[var(--bg-color)] z-2">
                        <h3 className="text-xl font-semibold">Filters</h3>
                        <button className="text-red-400 px-2 rounded-lg cursor-pointer hover:font-semibold hover:text-red-500" onClick={() => {resetLocation(); onClearFilter()}}>Clear filter</button>
                    </div>
                    <div className="flex flex-col justify-center gap-2 mt-12 px-5 py-2 w-full border border-gray-300 rounded-xl">
                        <div>
                            <input type="radio" name="distance" id="allLocation" className="w-4 h-5 cursor-pointer inline-block transform translate-y-[3.5px]" checked={!isCloseToMe} onChange={onLocationChange} />
                            <label htmlFor="allLocation" className="inline-block ml-2 cursor-pointer inline-block">All locations</label>
                        </div>
                        <div>
                            <input type="radio" name="distance" id="closeToMe" className="w-4 h-5 cursor-pointer inline-block transform translate-y-[3.5px]" checked={isCloseToMe} onChange={onLocationChange} />
                            <label htmlFor="closeToMe" className="inline-block ml-2 cursor-pointer">Close to me</label>
                        </div>
                    </div>
                    <div className={`custom-select-wrp relative flex flex-col p-2 w-full border border-gray-300 rounded-xl ${isCloseToMe ? 'h-[4.2rem]' : 'h-[15rem]'}`}>
                        { !isCloseToMe &&
                        <CustomSelect 
                            options={countryOptions} 
                            onChange={handleCountryFilter} 
                            value={countryFilter}
                            placeholder="Country filter..."
                            isDisabled={true}
                        />
                        }
                        <ul className={`absolute left-4 w-[88%] h-[10.5rem] overflow-y-auto ${isCloseToMe ? 'top-5' : 'top-14'}`}>
                            {countryFilter.map((country, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <li>{country.label}</li>
                                    <FontAwesomeIcon icon="times" className="text-red-400 cursor-pointer" onClick={() => handleRemoveCountry(country.value)} />
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className="custom-select-wrp relative flex flex-col p-2 w-full h-[15rem] border border-gray-300 rounded-xl">
                        <CustomSelect
                            options={stateOptions} 
                            onChange={handleStateFilter} 
                            value=""
                            isMulti={true} 
                            placeholder={countryFilter.length>0 ? `Filter ${countryFilter[0]?.label} States` : 'States filter...'} 
                        />
                        <ul className="absolute top-14 left-4 w-[88%] h-[10.5rem] overflow-y-auto">
                            {selectedStates.map((state, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <li>{state.label}</li>
                                    <FontAwesomeIcon icon="times" className="text-red-400 cursor-pointer" onClick={() => handleRemoveState(state.value)} />
                                </div>
                            ))}
                        </ul>
                    </div>
                </motion.aside>
            </div>
        </div>
    )
}

export default FilterItems;

