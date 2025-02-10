import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddNewItemCard: React.FC = () => {
    // State to hold input values
    const [name, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    // Function to handle adding item
    const addItem = async (obj: { name: string, price: string, category: string, description: string }) => {
        try {
            // Send POST request with the object data
            await axios.post("http://localhost:3000/api/owner/create", obj);
            console.log("Item added successfully!");

            // Show success alert using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Item Added!',
                text: 'Your item has been successfully added.',
                background: '#000', // Black background
                color: '#fff', // White text
                confirmButtonColor: '#28a745', // Green color for confirm button
                confirmButtonText: 'Okay', // Custom confirm button text
                padding: '20px', // Padding around the content
                showConfirmButton: true,
            }).then(() => {
                // Scroll to the top after the success alert
                window.location.reload();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
                window.scrollTo(0, 0)
                // Optionally, you could trigger any other UI update here, like refreshing the list of items
            });
        } catch (err) {
            console.log("Error from addItem:", err);

            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                background: '#000', // Black background
                color: '#fff', // White text
                confirmButtonColor: '#dc3545', // Red color for error button
                confirmButtonText: 'Retry',
                padding: '20px',
            });
        }
    };

    // Function to handle button click
    const handleAddItem = () => {
        const newItem = {
            name,
            price,
            category,
            description
        };

        // Call addItem with the newItem object
        addItem(newItem);
    };

    return (
        <div className="flex justify-center items-center min-h-screen pt-20">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96 md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add New Product</h2>

                <div className="space-y-6">
                    {/* Pair 1: Two Inputs on the Same Line */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <input
                            type="text"
                            className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setProductName(e.target.value)} // Update state on input change
                        />
                        <input
                            type="text"
                            className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} // Update state on input change
                        />
                    </div>

                    {/* Pair 2: Two Inputs on the Same Line */}
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <input
                            type="text"
                            className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} // Update state on input change
                        />
                    </div>

                    {/* Description Input */}
                    <textarea
                        className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update state on input change
                    ></textarea>

                    {/* Submit Button */}
                    <button
                        className="w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition-all mt-6"
                        onClick={handleAddItem} // Trigger handleAddItem function when clicked
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewItemCard;
