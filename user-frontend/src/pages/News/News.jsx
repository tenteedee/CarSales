import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './News.css';
import { FaEye } from 'react-icons/fa';

function News() {
  const [news, setNews] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [moreNews, setMoreNews] = useState([]);
  const [pagination, setPagination] = useState({
    links: [],
    current_page: 1,
    prev_page_url: null,
    next_page_url: null,
  });
  const [healthArticles, setHealthArticles] = useState([]);
  const [travelArticles, setTravelArticles] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await axios.get(endpoint);
        setter(response.data.data);
      } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error); // Corrected error message
      }
    };

    fetchData('news/list', setNews);
    fetchData('news/most-viewed', setMostViewed);
    fetchData('news/latest', setLatestNews);
    fetchData('news/featured', setFeaturedArticles);
    fetchData('news/videos', setVideos);
    fetchData('news/more', setMoreNews);
    fetchData('news/trending', setTrendingNews);
  }, []);

  const handlePageChange = async (page) => {
    try {
      const response = await axios.get(`news/list?page=${page}`); // Corrected to use backticks
      setNews(response.data.data);
      setPagination(response.data.pagination || pagination);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  function cleanArticleContent(content) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  return (
    <>
      <section className="featured-post-area no-padding">
        <div className="container">
          <h3 className="block-title"><span>Popular News</span></h3>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              {news.length > 0 ? (
                news.map((item) => (
                  <div key={item.id} className="news-item mb-4">
                    <h2 className="post-title">
                      <a href={`/news/${item.id}`}>{item.title}</a> {/* Corrected URL */}
                    </h2>
                    {item.heading && <h3 className="post-heading">{item.heading}</h3>}
                    <div className="image-container">
                      <a href={`/news/${item.id}`}>
                        <img src={item.image} alt={item.title} className="img-fluid" />
                      </a>
                    </div>
                    <span className="post-date">{new Date(item.created_at).toLocaleDateString()}</span>
                    <p><strong>Posted by:</strong> {item.posted.fullname}</p>
                    <p><strong>Category:</strong> {item.category.name}</p>
                    <p><strong>Status:</strong> {item.status === 0 ? 'Inactive' : 'Active'}</p>
                  </div>
                ))
              ) : (
                <p>No news available.</p>
              )}
            </div>
            {/* Sidebar Section */}
            <div className="col-lg-4 col-md-12">
              <div className="sidebar">
                <h3 className="block-title"><span>Follow Us</span></h3>
                <ul className="social-icon">
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-rss" /></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" /></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-google-plus" /></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-vimeo-square" /></a></li>
                  <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube" /></a></li>
                </ul>

                <h3 className="block-title"><span>Most Viewed</span></h3>
                <ul className="list-unstyled">
                  {mostViewed.length > 0 ? (
                    mostViewed.map((item) => (
                      <li key={item.id}>
                        <a href="#">{item.title}</a>
                      </li>
                    ))
                  ) : (
                    <li>No most viewed news available.</li>
                  )}
                </ul>

                <h3 className="block-title"><span>Trending News</span></h3>
                <ul className="list-unstyled">
                  {trendingNews.length > 0 ? (
                    trendingNews.map((item) => (
                      <li key={item.id}>
                        <a href="#">{item.title}</a>
                      </li>
                    ))
                  ) : (
                    <li>No trending news available.</li>
                  )}
                </ul>

                {/* Categories Section */}
                <section className="categories-section mt-5">
                  <div className="container">
                    <h3 className="block-title"><span>Categories</span></h3>
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="category-title">Health</h4>
                        <ul className="list-unstyled">
                          {healthArticles.length > 0 ? (
                            healthArticles.map((item) => (
                              <li key={item.id}>
                                <h5 className="post-title">
                                  <a href="#">{item.title}</a>
                                </h5>
                                <span className="post-date">{new Date(item.created_at).toLocaleDateString()}</span>
                              </li>
                            ))
                          ) : (
                            <li>No health articles available.</li>
                          )}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h4 className="category-title">Travel</h4>
                        <ul className="list-unstyled">
                          {travelArticles.length > 0 ? (
                            travelArticles.map((item) => (
                              <li key={item.id}>
                                <h5 className="post-title">
                                  <a href="#">{item.title}</a>
                                </h5>
                                <span className="post-date">{new Date(item.created_at).toLocaleDateString()}</span>
                              </li>
                            ))
                          ) : (
                            <li>No travel articles available.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Latest News Section */}
                <h3 className="block-title mt-5"><span>Latest News</span></h3>
                <div className="row">
                  {latestNews.length > 0 ? (
                    latestNews.map((item) => (
                      <div key={item.id} className="col-md-6 mb-4">
                        <div className="news-item">
                          <h2 className="post-title">
                            <a href="#">{item.title}</a>
                          </h2>
                          <img src={item.image} alt={item.title} className="img-fluid" />
                          <span className="post-date">{new Date(item.created_at).toLocaleDateString()}</span>
                          <p>{item.content || "No content available."}</p> {/* Fallback for content */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No latest news available.</p>
                  )}
                </div>

                {/* Featured Articles Section */}
                <h3 className="block-title mt-5"><span>Featured Articles</span></h3>
                <div className="row">
                  {featuredArticles.length > 0 ? (
                    featuredArticles.map((item) => (
                      <div key={item.id} className="col-md-6 mb-4">
                        <div className="news-item">
                          <h2 className="post-title">
                            <a href="#">{item.title}</a>
                          </h2>
                          <img src={item.image} alt={item.title} className="img-fluid" />
                          <span className="post-date">{new Date(item.created_at).toLocaleDateString()}</span>
                          <p>{item.content || "No content available."}</p> {/* Fallback for content */}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No featured articles available.</p>
                  )}
                </div>

                {/* Upcoming Events Section */}
                <h3 className="block-title mt-5"><span>Upcoming Events</span></h3>
                <div className="row">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="col-md-6 mb-4">
                        <div className="event-item">
                          <h2 className="event-title">
                            <a href="#">{event.title}</a>
                          </h2>
                          <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No upcoming events available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button disabled={!pagination.prev_page_url} onClick={() => handlePageChange(pagination.current_page - 1)}>Previous</button>
        <span>Page {pagination.current_page}</span>
        <button disabled={!pagination.next_page_url} onClick={() => handlePageChange(pagination.current_page + 1)}>Next</button>
      </div>
    </>
  );
}

export default News;
