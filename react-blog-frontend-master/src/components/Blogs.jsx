import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import ReactPaginate from 'react-paginate';

const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const [keyword, setKeyword] = useState('');

    const fetchBlogs = async () => {
        const res = await fetch('http://localhost:8000/api/blogs');
        const result = await res.json();
        console.log("blogs data:");
        console.log(result);
        setBlogs(result.data);        
    }

    const searchBlogs = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8000/api/blogs?keyword='+keyword);
        const result = await res.json();
        setBlogs(result.data);    

    }

    const resetSearch = () => {
        fetchBlogs();
        setKeyword('');
    }

    useEffect(() => {
        fetchBlogs();
    },[])

  return (
    <div className='container'>
        <div className="d-flex justify-content-center pt-5 ">
          
          <form onSubmit={(e) => searchBlogs(e)}>
            <div className='d-flex'>
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value) } className='form-control' placeholder='Explore blogs here' />
                <button className='btn btn-dark ms-2'  style={{ backgroundColor: "#003a69" }}><i class="fa fa-search" aria-hidden="true"></i></button>
                <button type='button' onClick={() => resetSearch()} className='btn btn-warning mx-2'>Reset</button>
                <a href='/create' className='btn btn-success'  >Create</a>
            </div>
          </form>
        </div>
        <div className="text-center justify-content-between pt-5 mb-4">
          <h2>Blogs</h2>
          
        </div>
        <div className='row'>
            
            {
                (blogs) && blogs.map((blog) => {
                    return (<BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id}/>)
                })
            }
            {!(blogs)&&(
              <h1>empty</h1>
            )

            }
            
            
            
        </div>
    </div>
  )
}

export default Blogs