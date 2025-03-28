import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import countriesData from '../utils/countriesFile';
import CustomSelect from '../utils/CustomSelect';

const countryOptions = Object.keys(countriesData).map(country => ({
    label: country,
    value: country
}));

const FilterItems = () => {
    const [countryFilter, setCountryFilter] = useState([]);
    const [stateFilter, setStateFilter] = useState();
    const [selectedStates, setSelectedStates] = useState([]);

    const handleCountryFilter = (selectedOption) => {
        setCountryFilter((prev) => {
            const updated = prev.filter(country => country.value !== selectedOption.value);
            return [selectedOption, ...updated];
        });
        setStateFilter();
    };

    const stateOptions = (countryFilter.length > 0 && countriesData[countryFilter[0].value]) 
    ? countriesData[countryFilter[0].value].map(state => ({
        label: state,
        value: state
    })) 
    : [];

    const handleRemoveCountry = (countryValue) => {
        setCountryFilter(prev => prev.filter(country => country.value !== countryValue));
        if (stateFilter && countriesData[countryValue]?.includes(stateFilter.value)) {
            setStateFilter();
        }
        setSelectedStates(prev => prev.filter(state => !countriesData[countryValue]?.includes(state.value)));
    };

    const handleStateFilter = (selectedOption) => {
        setStateFilter(selectedOption)
        setSelectedStates((prev) => {
            if (prev.some(state => state.value === selectedOption.value)) {
                return prev;
            }
            return [selectedOption, ...prev];
        });
    };

    const handleRemoveState = (stateValue) => {
        setSelectedStates((prev) => prev.filter((state) => state.value !== stateValue));
    };


    return (
        <motion.aside className="fixed left-0 top-[9rem] max-[993px]:top-[8rem] h-[80vh] w-70 bg-white p-5 pl-7 rounded-lg shadow-lg overflow-y-auto" initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
            <h3 className="fixed top-[9rem] max-[993px]:top-[8rem] pt-3 pb-0 w-[14.7rem] bg-white text-xl font-semibold text-white z-1">Filters</h3>
            <div className="flex flex-col mt-10 px-5 py-3 w-full border border-gray-300 rounded-xl ">
                <div className="flex item-center py-1">
                    <input type="radio" name="distance" id="allLocation" className="w-4 h-5 cursor-pointer" />
                    <label htmlFor="allLocation" className="inline-block ml-2 cursor-pointer">All locations</label>
                </div>
                <div className="flex item-center py-1">
                    <input type="radio" name="distance" id="closeToMe" className="w-4 h-5 cursor-pointer" />
                    <label htmlFor="closeToMe" className="inline-block ml-2 cursor-pointer">Close to me</label>
                </div>
            </div>
            <div className="relative flex flex-col mt-5 p-2 w-full h-[15rem] border border-gray-300 rounded-xl">
                <CustomSelect
                    options={countryOptions} 
                    onChange={handleCountryFilter} 
                    value={countryFilter}
                    placeholder="Country filter..."
                />
                <ul className="absolute top-14 left-4 w-[88%] h-[10.5rem] overflow-y-auto">
                    {countryFilter.map((country, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <li>{country.label}</li>
                            <FontAwesomeIcon icon="times" className="text-red-400 cursor-pointer" onClick={() => handleRemoveCountry(country.value)} />
                        </div>
                    ))}
                </ul>
            </div>

            <div className="relative flex flex-col mt-5 p-2 w-full h-[15rem] border border-gray-300 rounded-xl">
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
    )
}

export default FilterItems;

