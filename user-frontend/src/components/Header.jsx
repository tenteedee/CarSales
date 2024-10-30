import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConfig } from '../reduxStore/configSlice';
import Loading from './Loading';
import { setLogin } from '../reduxStore/authSlice';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const config = useSelector((state) => state.config.config);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    language: false,
  });
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setIsDropdownOpen((prevState) => ({ ...prevState, language: false })); // Close dropdown after language selection
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchConfig());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const logOut = async () => {
    localStorage.removeItem('token');
    dispatch(
      setLogin({
        user: {},
        token: '',
      })
    );
  };

  const handleMouseEnter = (dropdown) => {
    setIsDropdownOpen((prevState) => ({ ...prevState, [dropdown]: true }));
  };

  const handleMouseLeave = (dropdown) => {
    setIsDropdownOpen((prevState) => ({ ...prevState, [dropdown]: false }));
  };

  // Show loading screen if still loading
  if (loading) {
    return <Loading />;
  }

  return (
    <header className="b-topBar">
      <div className="container wow slideInDown" data-wow-delay="0.7s">
        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="col-md-3 col-xs-6">
            <div className="b-topBar__addr">
              <span className="fa fa-map-marker"></span>
              {t('ADDRESS')}: {config?.address}
            </div>
          </div>
          <div className="col-md-3 col-xs-6">
            <div className="b-topBar__tel">
              <span className="fa fa-phone"></span>
              {t('PHONE')}: {config?.phone}
            </div>
          </div>
          <div className="col-md-3 col-xs-6">
            {!token ? (
              <nav className="b-topBar__nav">
                <ul style={{ display: 'flex', gap: '10px' }}>
                  <li>
                    <Link to={'/login'}>{t('LOGIN')}</Link>
                  </li>
                  <li>
                    <Link to={'/register'}>{t('REGISTER')}</Link>
                  </li>
                </ul>
              </nav>
            ) : (
              <nav className="b-topBar__nav">
                <ul style={{ display: 'flex', gap: '10px' }}>
                  <li>
                    <Link onClick={logOut} to={'/'}>
                      {t('LOGOUT')}
                    </Link>
                  </li>
                  <li>
                    <Link to={'/profile'}>{t('PROFILE')}</Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          <div className="col-md-2 col-xs-6">
            <div className="b-topBar__lang">
              <div
                className={`dropdown ${isDropdownOpen.language ? 'open' : ''}`}
                onMouseEnter={() => handleMouseEnter('language')}
                onMouseLeave={() => handleMouseLeave('language')}
              >
                <a href="#" className="dropdown-toggle">
                  {t('NGÔN NGỮ')} <span className="fa fa-caret-down"></span>
                </a>
                {isDropdownOpen.language && (
                  <ul className="dropdown-menu h-lang">
                    <li>
                      <a
                        className="m-langLink"
                        onClick={() => handleChangeLanguage('vn')}
                      >
                        <span className="b-topBar__lang-flag m-vn"></span> VN
                      </a>
                    </li>
                    <li>
                      <a
                        className="m-langLink"
                        onClick={() => handleChangeLanguage('en')}
                      >
                        <span className="b-topBar__lang-flag m-en"></span> EN
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
