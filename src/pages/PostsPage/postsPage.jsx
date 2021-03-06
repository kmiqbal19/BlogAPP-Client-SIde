import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../config";
import Post from "../../components/Post/post";
import "./postsPage.css";
import spinner from "../../assets/spinner.gif";
function PostsPage() {
  const { search } = useLocation();
  const searchInputRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [catg, setCatg] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      const res = await axiosInstance.get(
        search
          ? "/posts" + search
          : `/posts/?search=${query}&cat=${catg}&page=${page}`
      );

      setPosts(res.data.data.posts);
      setPageCount(res.data.pagination.pageCount);
      setLoaded(true);
    };
    if (query.length > 2 || query.length === 0) fetchPosts();
    else if (catg !== "") fetchPosts();
  }, [query, search, page, catg]);
  useEffect(() => {
    setPage(1);
  }, [catg, search, query]);

  const handlePreviousPage = (e) => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  };
  const handleNextPage = (e) => {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  };
  const cancelSearch = () => {
    setQuery("");
    console.log(searchInputRef.current.value);
    searchInputRef.current.value = "";
  };
  return (
    <>
      {!search && (
        <div className="searchCatContainer">
          <div className="searchBarContainer">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="searchBar"
              onChange={(e) => setQuery(e.target.value)}
            />
            <i
              className="searchBarIcon fa-solid fa-xmark"
              onClick={cancelSearch}
            ></i>
            <i className="searchBarIcon fa-solid fa-magnifying-glass"></i>
          </div>
          <label>
            Choose Category:
            <select onChange={(e) => setCatg(e.target.value)}>
              <optgroup label="Category">
                <option defaultValue value="">
                  None{" "}
                </option>
                <option value="music">Music</option>
                <option value="food">Food</option>
                <option value="nature">Nature</option>
                <option value="life">Life</option>
                <option value="friends">Friends</option>
                <option value="memories">Memories</option>
                <option value="journey">Journey</option>
                <option value="cooking">Cooking</option>
                <option value="family">Family</option>
                <option value="school">School</option>
                <option value="science">Science & Technology</option>
                <option value="astronomy">Astronomy</option>
                <option value="medical">Medical</option>
                <option value="positivity">Positivity</option>
                <option value="love">Love</option>
                <option value="tour">Tour</option>
              </optgroup>
            </select>
          </label>
        </div>
      )}
      <div className={loaded ? "postsContainer" : "loading-posts"}>
        {posts.length === 0 && (
          <p
            style={{
              textAlign: "center",
              fontSize: "2rem",
              color: "rgba( 159,142,125,0.99)",
            }}
          >
            No Search Results...
          </p>
        )}
        {loaded ? (
          posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        ) : (
          <div className="loading__postpage">
            <p>Loading...</p>
            <img className="spinner__postpage" src={spinner} alt="spinner" />
          </div>
        )}
      </div>
      <footer className="postsFooter">
        {/* <p style={{ color: "white" }}>Page: {page}</p>
        <p style={{ color: "white" }}>Page Count: {pageCount} </p> */}
        <button
          className="posts-btn btn__prev"
          disabled={page === 1 || posts.length === 0}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <select value={page} onChange={(e) => setPage(e.target.value)}>
          <optgroup label="Page">
            {Array(pageCount)
              .fill(null)
              .map((_, i) => {
                return <option key={`page${i + 1}`}>{i + 1}</option>;
              })}
          </optgroup>
        </select>
        <button
          className="posts-btn btn__next"
          disabled={page === pageCount || posts.length === 0}
          onClick={handleNextPage}
        >
          Next
        </button>
      </footer>
    </>
  );
}

export default PostsPage;
