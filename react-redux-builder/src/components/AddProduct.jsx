import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/ProductAction';

function AddProduct() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    price: '',
    remarks: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0) {
      alert('Please provide a valid product name and a price greater than 0.');
      return; 
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      remarks: form.remarks,
    };

    dispatch(addProduct(newProduct));

    setForm({
      name: '',
      price: '',
      remarks: '',
    });
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <textarea
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          placeholder="Remarks (Optional)"
        ></textarea>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;