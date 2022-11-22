import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    image_name: "",
    summary: "",
  });

  const onChangeHandle = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const onChangeImagehanlde = (e) => {
    setProduct({ ...product, image_name: e.target.files[0] });
  };
  const hanldeSubmitProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("upload_file_name", product.image_name);
    formData.append("summary", product.summary);
    fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        toast("Upload Success 💗");
        setProduct({
          name: "",
          image_name: "",
          summary: "",
        });
      });
  };

  return (
    <div className="add--product container">
      <h2 className="py-4">Upload Product</h2>
      <form className="row  g-3" onSubmit={hanldeSubmitProduct}>
        <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={onChangeHandle}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Image Upload</label>
          <input
            type="file"
            className="form-control"
            name="image_name"
            onChange={onChangeImagehanlde}
          />
        </div>
        <div className="col-12">
          <label className="form-label">summary</label>
          <input
            type="text"
            className="form-control"
            name="summary"
            value={product.summary}
            onChange={onChangeHandle}
          />
        </div>
        <div className="col-12">
          <ToastContainer />
          <button type="submit" className="btn btn-danger">
            Upload Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
