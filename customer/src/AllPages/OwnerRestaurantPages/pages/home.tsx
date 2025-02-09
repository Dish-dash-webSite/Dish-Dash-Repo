import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { Items } from "../../../types/index"
// AppetizerCard Component
const ItemsCard: React.FC<Items> = ({ name, price, image, description }) => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetching loading state from Redux store
    const loading = useSelector((state: RootState) => state.restOwner.loading);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-md rounded-lg overflow-hidden mb-4 max-w-4xl mx-auto border-2 border-orange-500">
            <img
                src={image}
                alt={name}
                className="w-full md:w-1/3 h-56 object-cover rounded-t-lg md:rounded-l-lg"
            />
            <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
                <div>
                    {/* Name of the item */}
                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>

                    {/* Description of the item */}
                    <p className="text-sm text-gray-600 mt-2">{description}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-semibold text-orange-500">{price}</span>
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
                        Order now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemsCard;