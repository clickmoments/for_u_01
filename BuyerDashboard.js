import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyerDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [points, setPoints] = useState(0);
    const [threshold, setThreshold] = useState(1000);

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get('/api/rewards/me', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setPoints(res.data.points);
            setThreshold(res.data.threshold);
        };
        fetch();
    }, []);

    return (
        <div>
            <h2>Your Rewards</h2>
            <div style={{ width: '100%', backgroundColor: '#eee' }}>
                <div style={{
                    width: `${(points / threshold) * 100}%`,
                    backgroundColor: '#48BB78',
                    height: '20px'
                }}></div>
            </div>
            <p>{points} / {threshold} points</p>
        </div>
    );
};
