import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './News.css';
    function NewsDetail() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`news/list`);
                setNews(response.data.data); // Set news data
                const foundArticle = response.data.data.find(item => item.id === parseInt(id)); // Tìm bài báo theo id
                setArticle(foundArticle); // Set bài báo tìm thấy
                setLoading(false);
            } catch (error) {
                console.error("Error fetching news data:", error);
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!article) {
        return <p>Article not found.</p>;
    }

    return (
        <div className="news-detail">
        {article && ( // Render the article if it exists
            <div className="article-container">
                <h1 className="article-title">{article.title}</h1>
                <h2 className="article-heading">{article.heading}</h2>
                <div className="article-meta">
                    
                    <p><strong>Status:</strong> {article.status === 1 ? "Published" : "Draft"}</p>
                    <p><strong>Posted By:</strong> {article.posted.fullname}</p>
                    <p><strong>Category:</strong> {article.category.name}</p>
                    <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(article.updated_at).toLocaleString()}</p>
                </div>
                <img className="article-image" src={article.image} alt={article.title} />
                <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} /> {/* Render HTML content */}
                
            </div>
        )}
    </div>
    );
}
export default NewsDetail; // {{ edit_10 }}