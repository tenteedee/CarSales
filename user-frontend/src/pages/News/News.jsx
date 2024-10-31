// user-frontend/src/pages/News/News.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './News.css';



function News() {
  const [news, setNews] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [videos, setVideos] = useState([]); // State for videos
  const [moreNews, setMoreNews] = useState([]); // State for more news

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('news/list');
        setNews(response.data.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    const fetchMostViewed = async () => {
      try {
        const response = await axios.get('news/most-viewed');
        setMostViewed(response.data.data);
      } catch (error) {
        console.error("Error fetching most viewed news:", error);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const response = await axios.get('news/latest');
        setLatestNews(response.data.data);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    const fetchFeaturedArticles = async () => {
      try {
        const response = await axios.get('news/featured');
        setFeaturedArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching featured articles:", error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get('news/videos'); // Adjust the endpoint as needed
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchMoreNews = async () => {
      try {
        const response = await axios.get('news/more'); // Adjust the endpoint as needed
        setMoreNews(response.data.data);
      } catch (error) {
        console.error("Error fetching more news:", error);
      }
    };

    fetchNews();
    fetchMostViewed();
    fetchLatestNews();
    fetchFeaturedArticles();
    fetchVideos();
    fetchMoreNews();
  }, []);
  function cleanArticleContent(content) {
    // Xóa các thẻ HTML và trả về nội dung văn bản
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
                      <a href={`/news/${item.id}`}>{item.title}</a>
                    </h2>
                    {item.heading && <h3 className="post-heading">{item.heading}</h3>}
                    <a href={`/news/${item.id}`}>
                      <img src={item.image} alt={item.title} className="img-fluid" />
                    </a>
                    <span className="post-date">{new Date(item.created_at).toLocaleDateString()}</span>
                    <p>{cleanArticleContent(item.content)}</p>
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
                  <li><a href="#" target="_blank"><i className="fa fa-rss" /></a></li>
                  <li><a href="#" target="_blank"><i className="fa fa-facebook" /></a></li>
                  <li><a href="#" target="_blank"><i className="fa fa-twitter" /></a></li>
                  <li><a href="#" target="_blank"><i className="fa fa-google-plus" /></a></li>
                  <li><a href="#" target="_blank"><i className="fa fa-vimeo-square" /></a></li>
                  <li><a href="#" target="_blank"><i className="fa fa-youtube" /></a></li>
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
                  {/* Thêm tin thứ hai vào đây */}
                  <li>
                    <a href="#">Tin thứ hai: Tiêu đề của tin thứ hai</a>
                  </li>
                </ul>

                <h3 className="block-title"><span>Trending News</span></h3>
                <ul className="list-unstyled">
                  <li><a href="#">Early tourists choices to the sea of Maldives...</a></li>
                  <li><a href="#">Can't shed those Gym? The problem might be in your health</a></li>
                  <li><a href="#">Asia's best restaurant has a frustratingly confusing menu</a></li>
                </ul>
              </div>
              {/* Sidebar end */}
            </div>
            {/* Sidebar Col end */}
          </div>
          {/* Row end */}
          {/* Categories Section */}
          <section className="categories-section mt-5">
            <div className="container">
              <h3 className="block-title"><span>Categories</span></h3>
              <div className="row">
                <div className="col-md-6">
                  <h4 className="category-title">Health</h4>
                  <ul className="list-unstyled">
                    <li>
                      <h5 className="post-title">
                        <a href="#">Tacos ditched the naked chicken chalupa, so here's how to make</a>
                      </h5>
                      <span className="post-date">Mar 13, 2017</span>
                    </li>
                    <li>
                      <h5 className="post-title">
                        <a href="#">That wearable on your wrist could soon track your health as well...</a>
                      </h5>
                      <span className="post-date">Jan 11, 2017</span>
                    </li>
                    <li>
                      <h5 className="post-title">
                        <a href="#">Early tourists choices to the sea of Maldives in fancy dresses an...</a>
                      </h5>
                      <span className="post-date">Feb 19, 2017</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4 className="category-title">Travel</h4>
                  <ul className="list-unstyled">
                    <li>
                      <h5 className="post-title">
                        <a href="#">Can't shed those Gym? The problem might be in your health</a>
                      </h5>
                      <span className="post-date">Mar 13, 2017</span>
                    </li>
                    <li>
                      <h5 className="post-title">
                        <a href="#">Asia's best restaurant has a frustratingly confusing health...</a>
                      </h5>
                      <span className="post-date">Mar 07, 2017</span>
                    </li>
                    <li>
                      <h5 className="post-title">
                        <a href="#">Science meets architecture in robotically woven, solar-active str...</a>
                      </h5>
                      <span className="post-date">Mar 01, 2017</span>
                    </li>
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
                    <p>{item.content}</p>
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
                    <p>{item.content}</p>
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
            <div className="col-md-6 mb-4">
              <div className="event-item">
                <h4 className="event-title"><a href="#">Event Title 1</a></h4>
                <span className="event-date">Date: March 15, 2024</span>
                <p>Details about the event...</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="event-item">
                <h4 className="event-title"><a href="#">Event Title 2</a></h4>
                <span className="event-date">Date: April 20, 2024</span>
                <p>Details about the event...</p>
              </div>
            </div>
          </div>

          {/* Videos Section */}
          <h3 className="block-title mt-5"><span>Videos</span></h3>
          <div className="row">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.id} className="col-md-6 mb-4">
                  <div className="video-item">
                    <h4 className="video-title">
                      <a href="#">{video.title}</a>
                    </h4>
                    <img src={video.thumbnail} alt={video.title} className="img-fluid" />
                    <span className="video-date">{new Date(video.created_at).toLocaleDateString()}</span>
                    <p>{video.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No videos available.</p>
            )}
          </div>

          {/* More News Section */}
          <h3 className="block-title mt-5"><span>More News</span></h3>
          <div className="row">
            {moreNews.length > 0 ? (
              moreNews.map((item) => (
                <div key={item.id} className="col-md-6 mb-4">
                  <div className="news-item">
                    <h2 className="post-title">
                      <a href="#">{item.title}</a>
                    </h2>
                    <span className="post-date">{new Date(item.created_at).toLocaleDateString()}</span>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No more news available.</p>
            )}
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Container end */}
      </section>
      {/* Featured post end */}


    </>
  );
};

export default News;