import React from 'react';
import { toast } from 'react-toastify';

const BlogCard = ({ blog, blogs, setBlogs }) => {

    const showImage = (img) => {
        return (img) ? 'http://localhost:8000/uploads/blogs/' + img : 'https://placehold.co/600x400';
    }

    const deleteBlog = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            const res = fetch("http://localhost:8000/api/blogs/" + id, {
                method: 'DELETE'
            });

            const newBlogs = blogs.filter((blog) => blog.id !== id);
            setBlogs(newBlogs);

            toast("Blog deleted successfully.");
        }
    }

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-lg hover-effect rounded-3">
                <div className="card-image-container position-relative">
                    <img
                        src={showImage(blog.image)}
                        className="card-img-top rounded-3" style={{height:"270px"}}
                        alt={blog.title}
                    />
                   <div className="card-overlay position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-between p-3">
    <a href={`/blog/${blog.id}`} className="btn text-light w-500  mt-3" style={{ backgroundColor: "#003a69" ,height:"40px"}}>
        More
    </a>

    <div className="action-buttons d-flex ms-auto">
        <a
            href="#"
            className="text-danger delete-btn"
            onClick={() => deleteBlog(blog.id)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </a>
        <a
            href={`/blog/edit/${blog.id}`}
            className="text-dark ms-2 edit-btn"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
            </svg>
        </a>
    </div>
</div>

                </div>

                <div className="card-body p-3">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.shortDesc}</p>
                    
                </div>
            </div>

            <style jsx>{`
                .hover-effect:hover {
                    transform: scale(1.02);
                    transition: transform 0.3s ease-in-out;
                }

                .card-image-container {
                    position: relative;
                    overflow: hidden;
                    border-radius: 10px;
                }

                .delete-btn, .edit-btn {
                    font-size: 1.2rem;
                    transition: transform 0.2s ease-in-out;
                }

                .delete-btn:hover, .edit-btn:hover {
                    transform: scale(1.1);
                }

                .card-body h5 {
                    color: #003a69 ;
                    transition: color 0.3s ease;
                }

                .card-body p {
                    color: #777;
                    transition: color 0.3s ease;
                }

                .card-body a:hover {
                    background-color: #555;
                }

                .action-buttons a {
                    transition: transform 0.3s ease-in-out;
                    display: inline-block;
                    margin-left: 10px;
                }

                .card-body h5:hover {
                    color: #007bff;
                }

                .card-body p:hover {
                    color: #555;
                }

                .card:hover .card-body h5 {
                    color: #007bff;
                }

                .card:hover .card-body p {
                    color: #555;
                }

                .card-body {
                    background-color: #fff;
                    border-radius: 0 0 10px 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
}

export default BlogCard;
