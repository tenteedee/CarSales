import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './News.css';

function NewsDetail() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState(null);
    const [viewCount, setViewCount] = useState(0);
    const { id } = useParams();
    const hasMounted = useRef(false); // Ref to track if component has mounted

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('news/list'); // Fetch news list
                setNews(response.data.data);
                const foundArticle = response.data.data.find(item => item.id === parseInt(id));
                setArticle(foundArticle);
                
                if (foundArticle) {
                    // Update view count in the database
                    await axios.put(`news/list/${id}/views`); // Call the new endpoint to increment views
                }
            } catch (error) {
                console.error("Error fetching news data:", error);
                // Optionally set a state to show an error message
            } finally {
                setLoading(false);
            }
        };
    
        fetchNews();
    

        // Increment view count only if not mounted before
        if (!hasMounted.current) {
            const storedViews = localStorage.getItem(`news_${id}_views`); // Corrected template literal
            const initialViews = storedViews ? parseInt(storedViews, 10) : 0;
            const updatedViews = initialViews + 1;

            setViewCount(updatedViews);
            localStorage.setItem(`news_${id}_views`, updatedViews); // Corrected template literal
            hasMounted.current = true; // Mark as mounted to prevent further increments
        }
    }, [id]); // Ensure to only depend on id

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!article) {
        return <p>Article not found.</p>;
    }

    return (
        <div className="news-detail">
            {article && (
                <div className="article-container custom-article-container">
                    <div className="article-header">
                        <h1 className="article-title custom-title">{article.title}</h1>
                        <h2 className="article-heading custom-heading">{article.heading}</h2>
                    </div>
                    <div className="article-meta custom-meta">
                        <p><strong>Status:</strong> {article.status === 1 ? "Published" : "Draft"}</p>
                        <p><strong>Posted By:</strong> {article.posted.fullname}</p>
                        <p><strong>Category:</strong> {article.category.name}</p>
                        <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(article.updated_at).toLocaleString()}</p>
                        <p><strong>Views:</strong> {viewCount}</p>
                    </div>
                    <img className="article-image" src={article.image} alt={article.title} />
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            )}
        </div>
    );
}

export default NewsDetail;
