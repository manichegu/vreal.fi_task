import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import logo from "./assets/logo.png"
import Login from "./components/Login"
function App() {

  return (
    <>
      <div className='py-2 shadow-lg' style={{ backgroundColor: "#003a69" }}>
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo on the left */}
        <img src={logo} style={{ height: "60px", paddingLeft: "20px" }} alt="Logo" />
        
        {/* Links to Blogs and Login/Register on the right */}
        <div style={{ paddingRight: "20px" }}>
          <a href="/" className="text-white" style={{ marginRight: "15px", textDecoration: "none" }}>
            Blogs
          </a>
          <a href="/logreg" className="text-white" style={{ textDecoration: "none" }}>
            Login/Register
          </a>
        </div>
      </div>
    </div>


        <Routes>
            <Route path='/' element={ <Blogs />} />
            <Route path='/logreg' element={ <Login />} />
            <Route path='/create' element={ <CreateBlog />} />
            <Route path='/blog/:id' element={ <BlogDetail />} />
            <Route path='/blog/edit/:id' element={ <EditBlog />} />
        </Routes>   
        <ToastContainer />   
    </>
  )
}

export default App
