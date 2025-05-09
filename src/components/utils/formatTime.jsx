
export const formatTo12Hour = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};