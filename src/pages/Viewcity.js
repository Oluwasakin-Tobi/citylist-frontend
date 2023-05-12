import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const Viewcity = (props) => {
  const [cities, setCities] = useState([]);

  const [offset, setOffset] = useState(0);

  const [search, setSearch] = useState("");

  const isSubmitButtonDisabled = search.trim() === "";

  let limit = 25;

  useEffect(() => {
    loadCities();
  }, [limit]);

  const loadCities = async () => {
    const result = await axios.get(
      `http://localhost:5001/citylist/citylists?offset=${offset}&pageSize=${limit}`
    );

    setCities(result.data.data.content);
    const total = result.data.data.totalElements;
    setOffset(Math.ceil(total / limit));
  };

  const fetchCities = async (currentPage) => {
    const res = await axios.get(
      `http://localhost:5001/citylist/citylists?offset=${currentPage}&pageSize=${limit}`
    );
    const data = res.data.data.content;
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected;

    const citiesFormServer = await fetchCities(currentPage);

    setCities(citiesFormServer);
  };

  const loadCityByName = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `http://localhost:5001/citylist/citylists?name=${search.trim()}`
    );

    setCities(response.data.data.content);
  };

  return (
    <div className="container">
      <div className="py-5">
        <h3 className="my-3">View or Edit City List</h3>
        <form onSubmit={loadCityByName}>
          <div className="col-md-6 col-sm-12">
            <div className="d-flex">
              <div className="col-md-6 col-sm-6">
                <input
                  type={"text"}
                  className="form-control p-2"
                  placeholder="Search by name"
                  name="name"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-md-5 col-sm-6">
                <button
                  type="submit"
                  className="btn btn-outline-primary mx-2"
                  disabled={isSubmitButtonDisabled}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="divider col-12"></div>

        <table className="table shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Photo</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr>
                <td>{city.id}</td>
                <td>{city.name}</td>
                <td>
                  <img src={city.photo} className="images" />
                </td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/vieweditcity/${city.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editcity/${city.id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={offset}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};
