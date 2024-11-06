import React, { useEffect, useState } from "react";
import "../AddBlog/AddNewBlog.css";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { app } from "../../Firebase";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import CircularProgress from "@mui/material/CircularProgress";

const AddNewBlog = () => {
    const [blogName, setBlogName] = useState("");
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [blog, setBlog] = useState("");
    const [categoryName, setCategoryName] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [isLoding, setLoding] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getCategory();
        if (location.state != null) {
            setBlogName(location.state.myData.title);
            setBlog(location.state.myData.description);
            setCategoryName(location.state.myData.category);
            setImageUrl(location.state.myData.imageUrl);
        }
    }, [location.state]);

    const getCategory = () => {
        axios
            .get("http://www.localhost:3001/category")
            .then((res) => {
                setCategoryList(res.data.category);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const fileHandler = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoding(true);
        if (location.state == null) {
            const storage = getStorage(app);
            const myRef = storageRef(storage, `blogs/${Date.now()}`);
            await uploadBytes(myRef, file);
            const uploadedImageUrl = await getDownloadURL(myRef);

            axios
                .post(
                    "http://www.localhost:3001/blogs",
                    {
                        title: blogName,
                        description: blog,
                        category: categoryName,
                        imageUrl: uploadedImageUrl,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    },
                )

                .then((res) => {
                    setLoding(false);
                    navigate("/admin/dashboard/blog");
                })
                .catch((err) => {
                    console.error(err);
                });


        } else if (file == null)
            axios
                .put(
                    `http://www.localhost:3001/blogs/${location.state.myData._id}`,
                    {
                        title: blogName,
                        description: blog,
                        category: categoryName,
                        imageUrl: location.state.myData.imageUrl,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    },
                )
                .then((res) => {
                    setLoding(false);
                    navigate("/admin/dashboard/blog");
                })
                .catch((err) => {
                    console.error(err);
                });

        else {
            const storage = getStorage(app);
            const myRef = storageRef(storage, `${location.state.myData.imageUrl}`);
            await uploadBytes(myRef, file);
            const uploadedImageUrl = await getDownloadURL(myRef);

            axios
                .put(
                    `http://www.localhost:3001/blogs/${location.state.myData._id}`,
                    {
                        title: blogName,
                        description: blog,
                        category: categoryName,
                        imageUrl: uploadedImageUrl,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    },
                )
                .then((res) => {
                    setLoding(false);
                    navigate("/admin/dashboard/blog");
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const blogHandler = (content, delta) => {
        setBlog(content);
    };

    return (
        <div className="addBlog">
            <form
                onSubmit={submitHandler}
                className="addBlog__form">
                <input
                    value={blogName}
                    onChange={(e) => {
                        setBlogName(e.target.value);
                    }}
                    className="addBlog__form__input"
                    type="text"
                    placeholder="Blog Titel"
                />
                {/* <input value={blog} onChange={(e) => { setBlog(e.target.value) }} className='addBlog__form__input' type='text' placeholder='Blog ' /> */}

                <ReactQuill
                    className="addBlog__form__quill"
                    value={blog}
                    onChange={blogHandler}
                />

                <select
                    onChange={(e) => {
                        setCategoryName(e.target.value);
                    }}
                    value={categoryName}
                    className="addBlog__form__select">
                    <option>Select Category</option>
                    {categoryList.map((data) => {
                        return (
                            <option
                                key={data._id}
                                value={data.name}>
                                {data.name}
                            </option>
                        );
                    })}

                </select>

                <input
                    onChange={(e) => {
                        fileHandler(e);
                    }}
                    className="addBlog__form__input"
                    type="file"
                />

                {imageUrl != null && (
                    <img
                        className="addBlog__form__img"
                        src={imageUrl}
                        alt={blogName}
                    />
                )}

                <button
                    className="addBlog__form__btn"
                    type="submit">
                    {isLoding && (
                        <CircularProgress
                            size={22}
                            color="inherit"
                            style={{ marginRight: "10px" }}
                        />
                    )}
                    <span>Submit</span>

                </button>

            </form>

        </div>
    );
};

export default AddNewBlog;
