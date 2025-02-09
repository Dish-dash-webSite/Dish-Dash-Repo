import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useAppDispatch } from '../../../store';
import { addItem } from '../../../store/cartSlice';
import Swal from 'sweetalert2'

interface AppetizerProps {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}

const AppetizerCard: React.FC<AppetizerProps> = ({ id, name, price, imageUrl, description }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const loading = useSelector((state: RootState) => state.restoMenu.loading);
    const dispatch = useAppDispatch();
    const { token } = useSelector((state: RootState) => state.auth);

    const handleOrderClick = () => {
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to place an order',
                confirmButtonText: 'OK',
                confirmButtonColor: '#FC8A06',
            });
            return;
        }
        
        dispatch(addItem({ 
            id: String(id),
            name, 
            price, 
            imageUrl, 
            description 
        }));
    };

    if (loading) return <div>Loading Menu...</div>
    return (
        <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-md rounded-lg overflow-hidden mb-4 max-w-4xl mx-auto border-2 border-orange-500">
            <img
                src={imageUrl}
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
                    <button 
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition" 
                        onClick={handleOrderClick}
                    >
                        Order now
                    </button>
                </div>
            </div>
        </div>
    );
};

const MenuList: React.FC = () => {
    const menu = useSelector((state: RootState) => state.restoMenu.menu);
    return (
        <div className="p-4">
            {menu.map((items: any) => (
                <AppetizerCard 
                    key={items.id}
                    id={items.id}
                    name={items.name}
                    price={items.price}
                    imageUrl={items.imageUrl}
                    description={items.description}
                />
            ))}
        </div>
    );
};

export default MenuList;