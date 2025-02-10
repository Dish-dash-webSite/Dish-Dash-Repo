import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2

// Define the Item interface that will be used for each item.
interface MyObject {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    updateItems?: null;
}

// ItemsCard Component that will be used for displaying each item.
const ItemsCard: React.FC<MyObject> = ({ id, name, price, description, imageUrl, updateItems }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name,
        price,
        description,
        imageUrl
    });

    // Handle input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const updateItem = async (obj: MyObject, id: number) => {
        try {
            await axios.put(`http://localhost:3000/api/owner/updateItem/${id}`, obj);
            updateItems(id, obj);  // Optimistically update UI
            Swal.fire({
                title: 'Success!',
                text: 'Item updated successfully',
                icon: 'success',
                background: '#1F1F1F',
                color: '#FFA500',
                confirmButtonColor: '#FFA500',
                confirmButtonText: 'OK'
            });
        } catch (err) {
            console.log('Error updating item:', err);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update item',
                icon: 'error',
                background: '#1F1F1F',
                color: '#FFA500',
                confirmButtonColor: '#FFA500',
                confirmButtonText: 'OK'
            });
        }
    };

    const deleteItem = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this item?',
            icon: 'warning',
            background: '#1F1F1F',
            color: '#FFA500',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#FF4500',
            cancelButtonColor: '#DCDCDC'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/owner/${id}`);
                updateItems(id, null);  // Remove the item from the UI
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Item deleted successfully',
                    icon: 'success',
                    background: '#1F1F1F',
                    color: '#FFA500',
                    confirmButtonColor: '#FFA500',
                    confirmButtonText: 'OK'
                });
            } catch (err) {
                console.log('Error deleting item:', err);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete item',
                    icon: 'error',
                    background: '#1F1F1F',
                    color: '#FFA500',
                    confirmButtonColor: '#FFA500',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    // Handle save action after update
    const handleSave = () => {
        updateItem(formData, id);  // Update the item using the formData
        setIsEditing(false);  // Exit edit mode
    };

    // Handle cancel action to exit edit mode without saving
    const handleCancel = () => {
        setIsEditing(false);  // Exit edit mode and revert changes
        setFormData({
            name,
            price,
            description,
            imageUrl
        });
    };

    // Handle delete action (triggered by the delete button)
    const handleDelete = () => {
        deleteItem(id); // Call the delete function
    };

    // Handle the update button click (enter edit mode)
    const handleUpdate = () => {
        setIsEditing(true);  // Enter edit mode
    };

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden mb-4 max-w-2xl w-full mx-auto border-2 border-orange-500 hover:shadow-xl transition-all">
            <img
                src="https://images.pexels.com/photos/4440877/pexels-photo-4440877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Use formData imageUrl
                alt={formData.name}
                className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-6 flex flex-col justify-between">
                <div>
                    {/* Conditionally render input fields or text */}
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="text-xl font-semibold text-gray-800"
                        />
                    ) : (
                        <h3 className="text-xl font-semibold text-gray-800 hover:text-orange-500 transition-colors">
                            {formData.name}
                        </h3>
                    )}

                    {isEditing ? (
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="text-sm text-gray-600 mt-2"
                        />
                    ) : (
                        <p className="text-sm text-gray-600 mt-2">{formData.description}</p>
                    )}
                </div>

                <div className="flex justify-between items-center mt-4">
                    {/* Conditionally render input field or static text for price */}
                    {isEditing ? (
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="text-xl font-semibold text-orange-500"
                        />
                    ) : (
                        <span className="text-xl font-semibold text-orange-500">${formData.price}</span>
                    )}
                    <div className="flex space-x-4">
                        {/* Conditionally render Save/Cancel or Delete/Update buttons */}
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="bg-orange-500 text-black px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleDelete}
                                    className="bg-black text-orange-500 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="bg-orange-500 text-black px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                                >
                                    Update
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component that fetches items and loops through them to render ItemsCard.
const ItemsList: React.FC = () => {
    const [items, setItems] = useState<MyObject[]>([]);

    // Fetch all item data from API
    const getAllItems = async () => {
        try {
            const result = await axios.get('http://localhost:3000/api/owner/getResto');
            console.log('Fetched items:', result.data.Restaurants[0].MenuItems);
            setItems(result.data.Restaurants[0].MenuItems);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the component mounts
        getAllItems(); // Fetch items
    }, []);

    // Fetch loading state from Redux store (if required)
    const loading = useSelector((state: RootState) => state.restOwner.loading);

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    // Optimistic UI update for both update and delete actions
    const updateItems = (id: number, updatedItem: MyObject | null) => {
        if (updatedItem) {
            setItems((prevItems) =>
                prevItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
            );
        } else {
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));  // Remove item on delete
        }
    };

    return (
        <div className="container mx-auto py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {items.length > 0 ? (
                    items.map((item) => (
                        <ItemsCard
                            key={item.id} // Use a unique key for each item
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            imageUrl={item.imageUrl} // Pass the image URL to ItemsCard
                            updateItems={updateItems} // Pass updateItems function to ItemsCard
                        />
                    ))
                ) : (
                    <div className="text-center text-xl text-gray-500">No items available</div>
                )}
            </div>
        </div>
    );
};

export default ItemsList;
