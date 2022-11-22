import React from "react";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [datalist, setDataList] = useState([]);
  const getData = () => {
    fetch("http://localhost:8080/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setDataList(data.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteFun = (id) => {
    fetch(`http://localhost:8080/delete/${id}`, {
      method: "delete",
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        getData();
      });
  };
  return (
    <div className="container">
      {loading ? (
        <div className="row">
          <h2>Loading date Please Wait Some Minutes</h2>
        </div>
      ) : (
        <div className="row">
          {datalist.data.map((element, index) => {
            return (
              <div className="col-4" key={element._id}>
                <div className="card">
                  <img
                    src={`http://localhost:8080/images/${element.image_name}`}
                    className="card-img-top img-fluid"
                    alt="..."
                    style={{
                      height: "300px",
                    }}
                  />
                  <div className="card-body">
                    <h4>
                      {element.name} {index + 1}{" "}
                      {
                        // http://localhost:8080/
                        <button
                          className="btn btn-danger float-right"
                          onClick={() => deleteFun(element._id)}
                        >
                          delete
                        </button>
                      }
                    </h4>
                    <p className="card-text">{element.summary}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
