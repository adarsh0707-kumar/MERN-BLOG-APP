import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../BlogList/BlogList.css';
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage';
import { app } from '../../Firebase';
import { useNavigate } from 'react-router-dom';



const BlogList = () => {

    const [blog, setBlog] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        getBlogs();
    },[])

    const getBlogs = () => {
        axios.get('http://www.localhost:3001/blogs')
            .then(res => {
                console.log(res.data.blog);
                setBlog(res.data.blog);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const deleteBlog = (data) => {
        if (window.confirm("Are you sure, want to delete ?? ")) {

            const storage = getStorage(app);
            const myRef = storageRef(storage, `${data.imageUrl}`);
            deleteObject(myRef)
                .then(result => {
                    axios.delete(`http://www.localhost:3001/blogs/${data._id}`, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    })
                        .then(res => {
                            console.log(res);
                            getBlogs();
                        })
                        .catch(err => {
                            console.error(err);
                        })
                })
                .catch(err => {
                    console.error(err);
                })



        }
    }

    return (
        <div className='blogList'>
            <p className='categoryList__para'>Blog List</p>
            {blog.map((Data) => (
                <div key={Data._id} className='blogList__data'>
                    <div className="blogList__data__content">
                        <p className='blogList__data__content__para'>{Data.title}</p>
                    </div>

                    
                    <div className="blogList__data__content">
                        <p className='blogList__data__content__para'>{Data.category}</p>
                    </div>

                    <div className="blogList__data__content">
                        <img className='blogList__data__content__img' src={Data.imageUrl} alt={Data.name} />
                    </div>

                    <div className="blogList__data__content">
                        <button onClick={() => { navigate('/admin/dashboard/editBlog', { state: { myData: Data } }) }} className='blogList__data__content__btn1'>Edit</button>
                    </div>

                    <div className="blogList__data__content">
                        <button onClick={() => { deleteBlog(Data) }} className='blogList__data__content__btn2'>Delet</button>
                    </div>



                </div>
            ))}
        </div>
    );
}

export default BlogList