import API from '../api/axiosInstance';

export const fetchMe = async () => {
    const response = await API.get('/account/users/me/');
    return response.data;
};

// export const fetcher = (url) => API.get(url).then(res => res.data);

export const fetchAllGiveaways = async () => {
    const response = await API.get('/giveaway-items/');
    return response.data;
};

export const fetchCollectedGiveaways = async () => {
    const response = await API.get('/giveaway-items/collected/?no_pagination=true');
    return response.data;
};

export const fetchGiveawaysItemDetails = async (slug) => {
    const response = await API.get(`/giveaway-items/${slug}/?no_pagination=true`);
    return response.data;
};

export const fetchMyGiveaways = async () => {
    const response = await API.get(`/giveaway-items/?mine=true&no_pagination=true`);
    return response.data;
};

export const fetchRequests = async () => {
    const response = await API.get(`/item-requests/?no_pagination=true`);
    return response.data;
};

export const fetchConversations = async () => {
    const response = await API.get(`/account/conversations`);
    return response.data;
};

export const fetchConversationsDetails = async (slug) => {
    const response = await API.get(`/account/conversations/${slug}`);
    return response.data;
};


// COMMUNITY
export const fetchForums = async () => {
    const response = await API.get(`/community/forums`);
    return response.data;
};

export const fetchForumsConversations = async (slug) => {
    const response = await API.get(`/community/forum-conversations/?forum_slug=${slug}`);
    return response.data;
};

export const fetchGroups = async () => {
    const response = await API.get(`/community/groups`);
    return response.data;
};

export const fetchMyGroups = async () => {
    const response = await API.get(`/community/groups/my-groups`);
    return response.data;
};

export const fetchGroupsConversations = async (slug) => {
    const response = await API.get(`/community/group-conversations/?group_slug=${slug}`);
    return response.data;
};


// CONTACT
export const fetchContacts = async () => {
    const response = await API.get(`/contact/contact-details`);
    return response.data;
};


