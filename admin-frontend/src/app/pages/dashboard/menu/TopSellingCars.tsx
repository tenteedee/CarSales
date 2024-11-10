import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import axios from "axios";
import {Brand} from "../../../modules/car/core/models";
const API_URL = process.env.REACT_APP_API_URL

export const getTopSellingCars = async () => {
    try {
        const response = await axios.get(API_URL + '/home/car/statistic');
        return response.data.data; // Trả về dữ liệu danh sách xe bán chạy nhất
    } catch (error) {

    }
};
interface Car {
    car_id: number;
    sales_count: number;
    car: {
        brand ?: Brand;
        model: string;
    };
}

const TopSellingCars: React.FC = () => {
    const [topSellingCars, setTopSellingCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopSellingCars = async () => {
            try {
                const data = await getTopSellingCars();
                setTopSellingCars(data);
            } catch (error: any) {
                toast.error(error.message || 'Failed to fetch top-selling cars', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTopSellingCars();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title fw-bold">Top Selling Car</h3>
            </div>
            <div className="card-body">
                <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                    <thead>
                    {/*<tr>*/}
                    {/*    <th>#</th>*/}
                    {/*    <th>Tên Xe</th>*/}
                    {/*    <th>Số Lượng Bán</th>*/}
                    {/*</tr>*/}
                    </thead>
                    <tbody>
                    {topSellingCars.map((car, index) => (
                        <tr key={car.car_id}>
                            <td>{index + 1}</td>
                            <td>{car.car?.brand?.name} - {car.car.model}</td>
                            <td>{car.sales_count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TopSellingCars;