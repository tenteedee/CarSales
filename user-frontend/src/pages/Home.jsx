import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const config = useSelector((state) => state.config.config);

    //const token = useSelector(state => state.auth.token);
    const params = new URLSearchParams(window.location.search);
    const [searchQuery, setSearchQuery] = useState(
        params.get('description') || ''
    );
    return <>đây là home page</>;
};

export default Home;
