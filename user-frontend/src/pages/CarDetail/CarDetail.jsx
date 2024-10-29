import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/priceFormat';

import './CarDetail.css';

const CarDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [carInfo, setCarInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [showroomId, setShowroomId] = useState(null);
    const [selectedShowroom, setSelectedShowroom] = useState('');
    const [showrooms, setShowrooms] = useState([]);
    const [carColors, setCarColors] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    useEffect(() => {
        const fetchCarInfo = async () => {
            if (!id) {
                console.error('Car ID is undefined in fetchCarInfo');
                setError('Không thể tải thông tin xe. ID xe không hợp lệ.');
                setIsLoading(false);
                return;
            }
            try {
                console.log('Fetching car info for carId:', id);
                const response = await axios.get(`car/detail/${id}`);
                console.log('axios Response:', response);
                setCarInfo(response.data);
            } catch (err) {
                console.error('Error fetching car info:', err);
                setError('Lỗi khi tải thông tin xe');
                navigate('/404');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarInfo();
        console.log('carInfo', carInfo);
        const fetchAllShowrooms = async () => {
            try {
                const response = await axios.get('/showroom/list');
                if (Array.isArray(response.data)) {
                    setShowrooms(response.data);
                    console.log('Showrooms fetched:', response.data);
                } else {
                    console.error('Unexpected data structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching showrooms:', error);
            }
        };
        fetchAllShowrooms();


    }, [id, navigate]);

    const handleMakeOrder = async () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để đặt hàng", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return;
        }

        const orderData = {
            customer_id: user.id,
            car_id: carInfo.id,
            quantity: quantity,
            payment_price: carInfo.price * quantity,
            total_price: carInfo.price * quantity,
            order_status: 'pending',
            showroom_id: showroomId,

        };

        try {
            const response = await axios.post('/order/create', orderData);
            if (response.data && response.data.order.id) {
                navigate(`/order-confirmation/${response.data.order.id}`);
            } else {
                throw new Error('Không thể tạo đơn hàng');
            }
        } catch (error) {
            toast.error("Error placing order: " + error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }

    };
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

    const handleRequestTestDrive = () => {
        localStorage.setItem('selectedCar', JSON.stringify(carInfo));
        navigate('/test-drive');
    };
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const formatCurrency = (value) => {
        if (!value) return '';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(value);
    };
    
    // Thêm component Breadcrumb
    const Breadcrumb = ({ brand, model }) => (
        <nav aria-label="breadcrumb" className="breadcrumb-container">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li className="breadcrumb-item"><a href="/cars">Ô tô</a></li>
                {brand && <li className="breadcrumb-item"><a href={`/cars/${brand}`}>{brand}</a></li>}
                {model && <li className="breadcrumb-item active" aria-current="page">{model}</li>}
            </ol>
        </nav>
    );
    const selectColor = (color) => {
        setSelectedColor(color);
        console.log(`Color selected: ${color}`); //Chưa lấy được màu đợi bảng
    };

    useEffect(() => {
        if (selectedShowroom) {
            console.log('CarInfoAfter', carInfo);
            // thêm bất kỳ hành động nào khác ở đây nếu cần
        }
    }, [selectedShowroom]);

    return (
        <>
            <Breadcrumb brand={carInfo?.brand?.name} model={carInfo?.model} />
            <div className="container mt-4">
                <div className="product-detail-container">
                    <div className="product-image col-md-7">
                        {carInfo?.images?.length > 0 ? (
                            <div className="image-gallery">
                                <div className="image-container">
                                    <img src={carInfo.images[currentImageIndex].image_url} alt={`${carInfo.brand.name} ${carInfo.model}`} className="car-image" />
                                    {carInfo.images.length > 1 && (
                                        <>
                                            <button onClick={prevImage} className="image-nav-btn" aria-label="Previous image">&#8249;</button>
                                            <button onClick={nextImage} className="image-nav-btn" aria-label="Next image">&#8250;</button>
                                        </>
                                    )}
                                </div>
                                <div className="thumbnail-container">
                                    {carInfo.images.map((img, index) => (
                                        <img key={`thumbnail-${index}`} src={img.image_url} alt={`Thumbnail ${index}`} className="thumbnail" onClick={() => setCurrentImageIndex(index)} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <div className="product-description col-md-5">
                        <h2>{carInfo ? `${carInfo.brand.name} ${carInfo.model}` : 'Car Name'}</h2>
                        <div className="d-flex align-items-center mb-2">
                            <span className="me-2">4.4 ★★★★☆</span>
                            <span className="me-2">a Đánh Giá</span>
                            <span>b Đã Bán</span>
                        </div>
                        <div className="price-container">
                            <span className="original-price">
                                {formatCurrency(carInfo?.price * 1.2)}
                            </span>
                            <span className="discounted-price">
                                {formatCurrency(carInfo?.price)}
                            </span>
                            <span className="discount-badge">20% GIẢM</span>
                        </div>
                        <div className="mb-3">
                            <span className="badge bg-danger me-2"> THƯƠNG HIỆU</span>
                            <span>Chỉ từ {formatCurrency(carInfo?.price * 0.9)}</span>
                        </div>
                        <div className="mb-3">
                            <h6>Mã Giảm Giá Của Shop</h6>
                            {/* Add shop voucher details here */}
                        </div>
                        <div className="mb-3">
                            <h6>Vận Chuyển</h6>
                            <span>Miễn phí vận chuyển</span>
                        </div>
                        <div className="mb-3">
                            <h6>Size</h6>
                            {/* Add size options here */}
                        </div>
                        <div className="quantity-section">
                            <div className="quantity-label">Số Lượng</div>
                            <div className="quantity-control">
                                <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                                <input type="text" value={quantity} readOnly className="quantity-input" />
                                <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                            </div>
                            <div className="stock-info">{carInfo?.stock || 0} sản phẩm có sẵn</div>
                        </div>
                        {carInfo ? (carInfo.description) : 'Car Name'}

                        <div className="action-buttons">
                            <button
                                className="btn btn-primary add-to-cart"
                                onClick={handleMakeOrder}
                                disabled={!carInfo?.stock || quantity < 1} // Disable if out of stock or quantity is invalid
                            >
                                Mua Ngay
                            </button>
                            <button className="btn btn-danger buy-now" onClick={handleRequestTestDrive}>Yêu Cầu Lái Thử</button>
                        </div>

                        <div className="showroom-selection">
                            <label htmlFor="showroomSelect">Choose a Showroom:</label>
                            <select id="showroomSelect" value={selectedShowroom} onChange={(e) => {
                                const newShowroomId = e.target.value;
                                setSelectedShowroom(newShowroomId);
                                setShowroomId(newShowroomId);  // Ensure this line correctly updates the showroomId state
                                console.log(`Showroom selected: ${newShowroomId}`);  // Debugging line to check the selected showroom ID
                            }}>
                                <option value="">Select a showroom</option>
                                {showrooms.length > 0 ? (
                                    showrooms.map(showroom => (
                                        <option key={showroom.id} value={showroom.id}>
                                            {showroom.name} - {showroom.address}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No showrooms available</option>
                                )}
                            </select>
                            <p>Showroom ID: {showroomId}</p>
                            <p>Showroom ID: {showroomId}</p>

                            <p>Showroom ID: {showroomId}</p>

                            <p>Showroom ID: {showroomId}</p>

                            <p>Showroom ID: {showroomId}</p>
                            <p>Showroom ID: {showroomId}</p>

                            <p>Showroom ID: {showroomId}</p>

                            <p>Showroom ID: {showroomId}</p>

                        </div>
                        </div>
                    </div>

                </div>

                
            

        </>
    );
};

export default CarDetail;
