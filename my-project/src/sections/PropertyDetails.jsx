import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = ({ listings }) => {
    const { id } = useParams();
    const selectedProperty = listings.find(item => item.id.toString() === id);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Resim indeksi

    if (!selectedProperty) {
        return <div className="text-center text-lg">İlan bulunamadı.</div>;
    }

    // Modalı açma ve kapatma fonksiyonları
    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === selectedProperty.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? selectedProperty.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Ana resim */}
            <div className="grid grid-cols-1 gap-4">
                {selectedProperty.mainImage && (
                    <img
                        src={`http://localhost:5000/${selectedProperty.mainImage}`}
                        alt={`Property ${selectedProperty.id}`}
                        className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                        onClick={() => openModal(-1)} // Ana resme tıklanınca modalı aç
                        onError={(e) => {
                            e.target.src = 'default-image.jpg';
                            e.target.onerror = null;
                        }}
                    />
                )}
            </div>

            {/* Yan yana 4 resim olacak şekilde diğer resimleri göster */}
            <div className="mt-8 grid grid-cols-4 gap-4">
                {selectedProperty.images && selectedProperty.images.length > 0 ? (
                    selectedProperty.images.map((image, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000/${image}`}
                            alt={`Property ${selectedProperty.id} - ${index}`}
                            className="w-full h-auto max-h-[200px] object-cover rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
                            onClick={() => openModal(index)} // Resme tıklandığında modalı aç
                        />
                    ))
                ) : (
                    <p className="col-span-4 text-center">Bu ilan için başka resim bulunmamaktadır.</p>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative bg-white p-4 rounded shadow-lg">
                        {/* Modal içinde sağ ve sol oklar */}
                        {selectedImageIndex >= 0 && (
                            <img
                                src={
                                    selectedImageIndex === -1
                                        ? `http://localhost:5000/${selectedProperty.mainImage}`
                                        : `http://localhost:5000/${selectedProperty.images[selectedImageIndex]}`
                                }
                                alt="Büyük Resim"
                                className="w-full h-auto max-h-[90vh] object-contain"
                            />
                        )}
                        <button
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 transition duration-200"
                            onClick={prevImage}
                            disabled={selectedProperty.images.length === 0}
                        >
                            &#10094; {/* Sol ok */}
                        </button>
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 transition duration-200"
                            onClick={nextImage}
                            disabled={selectedProperty.images.length === 0}
                        >
                            &#10095; {/* Sağ ok */}
                        </button>
                        <button
                            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                            onClick={closeModal}
                        >
                            Kapat
                        </button>
                    </div>
                </div>
            )}

            {/* İlan detayları */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedProperty.title}</h1>
                <p className="mt-2 text-gray-600 text-lg">{selectedProperty.description}</p>

                <ul className="mt-4 list-disc list-inside text-gray-800">
                    <li className="flex justify-between py-1">
                        <span>Fiyat:</span>
                        <span className="font-semibold">{selectedProperty.price} TL</span>
                    </li>
                    <li className="flex justify-between py-1">
                        <span>Adres:</span>
                        <span className="font-semibold">{selectedProperty.address}</span>
                    </li>
                    <li className="flex justify-between py-1">
                        <span>Oda Sayısı:</span>
                        <span className="font-semibold">{selectedProperty.rooms}</span>
                    </li>
                    <li className="flex justify-between py-1">
                        <span>Yatak Odası:</span>
                        <span className="font-semibold">{selectedProperty.bedrooms}</span>
                    </li>
                    <li className="flex justify-between py-1">
                        <span>Alan:</span>
                        <span className="font-semibold">{selectedProperty.size} m²</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PropertyDetails;
