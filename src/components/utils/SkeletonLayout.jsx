import React from 'react';

const SkeletonLayout = () => {
    return (
        <div className="p-6 space-y-6 animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
            </div>
        </div>
    );
};

export default SkeletonLayout;
