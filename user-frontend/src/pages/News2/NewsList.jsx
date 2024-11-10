import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import './NewsList.css';

const NewsList = () => {
    const [newsData, setNewsData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await axios.get(
                    `/news/list?page=${currentPage}`
                );
                if (newsData.image) {
                    newsData.image = newsData.image.replace(
                        'http://localhost:3001',
                        ''
                    );
                }
                setNewsData(response.data.data);
                setPagination(response.data.payload.pagination);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNewsData();
    }, [currentPage]);

    const handleCardClick = (newsId) => {
        navigate(`/news/${newsId}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="news-wrapper">
            <div className="news-list">
                <h2>Latest News</h2>
                <div className="news-cards">
                    {newsData.map((news) => (
                        <div
                            key={news.id}
                            className="news-card"
                            onClick={() => handleCardClick(news.id)}
                        >
                            <img
                                src={news.image}
                                alt={news.title}
                                className="news-image"
                            />
                            <div className="news-info">
                                <h3 className="news-title">{news.title}</h3>
                                <p className="news-date">
                                    Updated on:{' '}
                                    {new Date(
                                        news.updated_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="pagination">
                    {pagination.links &&
                        pagination.links.map((link) => (
                            <button
                                key={link.page}
                                onClick={() => handlePageChange(link.page)}
                                disabled={link.active}
                                className={link.active ? 'active' : ''}
                            >
                                {link.label}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default NewsList;
