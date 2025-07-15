import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addBlog } from "../features/blogSlice";

const Blog = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const save = (data) => {
    const newBlog = {
      id: uuidv4(),
      ...data
    };
    dispatch(addBlog(newBlog));
    alert("Blog Added Successfully!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(save)} className="col-lg-6 mx-auto my-5 shadow p-5 bg-light rounded">
      <h3 className="text-center mb-4">Add New Blog</h3>

      <div className="mb-3">
        <input
          type="text"
          {...register('blog_category', { required: true })}
          placeholder="Enter Blog Category"
          className="form-control"
        />
        {errors.blog_category && <small className="text-danger">Category is required</small>}
      </div>

      <div className="mb-3">
        <input
          type="text"
          {...register('blog_title', { required: true })}
          placeholder="Enter Blog Title"
          className="form-control"
        />
        {errors.blog_title && <small className="text-danger">Title is required</small>}
      </div>

      <div className="mb-4">
        <input
          type="date"
          {...register('blog_Date', { required: true })}
          className="form-control"
        />
        {errors.blog_Date && <small className="text-danger">Date is required</small>}
      </div>

      <button type="submit" className="btn btn-success w-100">Submit Blog</button>
    </form>
  );
};

export default Blog;
