import React, { useState } from 'react';
import axios from 'axios';

const AddListing = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        mainImage: null,
        images: [],
        size: '',
        address: '',
        rooms: '',
        bedrooms: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMainImageChange = (e) => {
        setFormData({ ...formData, mainImage: e.target.files[0] });
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('mainImage', formData.mainImage);
        formData.images.forEach((image) => {
            formDataToSend.append('images', image);
        });
        formDataToSend.append('size', formData.size);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('rooms', formData.rooms);
        formDataToSend.append('bedrooms', formData.bedrooms);

        try {
            const response = await axios.post('http://localhost:5000/api/listings', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Listing created:', response.data);
            alert("İlan başarıyla eklendi!");
            setFormData({
                title: '',
                description: '',
                price: '',
                mainImage: null,
                images: [],
                size: '',
                address: '',
                rooms: '',
                bedrooms: ''
            });
        } catch (error) {
            console.error('Error creating listing:', error);
            if (error.response) {
                alert(`Hata: ${error.response.data.error || 'İlan eklenirken bir hata oluştu.'}`);
            } else {
                alert('Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Yeni İlan Ekle</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Başlık:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">İlan Açıklaması:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Fiyat:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">Ana Resim:</label>
                    <input
                        type="file"
                        id="mainImage"
                        onChange={handleMainImageChange}
                        className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Diğer Resimler:</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        onChange={handleImagesChange}
                        className="mt-1 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700">Boyut (m²):</label>
                    <input
                        type="number"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">Oda Sayısı:</label>
                    <input
                        type="number"
                        id="rooms"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Yatak Odası Sayısı:</label>
                    <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                    İlan Ekle
                </button>
            </form>
        </div>
    );
};

export default AddListing;
