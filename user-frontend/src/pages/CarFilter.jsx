import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CarFilter() {
    const { t } = useTranslation();
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [cars, setCars] = useState([]);

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
        } catch (error) {
            console.error('Error fetching cars based on search:', error);
        }
    };

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

                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            placeholder={t('SEARCH.MIN_PRICE')}
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            placeholder={t('SEARCH.MAX_PRICE')}
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="col-md-2">
                                        {t('SEARCH.SEARCH')}
                                        <span className="fa fa-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="car-results">
                        <h4>{t('SEARCH.SEARCH_RESULTS')}</h4>
                        <div className="row">
                            {cars.length === 0 ? (
                                <p>{t('SEARCH.NO_CARS_FOUND')}</p>
                            ) : (
                                cars.map((car) => (
                                    <div key={car.id} className="col-xs-12 col-md-4 car-item">
                                        <Link to={`/car/detail/${car.id}`} style={{ textDecoration: 'none' }}></Link>
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
                                            <p>{t('CAR.PRICE', { price: car.price })}</p>
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
