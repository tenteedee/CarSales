import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import formatCurrency from './../../utils/formatCurrency';
import './CarDetail.css';
import CostEstimate from './CostEstimate';
import FeedbackList from './FeedbackList';

const CarDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const user = useSelector((state) => state.auth.token);
    const [carInfo, setCarInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [setSelectedVariant] = useState(null);
    const [showroomId, setShowroomId] = useState(null);
    const [selectedShowroom, setSelectedShowroom] = useState('');
    const [showrooms, setShowrooms] = useState([]);
    const [carColors, setCarColors] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [currentLang, setCurrentLang] = useState(
        localStorage.getItem('language') || 'en'
    );
    const [insurances, setInsurances] = useState([]);
    const [insuranceTypes, setInsuranceTypes] = useState([]);
    const [selectedInsurance, setSelectedInsurance] = useState(null);

    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        // Fetch insurances from the API
        axios
            .get('/insurance/all')
            .then((response) => {
                const data = response.data;
                setInsurances(data);
                // Get unique insurance types for the menu
                const types = [...new Set(data.map((item) => item.type))];
                setInsuranceTypes(types);
            })
            .catch((error) =>
                console.error('Error fetching insurances:', error)
            );
    }, []);

    useEffect(() => {
        const fetchCarInfo = async () => {
            if (!id) {
                setError('Không thể tải thông tin xe. ID xe không hợp lệ.');
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get(`car/detail/${id}`);
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
        const fetchAllShowrooms = async () => {
            try {
                const response = await axios.get('/showroom/list');
                if (Array.isArray(response.data)) {
                    setShowrooms(response.data);
                } else {
                    console.error('Unexpected data structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching showrooms:', error);
            }
        };
        fetchAllShowrooms();
    }, [id, navigate]);

    useEffect(() => {
        const handleLanguageChange = () => {
            const savedLanguage = localStorage.getItem('language') || 'en';
            setCurrentLang(savedLanguage);
        };

        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

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

    // Thêm component Breadcrumb
    const Breadcrumb = ({ brand, model }) => (
        <nav aria-label="breadcrumb" className="breadcrumb-container">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="/">Trang Chủ</a>
                </li>
                <li className="breadcrumb-item">
                    <a href="/cars">Ô tô</a>
                </li>
                {brand && (
                    <li className="breadcrumb-item">
                        <a href={`/cars/${brand}`}>{brand}</a>
                    </li>
                )}
                {model && (
                    <li className="breadcrumb-item active" aria-current="page">
                        {model}
                    </li>
                )}
            </ol>
        </nav>
    );
    const selectColor = (color) => {
        setSelectedColor(color);
    };
    // const handleMakeOrder = async () => {
    // 	if (!user) {
    // 		toast.error('Vui lòng đăng nhập để đặt hàng', {
    // 			position: 'top-right',
    // 			autoClose: 3000,
    // 			hideProgressBar: false,
    // 			closeOnClick: true,
    // 			pauseOnHover: true,
    // 			draggable: true,
    // 			progress: undefined,
    // 		});
    // 		return;
    // 	}
    // 	if(!showroomId){
    // 		toast.error('Vui lòng chọn showroom nhận xe', {
    // 			position: 'top-right',
    // 			autoClose: 3000,
    // 			hideProgressBar: false,
    // 			closeOnClick: true,
    // 			pauseOnHover: true,
    // 			draggable: true,
    // 			progress: undefined,
    // 		});
    // 		return;
    // 	}

    // };
    const handleMakeOrder = () => {
        if (!user) {
            toast.error('Vui lòng đăng nhập để đặt hàng', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        setShowModal(true);
    };

    const handleCreateOrder = async () => {
        if (!user) {
            toast.error('Vui lòng đăng nhập để đặt hàng', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        if (!showroomId) {
            toast.error('Vui lòng chọn showroom nhận xe', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
        const confirmMessage = selectedInsurance
            ? 'Bạn có chắc chắn muốn đặt mua xe kèm bảo hiểm này?'
            : 'Bạn có chắc chắn muốn đặt mua xe mà không kèm bảo hiểm?';

        const confirmed = window.confirm(confirmMessage);
        if (!confirmed) return; // Nếu người dùng không xác nhận, dừng việc tạo đơn hàng

        const orderData = {
            car_id: carInfo.id,
            quantity: quantity,
            showroom_id: showroomId,
            insurance: selectedInsurance || null, // Nếu không mua bảo hiểm, đặt là null
        };

        try {
            const response = await axios.post('/order/create', orderData);
            if (response.data && response.data.order.id) {
                navigate(`/order-confirmation/${response.data.order.id}`);
            } else {
                throw new Error('Không thể tạo đơn hàng');
            }
        } catch (error) {
            toast.error('Error placing order: ' + error.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const closeModal = () => {
        setShowModal(false); // Close modal
    };
    return (
        <>
            <Breadcrumb brand={carInfo?.brand?.name} model={carInfo?.model} />
            <div className="container mt-4">
                <div className="product-detail-container">
                    <div className="product-image col-md-7">
                        {carInfo?.images?.length > 0 ? (
                            <div className="image-gallery">
                                <div className="image-container">
                                    <img
                                        src={
                                            carInfo.images[currentImageIndex]
                                                .image_url
                                        }
                                        alt={`${carInfo.brand.name} ${carInfo.model}`}
                                        className="car-image"
                                    />
                                    {carInfo.images.length > 1 && (
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
                                <div className="thumbnail-container">
                                    {carInfo.images.map((img, index) => (
                                        <img
                                            key={`thumbnail-${index}`}
                                            src={img.image_url}
                                            alt={`Thumbnail ${index}`}
                                            className="thumbnail"
                                            onClick={() =>
                                                setCurrentImageIndex(index)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <div className="product-description col-md-5">
                        <h2>
                            {carInfo
                                ? `${carInfo.brand.name} ${carInfo.model}`
                                : 'Car Name'}
                        </h2>
                        <div className="d-flex align-items-center mb-2">
                            <span className="me-2">4.4 ★★★★☆</span>
                            {/* <span className="me-2">Đánh Giá</span>
              <span>Đã Bán</span> */}
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
                            <span className="badge bg-danger me-2">
                                {' '}
                                THƯƠNG HIỆU
                            </span>
                            <span>
                                Chỉ từ {formatCurrency(carInfo?.price * 0.9)}
                            </span>
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
                        {/*<div className='quantity-section'>*/}
                        {/*  <div className='quantity-label'>Số Lượng</div>*/}
                        {/*  <div className='quantity-control'>*/}
                        {/*	  <button className='quantity-btn' onClick={decreaseQuantity}>*/}
                        {/*		  -*/}
                        {/*	  </button>*/}
                        {/*	  <input*/}
                        {/*		type='text'*/}
                        {/*		value={quantity}*/}
                        {/*		readOnly*/}
                        {/*		className='quantity-input'*/}
                        {/*	  />*/}
                        {/*	  <button className='quantity-btn' onClick={increaseQuantity}>*/}
                        {/*		  +*/}
                        {/*	  </button>*/}
                        {/*  </div>*/}
                        {/*  <div className='stock-info'>*/}
                        {/*	  {carInfo?.stock || 0} sản phẩm có sẵn*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        {carInfo ? carInfo.description : 'Car Name'}

                        <div className="action-buttons">
                            <button
                                className="btn btn-primary add-to-cart mt-6"
                                onClick={handleMakeOrder}
                                disabled={!carInfo?.stock || quantity < 1} // Disable if out of stock or quantity is invalid
                            >
                                Mua Ngay
                            </button>
                            <button
                                className="btn btn-danger buy-now"
                                onClick={handleRequestTestDrive}
                            >
                                Yêu Cầu Lái Thử
                            </button>
                        </div>

                        {/*<div className='showroom-selection'>*/}
                        {/*  <label htmlFor='showroomSelect'>Choose a Showroom:</label>*/}
                        {/*  <select*/}
                        {/*	id='showroomSelect'*/}
                        {/*	value={selectedShowroom}*/}
                        {/*	required={true}*/}
                        {/*	onChange={(e) => {*/}
                        {/*		const newShowroomId = e.target.value;*/}
                        {/*		setSelectedShowroom(newShowroomId);*/}
                        {/*		setShowroomId(newShowroomId); // Ensure this line correctly updates the showroomId state*/}
                        {/*	}}*/}
                        {/*	className={'form-control'}*/}
                        {/*  >*/}
                        {/*	  <option value=''>Select a showroom</option>*/}
                        {/*	  {showrooms.length > 0 ? (*/}
                        {/*		showrooms.map((showroom) => (*/}
                        {/*		  <option key={showroom.id} value={showroom.id}>*/}
                        {/*			  {showroom.name} - {showroom.address}*/}
                        {/*		  </option>*/}
                        {/*		))*/}
                        {/*	  ) : (*/}
                        {/*		<option disabled>No showrooms available</option>*/}
                        {/*	  )}*/}
                        {/*  </select>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <CostEstimate price={carInfo?.price} />
                <div className="row">
                    <div className="col-md-12">
                        <div
                            className="centered-content"
                            dangerouslySetInnerHTML={{
                                __html: carInfo?.content,
                            }}
                        />
                    </div>
                </div>
                <FeedbackList carId={id} />
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h4 className="modal-title">Thông Tin Xe</h4>
                            <button
                                className="close-button"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Thương hiệu: {carInfo?.brand.name}</p>
                            <p>Model: {carInfo?.model}</p>
                            <p>Giá: {formatCurrency(carInfo?.price)}</p>
                            <div className="showroom-selection">
                                <label htmlFor="showroomSelect">
                                    Choose a Showroom:
                                </label>
                                <select
                                    id="showroomSelect"
                                    value={selectedShowroom}
                                    required={true}
                                    onChange={(e) => {
                                        const newShowroomId = e.target.value;
                                        setSelectedShowroom(newShowroomId);
                                        setShowroomId(newShowroomId); // Ensure this line correctly updates the showroomId state
                                    }}
                                    className={'form-control'}
                                >
                                    <option value="">Select a showroom</option>
                                    {showrooms.length > 0 ? (
                                        showrooms.map((showroom) => (
                                            <option
                                                key={showroom.id}
                                                value={showroom.id}
                                            >
                                                {showroom.name} -{' '}
                                                {showroom.address}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>
                                            No showrooms available
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="insurance-options">
                                <label
                                    htmlFor="insuranceSelect"
                                    className="form-label"
                                >
                                    Chọn bảo hiểm thân vỏ:
                                </label>
                                <select
                                    id="insuranceSelect"
                                    className="form-select form-control"
                                    value={selectedInsurance}
                                    onChange={(e) =>
                                        setSelectedInsurance(e.target.value)
                                    }
                                >
                                    <option value="">
                                        Không mua bảo hiểm thân vỏ
                                    </option>
                                    {insurances
                                        .filter(
                                            (insurance) => insurance.type === 2
                                        )
                                        .map((insurance) => {
                                            const calculatedPrice = (
                                                (carInfo.price *
                                                    insurance.price) /
                                                100
                                            ).toFixed(0);
                                            return (
                                                <option
                                                    key={insurance.id}
                                                    value={insurance.id}
                                                >
                                                    {insurance.name} -{' '}
                                                    {formatCurrency(
                                                        calculatedPrice
                                                    )}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleCreateOrder()}
                            >
                                Đặt mua
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={closeModal}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarDetail;
