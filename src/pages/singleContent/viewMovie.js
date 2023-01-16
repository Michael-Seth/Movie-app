/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Carousel from "../../components/carousel/carousel";
import { AppContext } from "../../context/dataProvider";
import { Loader } from "../../loader/loader";
import Video from "../../components/video/videoMovie";
import "../../components/carousel/carousel.css";
import "./singleContent.css";

export const ViewMovie = ({ id }) => {
  const value = useContext(AppContext);
  const movies = value.movies;
  const content = value.content;
  //const show = value.show;
  const setShow = value.setShow;
  const addToFavorites = value.addToFavorites;
  const addToWatchlist = value.addToWatchlist;
  //const changeSection = value.changeSection;
  const moviesContentAddToFavorites = value.moviesContentAddToFavorites;
  const moviesContentAddToWatchlist = value.moviesContentAddToWatchlist;
  const params = useParams();

  const [active, setActive] = useState(false);
  const [item, setItem] = useState([]);
  const [secondItem, setSecondItem] = useState([]);
  const IMG_URL = value.IMG_URL;

  useEffect(() => {
    movies.forEach((movie) => {
      // eslint-disable-next-line eqeqeq
      if (movie.id == params.id) {
        setItem(movie);
      }
    });
  }, [params]);

  useEffect(() => {
    content.forEach((movie) => {
      // eslint-disable-next-line eqeqeq
      if (movie.id == params.id) {
        setSecondItem(movie);
      }
    });
  }, [params]);

  useEffect(() => {
    setShow(true);
  }, []);

  window.scroll(0, 0);

  setTimeout(() => {
    setActive(true);
  }, 1000);

  return (
    <div style={{ width: "100%" }} className="view-all-container">
      {secondItem.length <= 0 ? (
        <>
          {active ? (
            <div className="view-movie-container">
              <div className="movie-information">
                <h1 id="display-title">{item.title} </h1>

                <div className="movie-img">
                  <img src={IMG_URL + item.poster_path} alt={item.title}></img>
                  <div className="add-to">
                    <box-icon
                      id="add-favorites"
                      onClick={() => addToFavorites(item.id)}
                      type="solid"
                      name="heart"
                    ></box-icon>
                    <box-icon
                      id="add-watchlist"
                      onClick={() => addToWatchlist(item.id)}
                      name="task"
                    ></box-icon>
                  </div>
                </div>
                <div className="movie-data" style={{}}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <h1 id="disable-title">{item.title}</h1>
                    {/* <h5 style={{marginTop: '30px', opacity: '0.7'}}>({item.release_date.slice(0, 4)})</h5> */}
                    <p id="overview-view">{item.overview}</p>
                  </div>
                  <h3 id="cast-text">Cast</h3>
                  <div style={{ width: "31%", marginTop: "20px" }}>
                    <div className="cast">
                      <Carousel item={item} />
                    </div>
                  </div>
                </div>
              </div>
              <Video item={item} />
            </div>
          ) : (
            <div className="menu">
              <div style={{ marginTop: "150px" }} className="menu-loader">
                <Loader />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {active ? (
            <div className="view-movie-container">
              <div className="movie-information">
                <h1 id="display-title">{secondItem.title}</h1>

                <div className="movie-img">
                  <img
                    src={IMG_URL + secondItem.poster_path}
                    alt={secondItem.title}
                  ></img>
                  <div className="add-to">
                    <box-icon
                      id="add-favorites"
                      onClick={() => moviesContentAddToFavorites(secondItem.id)}
                      type="solid"
                      name="heart"
                    ></box-icon>
                    <box-icon
                      id="add-watchlist"
                      onClick={() => moviesContentAddToWatchlist(secondItem.id)}
                      name="task"
                    ></box-icon>
                  </div>
                </div>
                <div className="movie-data" style={{}}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <h1 id="disable-title">{secondItem.title}</h1>
                    {/* <h5 style={{marginTop: '30px', opacity: '0.7'}}>({item.release_date.slice(0, 4)})</h5> */}
                    <p id="overview-view">{secondItem.overview}</p>
                  </div>
                  <h3 id="cast-text">Cast</h3>
                  <div style={{ width: "100%" }}>
                    <div
                      className="cast"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "600px",
                        marginTop: "-50px",
                      }}
                    >
                      <Carousel item={secondItem} />
                    </div>
                  </div>
                </div>
              </div>
              <Video item={item} />
            </div>
          ) : (
            <div className="menu">
              <div style={{ marginTop: "150px" }} className="menu-loader">
                <Loader />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
