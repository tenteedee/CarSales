import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './../../axios';
import './NewsDetail.css';

const NewsDetail = () => {
    const { news_id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await axios.get(`/news/detail/${news_id}`);
                console.log(response.data.data);
                setNews(response.data.data);
            } catch (error) {
                console.error('Error fetching news detail:', error);
                setError('Unable to load news details.');
                // navigate('/404');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsDetail();
    }, [news_id, navigate]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="news-detail">
            <h2 className="news-title">{news.title}</h2>
            <p className="news-meta">
                Updated on: {new Date(news.updated_at).toLocaleDateString()} |
                Posted by: {news.posted_by} | Category: {news.category.name}
            </p>
            <img
                src={news.image.replace('http://localhost:3001/', '')}
                alt={news.title}
                className="news-image"
            />
            <div className="news-heading">{news.heading}</div>
            <div
                className="news-content"
                dangerouslySetInnerHTML={{ __html: news.content }}
            />
        </div>
    );
};

export default NewsDetail;
