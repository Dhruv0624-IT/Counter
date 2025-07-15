import React from 'react';
import { useSelector } from 'react-redux';

const ViewBlog = () => {
    const { blogList } = useSelector((state) => state);

    return (
        <>
            <table className='table table-striped table-hover table-success'>
                <thead className='table-dark'>
                    <tr>
                        <th>#</th>
                        <th>Blog Category</th>
                        <th>Blog Title</th>
                        <th>Blog Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogList && blogList.length > 0 ? (
                        blogList.map((blog, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{blog.blog_category}</td>
                                <td>{blog.blog_title}</td>
                                <td>{blog.blog_date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default ViewBlog;
