import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    const fetchBlog = async () => {
        const res = await fetch("http://localhost:8000/api/blogs/"+params.id)
        const result = await res.json();
        setBlog(result.data);
    }

    useEffect(() => {
        fetchBlog();
    },[]);

    return (
        <div className='container'>
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h2>{blog.title}</h2>
                <div>
                    <a href='/' className='btn btn-dark'>
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i> blogs
                    </a>
                </div>
            </div>

            <div className='card border-0 shadow-lg rounded-3 custom-card'>
                <div className='card-body p-4'>
                    <div className='row'>
                        {/* Left Column - Content */}
                        <div className='col-md-8'>
                            <p className='text-muted'>by <strong>{blog.author}</strong> on {blog.date}</p>
                            <div className='mt-4' dangerouslySetInnerHTML={{ __html: blog.description }} />
                        </div>

                        {/* Right Column - Image */}
                        <div className='col-md-4'>
                            {
                                blog.image && 
                                <img
                                    className='img-fluid rounded shadow-sm'
                                    src={`http://localhost:8000/uploads/blogs/${blog.image}`}
                                    alt={blog.title}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container {
                    padding-left: 15px;
                    padding-right: 15px;
                }

                .custom-card {
                    max-width: 900px;
                    margin: 0 auto;
                    background-color: #f9f9f9;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .form-label {
                    font-size: 1rem;
                    font-weight: 500;
                }

                .btn {
                    font-size: 1rem;
                    font-weight: 500;
                    padding: 12px 20px;
                    border-radius: 8px;
                    transition: background-color 0.3s ease;
                }

                .btn-primary {
                    background-color: #003a69;
                    border: none;
                }

                .btn-primary:hover {
                    background-color: #0052a3;
                }

                .btn-dark {
                    background-color: #343a40;
                    border: none;
                }

                .btn-dark:hover {
                    background-color: #23272b;
                }

                img.img-fluid {
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .invalid-feedback {
                    font-size: 0.875rem;
                    color: #dc3545;
                }
            `}</style>
        </div>
    )
}

export default BlogDetail;
