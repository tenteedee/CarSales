import React, { useState, useEffect } from 'react';
import axios from '../axios';

const CarDetail = ({ carId }) => {
  const [carInfo, setCarInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const response = await axios.get(`car/detail/${carId}`);
        setCarInfo(response.data);
      } catch (err) {
        setError('Error fetching car information');
        console.error('Error fetching car information:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarInfo();
  }, [carId]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % (carInfo?.images?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + (carInfo?.images?.length || 1)) % (carInfo?.images?.length || 1)
    );
  };

  if (isLoading) {
    return <div aria-live="polite" aria-busy="true" className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div role="alert" className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!carInfo) {
    return <div className="text-center py-8">No car information available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{carInfo.brand} {carInfo.model}</h1>
      
      <div className="mb-6 relative">
        <img 
          src={carInfo.images[currentImageIndex].image_url} 
          alt={`${carInfo.brand} ${carInfo.model}`} 
          className="w-full h-64 object-cover rounded-lg"
        />
        {carInfo.images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p><strong>Type:</strong> {carInfo.type}</p>
          <p><strong>Price:</strong> ${parseFloat(carInfo.price).toLocaleString()}</p>
          <p><strong>Stock:</strong> {carInfo.stock} available</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{carInfo.description}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CarDetail;