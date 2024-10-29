import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './News.css';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('news/list');
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
  }, []);
  //   useEffect(() => {
  //     const fetchNewsDetail = async () => {
  //         try {
  //             const response = await axios.get('news/detail/${id}'); 
  //             setNews(response.data);
  //         } catch (error) {
  //             console.error("Error fetching news data:", error);
  //         }
  //     };

  //     fetchNews();
  // }, []);
  return (
    <>
      <section className="featured-post-area no-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 pad-r">
              <div
                id="featured-slider"
                className="owl-carousel owl-theme featured-slider content-bottom"
              >
                {news.length > 0 && (
                  <div
                    className="item"
                    style={{
                      backgroundImage: `url(${news[0].image})`
                    }}
                  >
                    <div className="featured-post">
                      <div className="post-content">
                        <a className="post-cat" href="#">
                          {news[0].category.name}
                        </a>
                        <h2 className="post-title title-extra-large">
                          <a href="#">
                            {news[0].title}
                          </a>
                        </h2>
                        <span className="post-date">{new Date(news[0].created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {/*/ Featured post end */}
                  </div>
                )}
                {/* Item 1 end */}
                <div
                  className="item"
                  style={{
                    backgroundImage: "url(images/news/tech/computing1.jpg)"
                  }}
                >
                  <div className="featured-post">
                    <div className="post-content">
                      <a className="post-cat" href="#">
                        Gadget
                      </a>
                      <h2 className="post-title title-extra-large">
                        <a href="#">
                          Samsung Gear S3 review: A whimper, when smartwatches need
                          a bang
                        </a>
                      </h2>
                      <span className="post-date">March 16, 2017</span>
                    </div>
                  </div>
                  {/*/ Featured post end */}
                </div>
                {/* Item 2 end */}
                <div
                  className="item"
                  style={{
                    backgroundImage: "url(images/news/lifestyle/travel5.jpg)"
                  }}
                >
                  <div className="featured-post">
                    <div className="post-content">
                      <a className="post-cat" href="#">
                        Travel
                      </a>
                      <h2 className="post-title title-extra-large">
                        <a href="#">
                          Hynopedia helps female travelers find health care in
                          Maldivs
                        </a>
                      </h2>
                      <span className="post-date">March 16, 2017</span>
                    </div>
                  </div>
                  {/* Featured post end */}
                </div>
                {/* Item 3 end */}
              </div>
              {/* Featured owl carousel end*/}
            </div>
            {/* Col 7 end */}
            <div className="col-lg-5 col-md-12 pad-l">
              <div className="row">
                <div className="col-md-12">
                  <div className="post-overaly-style contentBottom hot-post-top clearfix">
                    <div className="post-thumb">
                      <a href="#">
                        <img
                          className="img-fluid"
                          src="images/news/tech/internet1.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="post-content">
                      <a className="post-cat" href="#">
                        Gadget
                      </a>
                      <h2 className="post-title title-large">
                        <a href="#">
                          Why The iPhone X Will Force Apple To Choose Between Good
                          Or Evil
                        </a>
                      </h2>
                      <span className="post-date">February 19, 2017</span>
                    </div>
                    {/* Post content end */}
                  </div>
                  {/* Post Overaly end */}
                </div>
                {/* Col end */}
                <div className="col-md-6 pad-r-small">
                  <div className="post-overaly-style contentBottom hot-post-bottom clearfix">
                    <div className="post-thumb">
                      <a href="#">
                        <img
                          className="img-fluid"
                          src="images/news/lifestyle/travel2.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="post-content">
                      <a className="post-cat" href="#">
                        Travel
                      </a>
                      <h2 className="post-title title-medium">
                        <a href="#">Early tourists choices to the sea of Maldiv…</a>
                      </h2>
                    </div>
                    {/* Post content end */}
                  </div>
                  {/* Post Overaly end */}
                </div>
                {/* Col end */}
                <div className="col-md-6 pad-l-small">
                  <div className="post-overaly-style contentBottom hot-post-bottom clearfix">
                    <div className="post-thumb">
                      <a href="#">
                        <img
                          className="img-fluid"
                          src="images/news/lifestyle/health1.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="post-content">
                      <a className="post-cat" href="#">
                        Health
                      </a>
                      <h2 className="post-title title-medium">
                        <a href="#">That wearable on your wrist could soon...</a>
                      </h2>
                    </div>
                    {/* Post content end */}
                  </div>
                  {/* Post Overaly end */}
                </div>
                {/* Col end */}
              </div>
            </div>
            {/* Col 5 end */}
          </div>
          {/* Row end */}
        </div>
        {/* Container end */}
      </section>
      {/* Trending post end */}
      <section className="block-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              {/*- Featured Tab startet */}
              <div className="featured-tab color-orange">
                <h3 className="block-title">
                  <span>Popular News</span>
                </h3>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#tab_a" data-toggle="tab">
                      <span className="tab-head">
                        <span className="tab-text-title">Technology</span>
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="#tab_b" data-toggle="tab">
                      <span className="tab-head">
                        <span className="tab-text-title">Lifestyle</span>
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane animated fadeInRight active" id="tab_a">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="post-block-style clearfix">
                          <div className="post-thumb">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src="images/news/tech/internet1.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <a className="post-cat" href="#">
                            Gadgets
                          </a>
                          <div className="post-content">
                            <h2 className="post-title">
                              <a href="#">
                                The best MacBook Pro alternatives in 2017 for Apple
                                users
                              </a>
                            </h2>
                            <div className="post-meta">
                              <span className="post-author">
                                <a href="#">John Doe</a>
                              </span>
                              <span className="post-date">Feb 24, 2017</span>
                            </div>
                            <p>
                              Lumbersexual meh sustainable Thundercats meditation
                              kogi. Tilde Pitchfork vegan, gentrify minim elit
                              semiotics non messenger bag Austin which roasted ...
                            </p>
                          </div>
                          {/* Post content end */}
                        </div>
                        {/* Post Block style end */}
                      </div>
                      {/* Col end */}
                      <div className="col-lg-6 col-md-6">
                        <div className="list-post-block">
                          <ul className="list-post">
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/internet2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Internet
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Samsung Gear S3 review: A whimper, when
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Feb 13, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 1 end */}
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/security1.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Security
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Panasonic's new Sumix CH7 an ultra portable
                                      filmmaker's dream
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Jan 11, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 2 end */}
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/security2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Security
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Soaring through Southern Patagonia with the
                                      Premium Byrd drone
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Feb 19, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 3 end */}
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/computing1.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Computing
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Google Assistant starts calling out to all
                                      recent Android phones
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Feb 27, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 4 end */}
                          </ul>
                          {/* List post end */}
                        </div>
                        {/* List post block end */}
                      </div>
                      {/* List post Col end */}
                    </div>
                    {/* Tab pane Row 1 end */}
                  </div>
                  {/* Tab pane 1 end */}
                  <div className="tab-pane animated fadeInRight" id="tab_b">
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="post-block-style clearfix">
                          <div className="post-thumb">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src="images/news/tech/security2.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <a className="post-cat" href="#">
                            Games
                          </a>
                          <div className="post-content">
                            <h2 className="post-title">
                              <a href="#">
                                Historical heroes and robot dinosaurs: New games on
                                our...{" "}
                              </a>
                            </h2>
                            <div className="post-meta">
                              <span className="post-author">
                                <a href="#">John Doe</a>
                              </span>
                              <span className="post-date">Feb 24, 2017</span>
                            </div>
                            <p>
                              Lumbersexual meh sustainable Thundercats meditation
                              kogi. Tilde Pitchfork vegan, gentrify minim elit
                              semiotics non messenger bag Austin which roasted ...
                            </p>
                          </div>
                          {/* Post content end */}
                        </div>
                        {/* Post Block style end */}
                      </div>
                      {/* Col end */}
                      <div className="col-lg-6 col-md-6">
                        <div className="list-post-block">
                          <ul className="list-post">
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/security1.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Internet
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Lindie game plonks players in front of huge
                                      starship command cent…
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Feb 13, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 1 end */}
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/internet2.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Security
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Meet Twitch: Mintendo’s new console mixes
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Jan 11, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 2 end */}
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/internet1.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Computing
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Super Tario Run isn’t groundbreaking, but it
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Feb 19, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 3 end */}
                            <li className="clearfix">
                              <div className="post-block-style post-float clearfix">
                                <div className="post-thumb">
                                  <a href="#">
                                    <img
                                      className="img-fluid"
                                      src="images/news/tech/computing3.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                {/* Post thumb end */}
                                <a className="post-cat" href="#">
                                  Security
                                </a>
                                <div className="post-content">
                                  <h2 className="post-title title-small">
                                    <a href="#">
                                      Oazer and Lacon bring eSport expertise to new
                                      PS4 controller…
                                    </a>
                                  </h2>
                                  <div className="post-meta">
                                    <span className="post-date">Feb 27, 2017</span>
                                  </div>
                                </div>
                                {/* Post content end */}
                              </div>
                              {/* Post block style end */}
                            </li>
                            {/* Li 4 end */}
                          </ul>
                          {/* List post end */}
                        </div>
                        {/* List post block end */}
                      </div>
                      {/* List post Col end */}
                    </div>
                    {/* Tab pane Row 2 end */}
                  </div>
                  {/* Tab pane 2 end */}
                </div>
                {/* tab content */}
              </div>
              {/* Technology Tab end */}
              <div className="gap-20" />
              <div className="block">
                <div className="row">
                  <div className="col-lg-6 col-md-6 color-violet">
                    <h3 className="block-title">
                      <span>Health</span>
                    </h3>
                    <div className="post-overaly-style clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/lifestyle/travel1.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            10 Hdrenaline fuelled activities that will chase the
                            post...
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-date">Mar 03, 2017</span>
                        </div>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Overaly Article end */}
                    <div className="list-post-block">
                      <ul className="list-post">
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/food1.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  Tacos ditched the naked chicken chalupa, so here's
                                  how to make{" "}
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Mar 13, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 1 end */}
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/health1.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  That wearable on your wrist could soon track your
                                  health as well…
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Jan 11, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 2 end */}
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/travel2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  Early tourists choices to the sea of Maldives in
                                  fancy dresses an…
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Feb 19, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 3 end */}
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/architecture2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  Science meets architecture in robotically coven,
                                  solar-active str…
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Jan 07, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 4 end */}
                      </ul>
                      {/* List post end */}
                    </div>
                    {/* List post block end */}
                  </div>
                  {/* Col 1 end */}
                  <div className="col-lg-6 col-md-6 color-aqua">
                    <h3 className="block-title">
                      <span>Travel</span>
                    </h3>
                    <div className="post-overaly-style last clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/lifestyle/architecture3.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            The bedroom keys to Bond villain chic: The best houses
                            of 2017
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-date">Feb 06, 2017</span>
                        </div>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Overaly Article end */}
                    <div className="list-post-block">
                      <ul className="list-post">
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/health2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  Can't shed those Gym? The problem might be in your
                                  health
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Mar 13, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 1 end */}
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/food2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  Asia's best restaurant has a frustratingly
                                  confusing
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Mar 07, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 2 end */}
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/architecture1.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  Science meets architecture in robotically woven,
                                  s…
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Mar 01, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 3 end */}
                        <li className="clearfix">
                          <div className="post-block-style post-float clearfix">
                            <div className="post-thumb">
                              <a href="#">
                                <img
                                  className="img-fluid"
                                  src="images/news/lifestyle/travel5.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            {/* Post thumb end */}
                            <div className="post-content">
                              <h2 className="post-title title-small">
                                <a href="#">
                                  Hynopedia helps female travelers find health …
                                </a>
                              </h2>
                              <div className="post-meta">
                                <span className="post-date">Feb 27, 2017</span>
                              </div>
                            </div>
                            {/* Post content end */}
                          </div>
                          {/* Post block style end */}
                        </li>
                        {/* Li 4 end */}
                      </ul>
                      {/* List post end */}
                    </div>
                    {/* List post block end */}
                  </div>
                  {/* Col 2 end */}
                </div>
                {/* Row end */}
              </div>
              {/* Block Lifestyle end */}
              <div className="gap-40" />
            </div>
            {/* Content Col end */}
            <div className="col-lg-4 col-md-12">
              <div className="sidebar sidebar-right">
                <div className="widget">
                  <h3 className="block-title">
                    <span>Follow Us</span>
                  </h3>
                  <ul className="social-icon">
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-rss" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-vimeo-square" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-youtube" />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Widget Social end */}
                <div className="widget color-default">
                  <h3 className="block-title">
                    <span>Most Viewed</span>
                  </h3>
                  <div className="post-overaly-style clearfix">
                    <div className="post-thumb">
                      <a href="#">
                        <img
                          className="img-fluid"
                          src="images/news/lifestyle/health4.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="post-content">
                      <a className="post-cat" href="#">
                        Health
                      </a>
                      <h2 className="post-title">
                        <a href="#">
                          Smart packs parking sensor tech and beeps when col…
                        </a>
                      </h2>
                      <div className="post-meta">
                        <span className="post-date">Feb 06, 2017</span>
                      </div>
                    </div>
                    {/* Post content end */}
                  </div>
                  {/* Post Overaly Article end */}
                  <div className="list-post-block">
                    <ul className="list-post">
                      <li className="clearfix">
                        <div className="post-block-style post-float clearfix">
                          <div className="post-thumb">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src="images/news/tech/gadget3.jpg"
                                alt=""
                              />
                            </a>
                            <a className="post-cat" href="#">
                              Gadgets
                            </a>
                          </div>
                          {/* Post thumb end */}
                          <div className="post-content">
                            <h2 className="post-title title-small">
                              <a href="#">
                                Panasonic's new Sumix CH7 an ultra portable
                                filmmaker's drea…
                              </a>
                            </h2>
                            <div className="post-meta">
                              <span className="post-date">Mar 13, 2017</span>
                            </div>
                          </div>
                          {/* Post content end */}
                        </div>
                        {/* Post block style end */}
                      </li>
                      {/* Li 1 end */}
                      <li className="clearfix">
                        <div className="post-block-style post-float clearfix">
                          <div className="post-thumb">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src="images/news/lifestyle/travel5.jpg"
                                alt=""
                              />
                            </a>
                            <a className="post-cat" href="#">
                              Travel
                            </a>
                          </div>
                          {/* Post thumb end */}
                          <div className="post-content">
                            <h2 className="post-title title-small">
                              <a href="#">
                                Hynopedia helps female travelers find health care...
                              </a>
                            </h2>
                            <div className="post-meta">
                              <span className="post-date">Jan 11, 2017</span>
                            </div>
                          </div>
                          {/* Post content end */}
                        </div>
                        {/* Post block style end */}
                      </li>
                      {/* Li 2 end */}
                      <li className="clearfix">
                        <div className="post-block-style post-float clearfix">
                          <div className="post-thumb">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src="images/news/tech/robot5.jpg"
                                alt=""
                              />
                            </a>
                            <a className="post-cat" href="#">
                              Robotics
                            </a>
                          </div>
                          {/* Post thumb end */}
                          <div className="post-content">
                            <h2 className="post-title title-small">
                              <a href="#">
                                Robots in hospitals can be quite handy to navigate
                                around...
                              </a>
                            </h2>
                            <div className="post-meta">
                              <span className="post-date">Feb 19, 2017</span>
                            </div>
                          </div>
                          {/* Post content end */}
                        </div>
                        {/* Post block style end */}
                      </li>
                      {/* Li 3 end */}
                      <li className="clearfix">
                        <div className="post-block-style post-float clearfix">
                          <div className="post-thumb">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src="images/news/lifestyle/food1.jpg"
                                alt=""
                              />
                            </a>
                            <a className="post-cat" href="#">
                              Food
                            </a>
                          </div>
                          {/* Post thumb end */}
                          <div className="post-content">
                            <h2 className="post-title title-small">
                              <a href="#">
                                Tacos ditched the naked chicken chalupa, so here's
                                how…
                              </a>
                            </h2>
                            <div className="post-meta">
                              <span className="post-date">Feb 27, 2017</span>
                            </div>
                          </div>
                          {/* Post content end */}
                        </div>
                        {/* Post block style end */}
                      </li>
                      {/* Li 4 end */}
                    </ul>
                    {/* List post end */}
                  </div>
                  {/* List post block end */}
                </div>
                {/* Popular news widget end */}
                <div className="widget text-center">
                  <img
                    className="banner img-fluid"
                    src="images/banner-ads/ad-sidebar.png"
                    alt=""
                  />
                </div>
                {/* Sidebar Ad end */}
              </div>
              {/* Sidebar right end */}
            </div>
            {/* Sidebar Col end */}
          </div>
          {/* Row end */}
        </div>
        {/* Container end */}
      </section>
      {/* First block end */}
      <section className="block-wrapper video-block color-green">
        <div className="container">
          <div className="row">
            <div className="video-tab clearfix">
              <h3 className="block-title">
                <span>Videos</span>
              </h3>
              <div className="row">
                <div className="col-lg-7 pad-r-0">
                  <div className="tab-content">
                    <div className="tab-pane active animated fadeIn" id="video1">
                      <div className="post-overaly-style clearfix">
                        <div className="post-thumb">
                          <img
                            className="img-fluid"
                            src="images/news/video/video4.jpg"
                            alt=""
                          />
                          <a
                            className="popup"
                            href="https://www.youtube.com/embed/XhveHKJWnOQ?autoplay=1&loop=1"
                          >
                            <div className="video-icon">
                              <i className="fa fa-play" />
                            </div>
                          </a>
                        </div>
                        {/* Post thumb end */}
                        <div className="post-content">
                          <a className="post-cat" href="#">
                            Video
                          </a>
                          <h2 className="post-title">
                            <a href="#">
                              Is Running Good for You, Health Benefits of Morning
                              Running
                            </a>
                          </h2>
                        </div>
                        {/* Post content end */}
                      </div>
                      {/* Post Overaly Article end */}
                    </div>
                    {/*Tab pane 1 end*/}
                    <div className="tab-pane animated fadeIn" id="video2">
                      <div className="post-overaly-style clearfix">
                        <div className="post-thumb">
                          <img
                            className="img-fluid"
                            src="images/news/video/video3.jpg"
                            alt=""
                          />
                          <a
                            className="popup"
                            href="https://www.youtube.com/embed/wJF5NXygL4k?autoplay=1&loop=1"
                          >
                            <div className="video-icon">
                              <i className="fa fa-play" />
                            </div>
                          </a>
                        </div>
                        {/* Post thumb end */}
                        <div className="post-content">
                          <a className="post-cat" href="#">
                            Video
                          </a>
                          <h2 className="post-title title-medium">
                            <a href="#">
                              Breeze through 17 locations in Europe in this
                              breathtaking video
                            </a>
                          </h2>
                        </div>
                        {/* Post content end */}
                      </div>
                      {/* Post Overaly Article 2 end */}
                    </div>
                    {/*Tab pane 2 end*/}
                    <div className="tab-pane animated fadeIn" id="video3">
                      <div className="post-overaly-style clearfix">
                        <div className="post-thumb">
                          <img
                            className="img-fluid"
                            src="images/news/video/video2.jpg"
                            alt=""
                          />
                          <a
                            className="popup"
                            href="https://www.youtube.com/embed/DQNDcxRo-2M?autoplay=1&loop=1"
                          >
                            <div className="video-icon">
                              <i className="fa fa-play" />
                            </div>
                          </a>
                        </div>
                        {/* Post thumb end */}
                        <div className="post-content">
                          <a className="post-cat" href="#">
                            Video
                          </a>
                          <h2 className="post-title title-medium">
                            <a href="#">
                              TG G6 will have dual 13-megapixel cameras on the back
                            </a>
                          </h2>
                        </div>
                        {/* Post content end */}
                      </div>
                      {/* Post Overaly Article 2 end */}
                    </div>
                    {/*Tab pane 2 end*/}
                  </div>
                  {/* Tab content end */}
                </div>
                {/*Tab col end */}
                <div className="col-lg-5 pad-l-0">
                  <ul className="nav nav-tabs">
                    <li className="nav-item active">
                      <a
                        className="nav-link animated fadeIn"
                        href="#video1"
                        data-toggle="tab"
                      >
                        <div className="post-thumb">
                          <img
                            className="img-fluid"
                            src="images/news/video/video4.jpg"
                            alt=""
                          />
                        </div>
                        {/* Post thumb end */}
                        <h3>
                          Is Running Good for You, Health Benefits of Morning
                          Running
                        </h3>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link animated fadeIn"
                        href="#video2"
                        data-toggle="tab"
                      >
                        <div className="post-thumb">
                          <img
                            className="img-fluid"
                            src="images/news/video/video3.jpg"
                            alt=""
                          />
                        </div>
                        {/* Post thumb end */}
                        <h3>
                          Breeze through 17 locations in Europe in this breathtaking
                          video
                        </h3>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link animated fadeIn"
                        href="#video3"
                        data-toggle="tab"
                      >
                        <div className="post-thumb">
                          <img
                            className="img-fluid"
                            src="images/news/video/video2.jpg"
                            alt=""
                          />
                        </div>
                        {/* Post thumb end */}
                        <h3>
                          TG G6 will have dual 13-megapixel cameras on the back
                        </h3>
                      </a>
                    </li>
                  </ul>
                </div>
                {/*Tab nav col end */}
              </div>
            </div>
            {/* Video tab end */}
          </div>
          {/* Row end */}
        </div>
        {/* Container end */}
      </section>
      {/* Video block end */}
      <section className="block-wrapper p-bottom-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="more-news block color-red">
                <h3 className="block-title">
                  <span>More News</span>
                </h3>
                <div
                  id="more-news-slide"
                  className="owl-carousel owl-theme more-news-slide"
                >
                  <div className="item">
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/video/video1.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Video
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            KJerry's will sell food cream that tastes like your
                            favorite video
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Mar 29, 2017</span>
                        </div>
                        <p>
                          Lumbersexual meh sustainable Thundercats meditation kogi.
                          Tilde Pitchfork vegan, gentrify minim elit semiotics non
                          messenger bag Austin which roasted ...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 1 end */}
                    <div className="gap-30" />
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/tech/game5.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Games
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            Oazer and Lacon bring eSport expertise to new PS4
                            controllers
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Mar 27, 2017</span>
                        </div>
                        <p>
                          Pityful a rethoric question ran over her cheek When she
                          reached the first hills of the Italic Mountains, she had a
                          last view back on the skyline of he...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 2 end */}
                    <div className="gap-30" />
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/tech/game4.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Games
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            Super Tario Run isn’t groundbreaking, but it has
                            Mintendo charm
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Feb 24, 2017</span>
                        </div>
                        <p>
                          Separated they live in Bookmarksgrove right at the coast
                          of the Semantics, a large language ocean. A small river
                          named Duden flows by their place and ...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 3 end */}
                    <div className="gap-30" />
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/tech/robot5.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Robotics
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            Robots in hospitals can be quite handy to navigate
                            around the ho…
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Feb 24, 2017</span>
                        </div>
                        <p>
                          Separated they live in Bookmarksgrove right at the coast
                          of the Semantics, a large language ocean. A small river
                          named Duden flows by their place and ...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 4 end */}
                  </div>
                  {/* Item 1 end */}
                  <div className="item">
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/video/video2.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Video
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            TG G6 will have dual 13-megapixel cameras on the back
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Mar 29, 2017</span>
                        </div>
                        <p>
                          Lumbersexual meh sustainable Thundercats meditation kogi.
                          Tilde Pitchfork vegan, gentrify minim elit semiotics non
                          messenger bag Austin which roasted ...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 5 end */}
                    <div className="gap-30" />
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/video/video3.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Video
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            Breeze through 17 locations in Europe in this
                            breathtaking v…
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Mar 31, 2017</span>
                        </div>
                        <p>
                          Pityful a rethoric question ran over her cheek When she
                          reached the first hills of the Italic Mountains, she had a
                          last view back on the skyline of he...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 6 end */}
                    <div className="gap-30" />
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/lifestyle/architecture1.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Architecture
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            Science meets architecture in robotically woven,
                            solar...
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Mar 23, 2017</span>
                        </div>
                        <p>
                          Separated they live in Bookmarksgrove right at the coast
                          of the Semantics, a large language ocean. A small river
                          named Duden flows by their place and ...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 7 end */}
                    <div className="gap-30" />
                    <div className="post-block-style post-float-half clearfix">
                      <div className="post-thumb">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src="images/news/tech/game1.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <a className="post-cat" href="#">
                        Robotics
                      </a>
                      <div className="post-content">
                        <h2 className="post-title">
                          <a href="#">
                            Historical heroes and robot dinosaurs: New games on our…
                          </a>
                        </h2>
                        <div className="post-meta">
                          <span className="post-author">
                            <a href="#">John Doe</a>
                          </span>
                          <span className="post-date">Feb 24, 2017</span>
                        </div>
                        <p>
                          Separated they live in Bookmarksgrove right at the coast
                          of the Semantics, a large language ocean. A small river
                          named Duden flows by their place and ...
                        </p>
                      </div>
                      {/* Post content end */}
                    </div>
                    {/* Post Block style 8 end */}
                  </div>
                  {/* Item 2 end */}
                </div>
                {/* More news carousel end */}
              </div>
              {/*More news block end */}
            </div>
            {/* Content Col end */}
            <div className="col-lg-4 col-sm-12">
              <div className="sidebar sidebar-right">
                <div className="widget color-default">
                  <h3 className="block-title">
                    <span>Trending News</span>
                  </h3>
                  <div
                    id="post-slide"
                    className="owl-carousel owl-theme post-slide"
                  >
                    <div className="item">
                      <div className="post-overaly-style text-center clearfix">
                        <div className="post-thumb">
                          <a href="#">
                            <img
                              className="img-fluid"
                              src="images/news/tech/gadget1.jpg"
                              alt=""
                            />
                          </a>
                        </div>
                        {/* Post thumb end */}
                        <div className="post-content">
                          <a className="post-cat" href="#">
                            Gadgets
                          </a>
                          <h2 className="post-title">
                            <a href="#">
                              The best MacBook Pro alternatives in 2017 for Appl…
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-date">Feb 06, 2017</span>
                          </div>
                        </div>
                        {/* Post content end */}
                      </div>
                      {/* Post Overaly Article 1 end */}
                      <div className="post-overaly-style text-center clearfix">
                        <div className="post-thumb">
                          <a href="#">
                            <img
                              className="img-fluid"
                              src="images/news/video/video1.jpg"
                              alt=""
                            />
                          </a>
                        </div>
                        {/* Post thumb end */}
                        <div className="post-content">
                          <a className="post-cat" href="#">
                            Video
                          </a>
                          <h2 className="post-title">
                            <a href="#">
                              KJerry's will sell food cream that tastes like you…
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-date">Jan 09, 2017</span>
                          </div>
                        </div>
                        {/* Post content end */}
                      </div>
                      {/* Post Overaly Article 2 end */}
                    </div>
                    {/* Item 1 end */}
                    <div className="item">
                      <div className="post-overaly-style text-center clearfix">
                        <div className="post-thumb">
                          <a href="#">
                            <img
                              className="img-fluid"
                              src="images/news/lifestyle/health5.jpg"
                              alt=""
                            />
                          </a>
                        </div>
                        {/* Post thumb end */}
                        <div className="post-content">
                          <a className="post-cat" href="#">
                            Health
                          </a>
                          <h2 className="post-title">
                            <a href="#">
                              Netcix cuts out the chill with an integrated perso…
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-date">Feb 06, 2017</span>
                          </div>
                        </div>
                        {/* Post content end */}
                      </div>
                      {/* Post Overaly Article 3 end */}
                      <div className="post-overaly-style text-center clearfix">
                        <div className="post-thumb">
                          <a href="#">
                            <img
                              className="img-fluid"
                              src="images/news/tech/robot1.jpg"
                              alt=""
                            />
                          </a>
                        </div>
                        {/* Post thumb end */}
                        <div className="post-content">
                          <a className="post-cat" href="#">
                            Robotics
                          </a>
                          <h2 className="post-title">
                            <a href="#">
                              There's no escaping Watsone Dynamics' wheeled...
                            </a>
                          </h2>
                          <div className="post-meta">
                            <span className="post-date">Jan 15, 2017</span>
                          </div>
                        </div>
                        {/* Post content end */}
                      </div>
                      {/* Post Overaly Article 4 end */}
                    </div>
                    {/* Item 2 end */}
                  </div>
                  {/* Post slide carousel end */}
                </div>
                {/* Trending news end */}
                <div className="widget m-bottom-0">
                  <h3 className="block-title">
                    <span>Newsletter</span>
                  </h3>
                  <div className="ts-newsletter">
                    <div className="newsletter-introtext">
                      <h4>Get Updates</h4>
                      <p>
                        Subscribe our newsletter to get the best stories into your
                        inbox!
                      </p>
                    </div>
                    <div className="newsletter-form">
                      <form action="#" method="post">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            id="newsletter-form-email"
                            className="form-control form-control-lg"
                            placeholder="E-mail"
                            autoComplete="off"
                          />
                          <button className="btn btn-primary">Subscribe</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* Newsletter end */}
                </div>
              </div>
              {/*Sidebar right end */}
            </div>
            {/* Sidebar col end */}
          </div>
          {/* Row end */}
        </div>
        {/* Container end */}
      </section>
      {/* 2nd block end */}
    </>
  );

};


export default News;
