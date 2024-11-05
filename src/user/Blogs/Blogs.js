import React, { useEffect, useState } from "react";
import '../Blogs/Blogs.css';
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getBlogById } from './API/api';

const Blogs = () => {

    const [Category, setCategory] = useState([]);
    const [Blog, setBlog] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getCategory();
        getBlog();
        getBlogCategory();
    }, [])
    // category: req.params.category

    const getCategory = () => {
        axios.get('http://www.localhost:3001/category/')

            .then(result => {

                console.log(result.data);
                setCategory(result.data.category);
            })

            .catch(err => {
                console.error(err);
            });
    }


    const getBlog = () => {
        axios.get('http://www.localhost:3001/blogs')

            .then(result => {

                console.log(result);
                setBlog(result.data.blog);
            })

            .catch(err => {
                console.error(err);
            });
    }


    const getBlogCategory = (category) => {
        axios.get('http://www.localhost:3001/blogs/category/' + category)

            .then(result => {

                console.log(result.data);
                setBlog(result.data.blog);
            })

            .catch(err => {
                console.error(err);
            });
    }

    const handleReadMore = (blogId) => {
        getBlogById(blogId)
            .then((response) => {
                // Handle the response data
                const blog = response.data.blog;
                
                // Navigate to BlogDetail page with the blog data
                navigate(`/blogs/${blogId}`, { state: blog });
            });
    };



    return (
        <div className="main">
            <div className="blogs">

                <div className="blogs__blog">

                    <div className="blogs__blog__data">
                        {Blog.map(Data => (
                            <div className="blogs__blog__data__blogItem">


                                <img
                                    className="blogs__blog__data__blogItem__img"
                                    src={Data.imageUrl}
                                    alt={Data.name} />


                                <p
                                    className="blogs__blog__data__blogItem__category">
                                    {Data.category}

                                </p>


                                <p

                                    className="blogs__blog__data__blogItem__title">
                                    {Data.title}

                                </p>

                                <Link
                                    to={`/blogs/${Data._id}`}
                                    onClick={() => {
                                        handleReadMore(Data._id)
                                    }}
                                    className="blogs__blog__btn">
                                    Read More
                                </Link>


                            </div>

                        ))}

                    </div>
                    <Outlet />
                </div>


                <div className="blogs__category">

                    <h1>All Category</h1>

                    <button
                        onClick={() => {
                            getBlog()
                        }}
                        className="blogs__category__btn">
                        All Blogs
                    </button>

                    {Category.map(data => (
                        <div>

                            <button
                                onClick={() => {
                                    getBlogCategory(data.name)
                                }}
                                className="blogs__category__btn">
                                {data.name}
                            </button>

                        </div>

                    ))}
                </div>



            </div>

        </div>

    );
};

export default Blogs;
