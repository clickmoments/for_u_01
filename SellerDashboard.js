import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerDashboard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get('/api/transactions/me', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTransactions(res.data);
        };
        fetch();
    }, []);

    return (
        <div>
            <h2>Recent Sales</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Buyer</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id}>
                            <td>{t.product_name}</td>
                            <td>{t.buyer_id}</td>
                            <td>₹{t.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
