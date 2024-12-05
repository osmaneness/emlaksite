import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteProp() {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/listings');
                setListings(response.data);
            } catch (error) {
                setError('İlanlar yüklenirken hata oluştu.');
                console.error('Error fetching listings:', error);
            }
        };
        fetchListings();
    }, []);

    const handleDeleteListing = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/listings/${id}`);
            setListings(listings.filter(listing => listing.id !== id));
            console.log('İlan silindi');
        } catch (error) {
            setError('İlan silinemedi.');
            console.error('Error deleting listing:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">İlanları Sil</h1>
            {error && <p className="text-red-600 text-center">{error}</p>}
            <ul className="space-y-4">
                {listings.map(listing => (
                    <li key={listing.id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
                        <span className="text-lg font-medium mb-2">{listing.title}</span>
                        {listing.mainImage && (
                            <img
                                src={`http://localhost:5000/${listing.mainImage}`}
                                alt={listing.title}
                                className="mb-2 w-64 h-32 object-cover rounded-lg"
                            />
                        )}
                        <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeleteProp;
