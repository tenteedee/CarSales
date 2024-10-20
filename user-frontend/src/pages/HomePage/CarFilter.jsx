import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

function CarFilter() {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;

  useEffect(() => {
    const fetchBrandsAndTypes = async () => {
      try {
        const brandResponse = await axios.get('/car/brand');
        setBrands(brandResponse.data);

        const typeResponse = await axios.get('/car/type');
        setTypes(typeResponse.data);
      } catch (error) {
        console.error('Error fetching brands/types:', error);
      }
    };

    fetchBrandsAndTypes();
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await axios.get('/car/all');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchParams = {
      brand: selectedBrand,
      type: selectedType,
      minPrice,
      maxPrice,
    };

    try {
      const response = await axios.get('/car/search', {
        params: searchParams,
      });
      setCars(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching cars based on search:', error);
    }
  };

  // Hàm định dạng giá tiền
  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMinPrice(formatCurrency(value));
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPrice(formatCurrency(value));
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        activeLabel=""
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <section className="b-search">
      <div className="container">
        <h1>{t('SEARCH.HEADER')}</h1>
        <div className="b-search__main">
          <h4>{t('SEARCH.SUBHEADER')}</h4>
          <form onSubmit={handleSearch} className="b-search__main-form">
            <div className="row">
              <div className="col-xs-16 col-md-12">
                <div className="m-firstSelects">
                  <div className="col-md-3">
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value="">{t('SEARCH.SELECT_BRAND')}</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <span className="fa fa-caret-down"></span>
                  </div>

                  <div className="col-md-3">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">{t('SEARCH.SELECT_TYPE')}</option>
                      {types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    <span className="fa fa-caret-down"></span>
                  </div>

                  <div className="col-md-4">
                    <label>{t('SEARCH.PRICE_RANGE')}</label>
                    <Slider
                      range
                      min={0}
                      max={50000} // Giới hạn giá trị tối đa, bạn có thể thay đổi
                      value={[minPrice || 0, maxPrice || 50000]}
                      onChange={([newMinPrice, newMaxPrice]) => {
                        setMinPrice(newMinPrice);
                        setMaxPrice(newMaxPrice);
                      }}
                      step={1000} // Bước nhảy, ví dụ mỗi lần kéo sẽ thay đổi 1000 đơn vị
                      tipFormatter={(value) => `${formatCurrency(value)}`}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                      }}
                    >
                      <span>
                        {t('SEARCH.MIN_PRICE')}: {formatCurrency(minPrice)}
                      </span>
                      <span>
                        {t('SEARCH.MAX_PRICE')}: {formatCurrency(maxPrice)}
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="col-md-2">
                    {t('SEARCH.SEARCH') + ' '}
                    <span className="fa fa-search"></span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="car-results flex justify-center">
            <h3>{t('SEARCH.SEARCH_RESULTS')}</h3>
            {totalPages > 1 && (
              <Pagination className="justify-content-center mt-4">
                {paginationItems}
              </Pagination>
            )}
            <div className="row">
              {currentCars.length === 0 ? (
                <p>{t('SEARCH.NO_CARS_FOUND')}</p>
              ) : (
                currentCars.map((car) => (
                  <div key={car.id} className="col-xs-12 col-md-4 car-item ">
                    <Link
                      to={`/car/detail/${car.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        src={
                          car.images && car.images.length > 0
                            ? car.images[0].image_url
                            : 'default-car.png'
                        }
                        alt={car.model}
                        className="img-responsive"
                        style={{
                          width: '220px',
                          height: '120px',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </Link>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '220px',
                      }}
                    >
                      <div>
                        <h5>{car.model}</h5>
                      </div>
                      <p>
                        {t('CAR.PRICE', {
                          price: formatCurrency(parseInt(car.price)),
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarFilter;
