'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const GoldPrice = () => {
    const [price, setPrice] = useState(74000);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {

        socket = io('https://livegoldprice.onrender.com'); 

        socket.on('goldPriceUpdate', (data) => {
            setPrice(data.price);  
            setLastUpdated(new Date(data.timestamp));
        });

        // Handle connection errors
        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err);
        });

        // Cleanup on component unmount
        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    return (
        <div className="gold-container p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-8 sm:px-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">24K Gold Price</h1>
            <div className="text-4xl font-extrabold text-yellow-500">INR {price.toLocaleString()}</div>
            {lastUpdated && (
                <div className="text-sm text-gray-500 mt-2">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
            )}
        </div>
    );
};

export default GoldPrice;
