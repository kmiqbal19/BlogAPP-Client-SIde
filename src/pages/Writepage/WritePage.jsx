import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/Context";
// import axios from "axios";
import axiosInstance from "../../config";
import "./WritePage.css";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../components/spinner/spinner.js";
function WritePage() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (success) {
      toast.dark("✨🎉Your post has been posted!");
    }
    return () => {
      setSuccess(false);
    };
  }, [success]);
  const handleCategory = (e) => {
    const { value, checked } = e.target;
    // console.log(`${value} is ${checked}`);
    // Case 1: if user checks the box
    if (checked) {
      setCategories([...categories, value]);
    }
    // Case 2: if user unchecks the box
    else {
      setCategories(categories.filter((el) => el !== value));
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    for (let i = 0; i < categories.length; i++) {
      data.append("categories[]", categories[i]);
    }
    data.append("username", user.username);
    if (file) {
      data.append("photo", file);
    }
    try {
      const res = await axiosInstance.post("/posts", data);
      if (res.data) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.replace(`/posts/${res.data.data.post._id}`);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleCancel = () => {
    return window.location.reload();
  };
  return (
    <div className="writePage">
      {loading && <Spinner />}
      {file && file.type.startsWith("image") && (
        <img src={URL.createObjectURL(file)} alt="uploadedFile" />
      )}
      {!file && (
        <p
          style={{
            margin: "12vh 5vw",
            color: "white",
            fontSize: "calc(1rem + 2vw)",
          }}
        >
          Insert an image by clicking{" "}
          <i className="fa-solid fa-circle-plus"></i> button below.
        </p>
      )}
      {file && !file.type.startsWith("image") && (
        <h1
          style={{
            margin: "12vh 5vw",
            color: "rgb(201, 43, 80)",
            fontSize: "calc(1rem + 2vw)",
          }}
        >
          ⚠️ Please insert image file only!
        </h1>
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroupUp">
          <label title="Add Photos" htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeTitleInput"
            type="text"
            placeholder={"Write your story title here..."}
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <span style={{ color: "white" }}>Choose Categories: </span>
        <div className="singlePostCategorySelection">
          <label className="singlePostCatLabel" htmlFor="musicCatg">
            <input
              type="checkbox"
              id="musicCatg"
              name="music"
              value="music"
              onChange={handleCategory}
            />
            #music
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="foodCatg">
            <input
              type="checkbox"
              id="foodCatg"
              name="food"
              value="food"
              onChange={handleCategory}
            />
            #food
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="natureCatg">
            <input
              type="checkbox"
              id="natureCatg"
              name="nature"
              value="nature"
              onChange={handleCategory}
            />
            #nature
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="lifeCatg">
            <input
              type="checkbox"
              id="lifeCatg"
              name="life"
              value="life"
              onChange={handleCategory}
            />
            #life
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="friendsCatg">
            <input
              type="checkbox"
              id="friendsCatg"
              name="friends"
              value="friends"
              onChange={handleCategory}
            />
            #friends
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="memoriesCatg">
            <input
              type="checkbox"
              id="memoriesCatg"
              name="memories"
              value="memories"
              onChange={handleCategory}
            />
            #memories
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="journeyCatg">
            <input
              type="checkbox"
              id="journeyCatg"
              name="journey"
              value="journey"
              onChange={handleCategory}
            />
            #journey
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="cookingCatg">
            <input
              type="checkbox"
              id="cookingCatg"
              name="cooking"
              value="cooking"
              onChange={handleCategory}
            />
            #cooking
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="familyCatg">
            <input
              type="checkbox"
              id="familyCatg"
              name="family"
              value="family"
              onChange={handleCategory}
            />
            #family
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="schoolCatg">
            <input
              type="checkbox"
              id="schoolCatg"
              name="school"
              value="school"
              onChange={handleCategory}
            />
            #school
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="scienceCatg">
            <input
              type="checkbox"
              id="scienceCatg"
              name="science"
              value="science"
              onChange={handleCategory}
            />
            #science
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="technologyCatg">
            <input
              type="checkbox"
              id="technologyCatg"
              name="technology"
              value="technology"
              onChange={handleCategory}
            />
            #technology
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="astronomyCatg">
            <input
              type="checkbox"
              id="astronomyCatg"
              name="astronomy"
              value="astronomy"
              onChange={handleCategory}
            />
            #astronomy
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="loveCatg">
            <input
              type="checkbox"
              id="loveCatg"
              name="love"
              value="love"
              onChange={handleCategory}
            />
            #love
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="medicalCatg">
            <input
              type="checkbox"
              id="medicalCatg"
              name="medical"
              value="medical"
              onChange={handleCategory}
            />
            #medical
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="positivityCatg">
            <input
              type="checkbox"
              id="positivityCatg"
              name="positivity"
              value="positivity"
              onChange={handleCategory}
            />
            #positivity
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="tourCatg">
            <input
              type="checkbox"
              id="tourCatg"
              name="tour"
              value="tour"
              onChange={handleCategory}
            />
            #tour
            <span className="checkmark"></span>
          </label>
          <label className="singlePostCatLabel" htmlFor="religionCatg">
            <input
              type="checkbox"
              id="religionCatg"
              name="religion"
              value="religion"
              onChange={handleCategory}
            />
            #religion
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="writeFormGroupDown">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story here..."
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <button
            className="writeSubmit"
            type="submit"
            disabled={!title || !file || !description || !categories || success}
          >
            Publish
          </button>
          <button
            className="cancelWriteForm"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default WritePage;
