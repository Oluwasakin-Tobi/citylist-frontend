import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../interceptor/interceptor";

export const Editcity = (props) => {
  let navigate = useNavigate();

  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState({
    name: "",
    photo: "",
  });

  const { id } = useParams();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.patch(
        `http://localhost:5001/citylist/citylists?cityId=${id}`,
        data
      );
      navigate(`/vieweditcity/${id}`);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Bad Request");
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized To Edit");
      } else if (err.response.status === 403) {
        setErrMsg("Unauthorized To Edit");
      } else {
        setErrMsg("Update Failed");
      }
    }
  };

  const back = async () => {
    navigate("/citylist");
  };

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    loadCity();
  }, []);

  const loadCity = async () => {
    const result = await axios.get(
      `http://localhost:5001/citylist/citylists?cityId=${id}`
    );
    setData(result.data.data.content[0]);
  };

  return (
    <div className="auth-form-container">
      <h2 className="text-center ">Edit City</h2>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form className="edit-form" onSubmit={handleFormSubmit}>
        <label htmlFor="Name" className="form-label">
          Name
        </label>
        <input
          type={"text"}
          className="form-control"
          placeholder="Enter your City name"
          name="name"
          value={data.name}
          onChange={(e) => handleInputChange(e)}
        />
        <label htmlFor="photo" className="form-label mt-3">
          Image Url
        </label>
        <input
          type={"text"}
          className="form-control"
          placeholder="Put your photo url"
          name="photo"
          value={data.photo}
          onChange={(e) => handleInputChange(e)}
        />
        <div className="btn-area">
          <div className="col-md-6 col-sm-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="col-md-6 col-sm-12">
            <button className="btn btn-outline-primary mx-2" onClick={back}>
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
