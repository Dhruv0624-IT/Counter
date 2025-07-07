// About.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const About = () => {
  const [products, setProducts] = useState([]);

  const showApi = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const trash = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      showApi();
    }
  };

  useEffect(() => {
    showApi();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center text-dark mb-4">📋 All Products</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle shadow bg-white">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Desc</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, p_name, category, p_price, p_desc, createdAt, p_url }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td><img src={p_url} alt={p_name} width="60" height="60" /></td>
                <td>{p_name}</td>
                <td>{category}</td>
                <td><strong className="text-success">₹{p_price}</strong></td>
                <td>{p_desc}</td>
                <td>{new Date(createdAt).toLocaleDateString()}</td>
                <td>
                  <NavLink to={`/SingleProduct/${id}`} className="btn btn-sm btn-outline-warning mx-1"><FaEye /></NavLink>
                  <NavLink to={`/Update/${id}`} className="btn btn-sm btn-outline-info mx-1"><FaEdit /></NavLink>
                  <button onClick={() => trash(id)} className="btn btn-sm btn-outline-danger mx-1"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
