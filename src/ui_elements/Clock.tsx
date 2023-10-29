import React from 'react'

export function Clock() {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    const formattedTime = currentTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
    }) + ':' + String(currentTime.getMilliseconds()).padStart(3, '0'); // Using colon to separate milliseconds

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return <span>{formattedTime}</span>;
}
