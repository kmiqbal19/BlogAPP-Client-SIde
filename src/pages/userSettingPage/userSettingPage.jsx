import React, { useEffect, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
// import axios from "axios";
import axiosInstance from "../../config";
import "./userSettingPage.css";
import defaultUser from "../../assets/defaultUser.jpg";
import Spinner from "../../components/spinner/spinner.js";
import { toast } from "react-toastify";
function UserSettingsPage() {
  const { user, dispatch } = useContext(Context);
  const emailRef = useRef(null);
  const fullnameRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (update) {
      toast.dark("✨💖Your profile has been updated!");
    }
    if (error) {
      toast.error("⚠️🥵 Something went wrong!");
    }
    return () => {
      setUpdate(false);
      setError(false);
    };
  }, [update, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "UPDATE_START" });
    const data = new FormData();
    data.append("email", email);
    data.append("fullname", fullname);
    data.append("username", user.username);
    data.append("id", user._id);
    if (file) {
      data.append("photo", file);
    }

    try {
      const res = await axiosInstance.patch("/users/updateMe", data);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data.data.updatedUser });
      if (res.data) {
        setLoading(false);
        setUpdate(true);
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
      setError(true);
      setLoading(false);
    }
    emailRef.current.value = "";
    fullnameRef.current.value = "";
    setEmail("");
    setFullname("");
    setFile(null);
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };
  return (
    <div className="settingsPageContainer">
      {loading && <Spinner />}
      <form className="userSettingsForm" onSubmit={handleSubmit}>
        {update && (
          <p
            style={{
              color: "green",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Your profile has been updated successfully!{" "}
          </p>
        )}
        {!file && user && (
          <img src={user.photo ? user.photo : defaultUser} alt="defaultUser" />
        )}

        {file && file.type.startsWith("image") && (
          <img src={URL.createObjectURL(file)} alt="uploadedFile" />
        )}
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label>Full Name</label>
        <input
          className="userSettingsInput"
          type="text"
          placeholder={user.fullname}
          ref={fullnameRef}
          onChange={(e) => setFullname(e.target.value)}
        />
        <label>Email</label>
        <input
          className="userSettingsInput"
          type="email"
          placeholder={user.email}
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="userSettingsUpdateButton"
          type="submit"
          disabled={!email || !fullname}
        >
          Update
        </button>
        {error && (
          <p style={{ marginTop: "5px", color: "red", fontSize: "1rem" }}>
            Something went wrong! Please try again later!
          </p>
        )}
        <button
          className="userSettingsLogoutButton"
          disabled={email || fullname}
          onClick={handleLogout}
        >
          Log Out
        </button>

        <Link
          to="/change-password"
          style={{
            marginTop: "10px",
            color: "white",
            textDecoration: "underline",
          }}
        >
          Change Password
        </Link>
      </form>
    </div>
  );
}

export default UserSettingsPage;
