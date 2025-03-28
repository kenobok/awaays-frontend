import { useState } from 'react';
import CountryStateSelector from '../../components/utils/CountryStateSelector';


const GiveawayItemDetails = () => {

    const handleLocationChange = (location) => {
        console.log("Selected Location:", location);
    };

    return (
        <div className='mt-20'>
            <h2>Select Your Country & State</h2>
            <CountryStateSelector onChange={handleLocationChange} />
        </div>
    );
}


export default GiveawayItemDetails;
