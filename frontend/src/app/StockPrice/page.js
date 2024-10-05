'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const GoldPrice = () => {
    const [price, setPrice] = useState(74000);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        socket = io('https://livegoldprice.onrender.com');

        socket.on('goldPriceUpdate', (data) => {
            setPrice(data.price);
            setLastUpdated(new Date(data.timestamp));
        });

        // Set current date
        setCurrentDate(new Date());

        // Cleanup on component unmount
        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">

            <nav className="bg-yellow-500 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold mx-auto">Gold Tracker</h1>
                </div>
            </nav>


            {/* Main Content */}
            <div className="gold-container flex-grow p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-8 sm:px-10 text-center m-3">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">24K Gold Price</h1>

                {/* Display current date */}
                <div className="text-md text-gray-600 mb-2">
                    {currentDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>

                {/* Price */}
                <div className="text-4xl font-extrabold text-yellow-500">
                    INR {price.toLocaleString()}
                </div>

                {/* Last updated */}
                {lastUpdated && (
                    <div className="text-sm text-gray-500 mt-2">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                )}

                {/* Additional Gold Info */}
                <div className="text-sm text-gray-700 mt-6">
                    <p>Gold is one of the most traded commodities in the world, often used as a hedge against inflation and economic downturns.</p>
                    <p>Today's price represents the current value of 24K gold in India.</p>
                </div>
            </div>


            <footer className="bg-yellow-500 text-white py-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p className="text-sm">
                        © 2024 Gold Tracker. All Rights Reserved.
                    </p>
                    <p className="text-sm">
                        For more information, visit our <a href="#" className="text-gray-800 hover:underline">contact page</a>.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default GoldPrice;