import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

export const useUserLocation = () => {
    const { data, error, isLoading } = useSWR('https://ipapi.co/json', fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 1000 * 60 * 60 * 12,
    });

    return { locationFromApi: data, isLoading, isError: error };
};

