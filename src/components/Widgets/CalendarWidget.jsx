import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarWidget = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const currentMonth = currentTime.toLocaleString('default', { month: 'long' });
    const currentDay = currentTime.getDate();
    const currentDayName = currentTime.toLocaleString('default', { weekday: 'short' });
    const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div
            className="card"
            style={{
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #FFDAC1 0%, #FFB7B2 100%)',
                color: 'white', // Changed to white to match Timer
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                gap: '4px',
                transition: 'transform 0.2s ease',
                height: '100%'
            }}
            onClick={() => navigate('/calendar')}
            title="Go to Full Calendar"
        >
            <div style={{ fontSize: '1.2rem', fontWeight: 600, opacity: 0.9 }}>{currentMonth}</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>{currentDay}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '8px' }}>{currentDayName}</div>
            <div style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                background: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: '12px'
            }}>
                {timeString}
            </div>
        </div>
    );
};

export default CalendarWidget;
