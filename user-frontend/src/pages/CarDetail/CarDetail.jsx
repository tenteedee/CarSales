import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from '../../axios';
import './CarDetail.css';

const CarDetail = () => {
    const navigate = useNavigate();
    const { id: carId } = useParams();
    const [carInfo, setCarInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const fetchCarInfo = async () => {
            try {
                const response = await axios.get(`car/detail/${carId}`);
                setCarInfo(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Error fetching car information');
                navigate('/404');
                console.error(err.response.data.error);
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
    const handleMakeOrder = () => {
        const carData = {
            ...carInfo,
            selectedImageIndex: currentImageIndex
        };
        localStorage.setItem('carInfo', JSON.stringify(carData));
        navigate('/orders');
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    // Hàm để định dạng giá tiền
    const formatPrice = (price) => {
        if (!price) return 'N/A';
        return `$ ${parseFloat(price).toLocaleString('en-US')}`;
    };
    // Thêm component Breadcrumb
    const Breadcrumb = ({ brand, model }) => (
        <nav aria-label="breadcrumb" className="breadcrumb-container">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="/cars">Car Detail</a></li>
                {brand && <li className="breadcrumb-item"><a href={`/cars/${brand}`}>{brand}</a></li>}
                {model && <li className="breadcrumb-item active" aria-current="page">{model}</li>}
            </ol>
        </nav>
    );

    return (
        <>
            <Breadcrumb brand={carInfo?.brand?.name} model={carInfo?.model} />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-7">
                        {carInfo && carInfo.images && carInfo.images.length > 0 ? (
                            <div className="image-container">
                                <img
                                    src={carInfo.images[currentImageIndex].image_url}
                                    alt={`${carInfo.brand.name} ${carInfo.model}`}
                                    className="car-image"
                                />
                                {carInfo.images.length > 1 && (
                                    <>
                                        <button onClick={prevImage} className="image-nav-btn" aria-label="Previous image">&#8249;</button>
                                        <button onClick={nextImage} className="image-nav-btn" aria-label="Next image">&#8250;</button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                    <div className="col-md-5">
                        <h2>{carInfo ? `${carInfo.brand.name} ${carInfo.model}` : 'Car Name'}</h2>
                        <div className="d-flex align-items-center mb-2">
                            <span className="me-2">4.4 ★★★★☆</span>
                            <span className="me-2">1.8k Feedback</span>
                            <span>5.7k Sold</span>
                        </div>
                        <div className="price-container">
                            <span className="original-price">
                                {formatPrice(carInfo?.price * 1.2)}
                            </span>
                            <span className="discounted-price">
                                {formatPrice(carInfo?.price)}
                            </span>
                            <span className="discount-badge">20% Discount</span>
                        </div>
                        <div className="mb-3">
                            <span className="badge bg-danger me-2"> Authentic </span>
                            <span>Just from {formatPrice(carInfo?.price * 0.9)}</span>
                        </div>
                        <div className="mb-3">
                            <h6>Shop Voucher</h6>
                            {/* Add shop voucher details here */}
                        </div>
                        <div className="mb-3">
                            <span>{carInfo?.description}</span>
                        </div>
                        {/* <div className="mb-3">
                            <h6>Size</h6>
                            
                        </div> */}
                        <div className="quantity-section">
                            <div className="quantity-label">Quantity</div>
                            <div className="quantity-control">
                                <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                                <input type="text" value={quantity} readOnly className="quantity-input" />
                                <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                            </div>
                            <div className="stock-info">{carInfo?.stock || 0} products available</div>
                        </div>
                        <div className="action-buttons">
                            <button className="btn btn-primary add-to-cart" onClick={handleMakeOrder}>Buy now!</button>
                            <button className="btn btn-danger buy-now" onClick={handleRequestTestDrive}>Request test drive</button>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <h4>Leave a Comment:</h4>
                        <form role="form">
                            <div className="form-group">
                                <textarea className="form-control" rows="3" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-success mt-2">Submit</button>
                        </form>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <p><span className="badge bg-secondary">2</span> Comments:</p>
                        <div className="comment">
                            <div className="d-flex">
                                <img src="bandmember.jpg" className="rounded-circle me-3" height="50" width="50" alt="Avatar" />
                                <div>
                                    <h5>Anja <small className="text-muted">Sep 29, 2015, 9:12 PM</small></h5>
                                    <p>Bình luận 1</p>
                                </div>
                            </div>
                        </div>
                        <div className="comment mt-3">
                            <div className="d-flex">
                                <img src="bird.jpg" className="rounded-circle me-3" height="50" width="50" alt="Avatar" />
                                <div>
                                    <h5>John Row <small className="text-muted">Sep 25, 2015, 8:25 PM</small></h5>
                                    <p>Bình luận 2</p>
                                    <div className="nested-comment mt-3">
                                        <div className="d-flex">
                                            <img src="bird.jpg" className="rounded-circle me-3" height="50" width="50" alt="Avatar" />
                                            <div>
                                                <h5>Nested Bro <small className="text-muted">Sep 25, 2015, 8:28 PM</small></h5>
                                                <p>Bình luận 3</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarDetail;