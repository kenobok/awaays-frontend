import axios from "axios";

const apiURL = "http://ip-api.com/json/";

const GetUserLocationFromAPI = async () => {
    try {
        const response = await axios.get(apiURL);
        return {
            ip: response.data.query,
            isp: response.data.isp,
            city: response.data.city,
            region: response.data.regionName,
            country: response.data.country,
            countryCode: response.data.countryCode,
        };
    } catch (error) {
        console.error("Error fetching IP data:", error);
        return {};
    }
};

export { GetUserLocationFromAPI };
