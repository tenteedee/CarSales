import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import API from '../../axios.js';



const Home = () => {
  const token = useSelector(state => state.auth.token);
  const params = new URLSearchParams(window.location.search);
  const [searchQuery, setSearchQuery] = useState(params.get('description') || '');
  return (
    <>
      Home
    </>
  )
}

export default Home

