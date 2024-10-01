import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import './CarDetail.css'; // Import the custom CSS file

const CarDetail = () => {
    const navigate = useNavigate();
    const { id: carId } = useParams();
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
                navigate('/404');
                console.error('Error fetching car information:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (carId) {
            fetchCarInfo();
        }
    }, [carId]);

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? carInfo.images.length - 1 : prevIndex - 1
        );
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === carInfo.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }

    if (!carInfo) {
        return (
            <div className="text-center py-8">No car information available</div>
        );
    }

    const handleRequestTestDrive = () => {
        localStorage.setItem('selectedCar', JSON.stringify(carInfo));
        navigate('/test-drive');
    };

    return (
        <div className="container my-5">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h1 className="card-title text-center">
                        {carInfo?.brand.name} {carInfo?.model}
                    </h1>

                    <div className="position-relative mb-4 image-container">
                        {carInfo?.images?.length > 0 ? (
                            <img
                                src={
                                    carInfo.images[currentImageIndex]?.image_url
                                }
                                alt={`${carInfo.brand.name} ${carInfo.model}`}
                                className="img-fluid rounded w-100"
                                style={{ height: '350px', objectFit: 'cover' }}
                            />
                        ) : (
                            <p>No images available</p>
                        )}
                        {carInfo?.images?.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="image-nav-btn"
                                    aria-label="Previous image"
                                >
                                    &#8249;
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="image-nav-btn"
                                    aria-label="Next image"
                                >
                                    &#8250;
                                </button>
                            </>
                        )}
                    </div>
                    <div className="row mb-4" >{carInfo?.description || ''}</div>

                    <div className="row mb-4">
                        <h2>Details</h2>
                        <div className="col-md-2 mb-1"></div>
                        <div
                            className="col-md-4 mb-3"
                            style={{ textAlign: 'left', fontSize: '16px' }}
                        >
                            <table>
                                <th style={{ width: '100px' }}></th>
                                <tr>
                                    <th>
                                        <strong>Brand: </strong>{' '}
                                    </th>
                                    <td>{carInfo?.brand.name || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Body type: </strong>
                                    </td>
                                    <td>{carInfo?.type.name || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Model: </strong>{' '}
                                    </td>
                                    <td>{carInfo?.model || 'N/A'}</td>
                                </tr>
                            </table>
                        </div>
                        <div
                            className="col-md-4 mb-3"
                            style={{ textAlign: 'left', fontSize: '16px' }}
                        >
                            <table>
                                <th style={{ width: '100px' }}></th>
                                <tr>
                                    <th>
                                        <strong>Price: </strong>
                                    </th>
                                    <td>
                                        ${' '}
                                        {carInfo?.price
                                            ? parseFloat(
                                                  carInfo.price
                                              ).toLocaleString()
                                            : 'N/A'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Stock: </strong>
                                    </td>
                                    <td>{carInfo?.stock || 'N/A'} available</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="text-center" id="btn-container">
                        <div className="text-center" id='submit-btn'>
                            <button className="btn btn-primary">
                                Make an Order
                            </button>
                        </div>
                        <div className="text-center" id='submit-btn'>
                            <button className="btn btn-primary" onClick={handleRequestTestDrive}>
                                Request Test Drive
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
