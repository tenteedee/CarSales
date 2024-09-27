import React, { useState, useEffect } from 'react';
import axios from '../axios';

function CarFilter() {
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

        console.log('Search params:', searchParams);

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
                <h1>UNSURE WHICH VEHICLE YOU ARE LOOKING FOR? FIND IT HERE</h1>
                <div className="b-search__main">
                    <h4>SELECT YOUR SUITABLE VEHICLE</h4>
                    <form
                        onSubmit={handleSearch}
                        className="b-search__main-form"
                    >
                        <div className="row">
                            <div className="col-xs-16 col-md-12">
                                <div className="m-firstSelects">
                                    <div className="col-md-3">
                                        <select
                                            value={selectedBrand}
                                            onChange={(e) =>
                                                setSelectedBrand(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                Select Brand
                                            </option>
                                            {brands.map((brand) => (
                                                <option
                                                    key={brand.id}
                                                    value={brand.id}
                                                >
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="fa fa-caret-down"></span>
                                    </div>

                                    <div className="col-md-3">
                                        <select
                                            value={selectedType}
                                            onChange={(e) => {
                                                console.log(
                                                    'Type ID Selected:',
                                                    e.target.value
                                                );
                                                setSelectedType(e.target.value);
                                            }}
                                        >
                                            <option value="">
                                                Select Type
                                            </option>
                                            {types.map((type) => (
                                                <option
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="fa fa-caret-down"></span>
                                    </div>

                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            placeholder="Min Price"
                                            value={minPrice}
                                            onChange={(e) =>
                                                setMinPrice(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            placeholder="Max Price"
                                            value={maxPrice}
                                            onChange={(e) =>
                                                setMaxPrice(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button type="submit" className='col-md-2'>
                                        Search
                                        <span className="fa fa-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="car-results">
                        <h4>Search Results</h4>
                        <div className="row">
                            {cars.length === 0 ? (
                                <p>No cars found!</p>
                            ) : (
                                cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="col-xs-12 col-md-4 car-item"
                                    >
                                        <img
                                            src={
                                                car.images &&
                                                    car.images.length > 0
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
                                            <p>Price: ${car.price}</p>
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
