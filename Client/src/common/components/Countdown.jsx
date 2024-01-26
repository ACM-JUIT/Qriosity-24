import { useEffect, useState } from 'react';

const targetDate = new Date('2024-02-03T00:00:00Z');

const CountDownTimer = () => {
    const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
};

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => {
        clearInterval(timer);
    };
}, []);

return (
    <div className='card-glass'>
        <div className='counter'>
            <div className='text-8xl text-center text-bold font-mono'>
                {`${timeLeft.days.toString().padStart(2, '0')}  ${timeLeft.hours.toString().padStart(2, '0')}  ${timeLeft.minutes
                .toString()
                .padStart(2, '0')}  ${timeLeft.seconds.toString().padStart(2, '0')}`}
            </div>
            <div className='flex flex-row justify-between text-xl text-pink-600'>
                <p>Days</p>
                <p>Hours</p>
                <p>Minutes</p>
                <p>Seconds</p>
            </div>
            <div className="flex text-3xl p-4">
            <h3>Counting Moments: <span>Qriosity Awakens!</span></h3>
            </div>
            
        </div>
    </div>
);
}

export default CountDownTimer;