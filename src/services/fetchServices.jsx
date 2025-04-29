import API from '../api/axiosInstance';

export const fetchMe = async () => {
    const response = await API.get('/account/users/me/');
    return response.data;
};

export const fetchGiveaways = async () => {
    const response = await API.get('/giveaway-items/');
    return response.data;
};

export const fetchGiveawaysItemDetails = async (slug) => {
    const response = await API.get(`/giveaway-items/slug/${slug}/`);
    return response.data;
};



