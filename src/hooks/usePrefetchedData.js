import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchCollectedGiveaways, fetchAllGiveaways, fetchForums, fetchGroups } from '../services/fetchServices';

export const usePrefetchData = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const prefetchData = async () => {
            try {
                await queryClient.fetchQuery({
                    queryKey: ['all-giveaway-items'],
                    queryFn: fetchAllGiveaways,
                    staleTime: 1000 * 60 * 60,
                });

                await queryClient.prefetchQuery({
                    queryKey: ['collected-items'],
                    queryFn: fetchCollectedGiveaways,
                    staleTime: 1000 * 60 * 60,
                });

                await queryClient.prefetchQuery({
                    queryKey: ['forums-list'],
                    queryFn: fetchForums,
                    staleTime: 1000 * 60 * 60,
                });

                await queryClient.prefetchQuery({
                    queryKey: ['groups-list'],
                    queryFn: fetchGroups,
                    staleTime: 1000 * 60 * 60,
                });
            } catch (error) {
                console.error('Prefetching failed:', error);
            }
        };
        
        const handle = window.requestIdleCallback
            ? requestIdleCallback(() => {
                prefetchData();
            })
            : setTimeout(() => {
                prefetchData();
            }, 5000);
            
        return () => {
            if (window.cancelIdleCallback && typeof handle === 'number') {
                cancelIdleCallback(handle);
            } else {
                clearTimeout(handle);
            }
        };
    }, []);
};


