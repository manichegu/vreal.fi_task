import React, { useEffect, useState } from 'react'
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState(null);
    const params = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function onChange(e) {
        setHtml(e.target.value);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://localhost:8000/api/save-temp-image/", {
                method: 'POST',
                body: formData
            });

            const result = await res.json();

            if (result.status === false) {
                alert(result.errors.image);
                e.target.value = null;
            }

            setImageId(result.image.id);
        } catch (error) {
            toast.error("Error uploading image.");
        }
    }

    const fetchBlog = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
            const result = await res.json();
            setBlog(result.data);
            setHtml(result.data.description);
            reset(result.data);
        } catch (error) {
            toast.error("Error fetching blog data.");
        } finally {
            setIsLoading(false);
        }
    }

    const formSubmit = async (data) => {
        const newData = { ...data, description: html, image_id: imageId }

        try {
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newData)
            });

            toast("Blog updated successfully.");
            navigate('/');
        } catch (error) {
            toast.error("Error updating blog.");
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="container mb-5">
            <div className="ps-5 ms-5 d-flex justify-content-between pt-5 mb-4">
                
                <a href='/' className='btn '><i className="fa fa-long-arrow-left" aria-hidden="true"></i></a>
            </div>
            <div className='text-center'>
                <h4>Edit Blog</h4>
            </div>
            <div className="card border-0 shadow-lg rounded-3 custom-card">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="card-body p-4">
                        <div className="row">
                            {/* Left Column - Title, Short Description, and Author */}
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <label className='form-label text-muted'>Title</label>
                                    <input
                                        {...register('title', { required: true })}
                                        type="text"
                                        className={`form-control ${errors.title && 'is-invalid'}`}
                                        placeholder='Blog Title'
                                    />
                                    {errors.title && <p className='invalid-feedback'>Title is required</p>}
                                </div>

                                <div className="mb-4">
                                    <label className='form-label text-muted'>Short Description</label>
                                    <textarea
                                        {...register('shortDesc')}
                                        cols="30"
                                        rows="5"
                                        className='form-control'
                                        placeholder="Write a short description about the blog"
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className='form-label text-muted'>Author</label>
                                    <input
                                        {...register('author', { required: true })}
                                        type="text"
                                        className={`form-control ${errors.author && 'is-invalid'}`}
                                        placeholder='Author Name'
                                    />
                                    {errors.author && <p className='invalid-feedback'>Author is required</p>}
                                </div>
                            </div>

                            {/* Right Column - Image Upload and WYSIWYG Editor */}
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <label className='form-label text-muted'>Description</label>
                                    <Editor
                                        value={html}
                                        containerProps={{ style: { height: '300px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' } }}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className='form-label text-muted'>Image</label><br />
                                    <input
                                        onChange={handleFileChange}
                                        type="file"
                                        className="form-control-file"
                                    />
                                    {blog?.image && (
                                        <div className="mt-3">
                                            <img className="img-fluid rounded" src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-primary w-25 py-2">Update Blog</button>
                        </div>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .container {
                    padding-left: 15px;
                    padding-right: 15px;
                }

                .custom-card {
                    max-width: 800px;
                    margin: 0 auto;
                    background-color: #f9f9f9;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                }

                .custom-card:hover {
                    transform: scale(1.02);
                }

                .form-label {
                    font-size: 1rem;
                    font-weight: 500;
                }

                input.form-control,
                textarea.form-control {
                    border-radius: 8px;
                    padding: 12px;
                    border: 1px solid #ddd;
                    transition: border-color 0.3s ease;
                }

                input.form-control:focus,
                textarea.form-control:focus {
                    border-color: #003a69;
                    box-shadow: 0 0 5px rgba(0, 58, 105, 0.4);
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
                    max-width: 100%;
                }

                .invalid-feedback {
                    font-size: 0.875rem;
                    color: #dc3545;
                }
            `}</style>
        </div>
    )
}

export default EditBlog;
