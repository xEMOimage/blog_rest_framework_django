import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Blog = () =>{
    
    const [blogs,setBlogs] = useState([]);
    const [featuredBlog,setFeaturedBlog] = useState([]);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/featured`);
                setFeaturedBlog(res.data[1]);
            }
            catch(error) {

            }
        }
        fetchData();
    },[]);

    useEffect(()=>{
        const fetchBlogs = async () =>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
                setBlogs(res.data);
            }
            catch(error) {

            }
        }
        fetchBlogs();
    },[]);

    const capitalizeFirstLetter = (word) =>{
        if ( word)
            return word.charAt(0).toUpperCase()+word.slice(1);
        return '';
    };

    const getBlogs =() =>{
        let list = [];
        let result = [];

        blogs.map(blogPost =>{
            return list.push(
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                    <h3 className="mb-0">{blogPost.title}</h3>
                    <div className="mb-1 text-muted">{blogPost.month} {blogPost.day}</div>
                    <p className="card-text mb-auto">{blogPost.excerpt}</p>
                    <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img className="bd-placeholder-img" width="250" height="200"  src={blogPost.thumbnail} alt="thumbnail"/>
                </div>
            </div>
            );
        });
        for (let i=0;i<list.length;i+=2){
            result.push(
                <div key={i} className='row mb-2'>
                    <div className="col md-6">
                        {list[i]}
                    </div>
                    <div className="col md-6">
                        {list[i+1] ? list[i+1] :null}
                    </div>
                </div>
            )
        }

        return result;
    };

    return (
        <div className='container mt-3'>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to="/category/health">Health</Link>
                    <Link className="p-2 text-muted" to="/category/culture">Culture</Link>
                    <Link className="p-2 text-muted" to="/category/business">Business</Link>
                    <Link className="p-2 text-muted" to="/category/Oil">Oil</Link>
                    <Link className="p-2 text-muted" to="/category/Sports">Sports</Link>
                    <Link className="p-2 text-muted" to="/category/Agriculture">Agriculture</Link>
                    <Link className="p-2 text-muted" to="/category/Travel">Travel</Link>
                    <Link className="p-2 text-muted" to="/category/Blog">Blog</Link>
                </nav>
            </div>
            <br/>
            <div className="jumbotron p-2 p-md-5 text-white rounded bg-dark">
                <h1 className="display font-italic">{featuredBlog.title}</h1><br />
                <div className="col-md-8 px-1">
                <p className="lead my-3">{featuredBlog.excerpt}.........</p>
                <p className="lead mb-4">
                    <Link to={`/blog/${featuredBlog.slug}`} className="text-blue font-weight-bold">Click here to Continue reading</Link>
                </p>
            </div>
        </div>
        {getBlogs()}
    </div>
    );
};

export default Blog;