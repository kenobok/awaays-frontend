import { useState, useEffect } from "react";
import { useUserLocation } from "/src/hooks/useUserLocationFromAPI";
import countriesData from './countriesFile';

const CountryStateSelector = ({ value, onChange, error = {} }) => {
    const { locationFromApi } = useUserLocation();
    const [selectedCountry, setSelectedCountry] = useState(value?.country || "");
    const [selectedState, setSelectedState] = useState(value?.state || "");

    useEffect(() => {
        if (!selectedCountry) {
            setSelectedCountry(locationFromApi.country);
            onChange({ country: locationFromApi.country, state: "" });
        }
    }, [selectedCountry, onChange]);

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedState("");  
        onChange({ country, state: "" });
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        onChange({ country: selectedCountry, state });
    };

    return (
        <div className="flex gap-x-7 max-[601px]:flex-col">
            <div className="form-input country-select">
                <select 
                    value={selectedCountry} 
                    onChange={handleCountryChange} 
                    className={`border p-[13px] w-full rounded-[0.5rem] ${error.country ? 'error' : ''}`}
                >
                    <option value="">Select country</option>
                    {Object.keys(countriesData).map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                {error.country && <small className="text-red-500">{error.country}</small>}
            </div>

            <div className="form-input state-select">
                {selectedCountry && (countriesData[selectedCountry] || []).length > 0 ? (
                    <select 
                        value={selectedState} 
                        onChange={handleStateChange} 
                        className={`border p-[13px] w-full rounded-[0.5rem] ${error.state ? 'error' : ''}`}
                    >
                        <option value="">Select state/region</option>
                        {countriesData[selectedCountry].map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                ) : (
                    <select 
                        value="" 
                        className="border p-[13px] w-full rounded-[0.5rem] bg-gray-100 cursor-not-allowed" 
                        disabled
                    >
                        <option value="">Select a country first</option>
                    </select>
                )}
                {error.state && <small className="text-red-500">{error.state}</small>}
            </div>
        </div>
    );
};

export default CountryStateSelector;
