import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const ViewEditcity = (props) => {
  let navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    photo: "",
  });

  const { id } = useParams();

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    loadCity();
  }, []);

  const edit = async () => {
    navigate(`/editcity/${data.id}`);
  };

  const back = async () => {
    navigate("/citylist");
  };

  const loadCity = async () => {
    const result = await axios.get(
      `http://localhost:5001/citylist/citylists?cityId=${id}`
    );
    setData(result.data.data.content[0]);
  };

  return (
    <div className="auth-form-container">
      <h2 className="text-center m-4">View City {data.name}</h2>
      <label htmlFor="Name" className="form-label">
        Name
      </label>
      <input
        type={"text"}
        className="form-control"
        placeholder="Enter your name"
        name="name"
        value={data.name}
        disabled
        onChange={(e) => handleInputChange(e)}
      />
      <div className="mt-3">
        <img src={data.photo} className="images" />
      </div>
      <div className="btn-area mt-3">
        <div className="col-md-6 col-sm-12">
          <button className="btn btn-primary" onClick={edit}>
            Edit
          </button>
        </div>
        <div className="col-md-6 col-sm-12">
          <button className="btn btn-outline-primary mx-2" onClick={back}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
