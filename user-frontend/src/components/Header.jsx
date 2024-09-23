import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConfig } from '../reduxStore/configSlice';
import Loading from './Loading';
import { setLogin } from '../reduxStore/authSlice';

const Header = () => {
    const config = useSelector((state) => state.config.config);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Add loading state
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Stop loading when done
            await dispatch(fetchConfig());
        };
        fetchData().then(r => {
            setLoading(false); // Stop loading when done
        });
    }, [dispatch]);

    const logOut = async () => {
        localStorage.removeItem('token');
        dispatch(
            setLogin({
                user: {},
                token: '',
            }),
        );
    };
    // Show loading screen if still loading
    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <header className='b-topBar'>
                <div
                    className='container wow slideInDown'
                    data-wow-delay='0.7s'
                >
                    <div className='row'>
                        <div className='col-md-4 col-xs-6'>
                            <div className='b-topBar__addr'>
                                <span className='fa fa-map-marker'></span>
                                {config?.address}
                            </div>
                        </div>
                        <div className='col-md-2 col-xs-6'>
                            <div className='b-topBar__tel'>
                                <span className='fa fa-phone'></span>
                                {config?.phone}
                            </div>
                        </div>
                        <div className='col-md-2 col-xs-6'></div>
                        {!token ? (
                            <>
                                <div className='col-md-4 col-xs-6'>
                                    <nav className='b-topBar__nav'>
                                        <ul>
                                            <li>
                                                <Link to={'/register'}>
                                                    Register
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/login'}>Login</Link>
                                            </li>

                                        </ul>
                                    </nav>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='col-md-4 col-xs-6'>
                                    <nav className='b-topBar__nav'>
                                        <ul>
                                            <li>
                                                <Link onClick={logOut} to={"/"}>Log out</Link>
                                            </li>
                                            <li>
                                                <Link to={'/profile'}>Profile</Link>
                                            </li>

                                        </ul>
                                    </nav>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
