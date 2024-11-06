import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Authentication/UserLogin.css';
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';

const UserLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoding, setLoding] = useState(false);


    const submitHandler = (event) => {
        event.preventDefault();
        setLoding(true);
        axios
            .post("http://www.localhost:3001/authentication/user/login", {
                email: email,
                password: password,
            })
            .then((res) => {
                setLoding(false);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("fullName", res.data.fullName);
                localStorage.setItem("Image", res.data.imageUrl);
                localStorage.setItem("token", res.data.token);
                navigate("/home");
            })
            .catch((err) => {
                console.error(err);
                window.alert('User not found');
                setLoding(false)
            });
    };



    return (
        <div
            className='userLogin'>
            <div
                className='userLogin__nav'>

                <Link
                    className='userLogin__nav__btn'
                    to='/admin/login'>
                    Login As Admin
                </Link>

                <Link
                    className='userLogin__nav__btn'>
                    Login As User
                </Link>

            </div>

            <div
                className='Container'>

                <div
                    className='userLogin__container'>

                    <h1
                        className='userLogin__container__heading'>
                        Welcome to

                    </h1>

                    <p
                        className='userLogin__container__para'>
                        <span
                            className='userLogin__container__paraSpan'>
                            Adarsh
                        </span>

                        Blog App

                    </p>

                    <form
                        className='userLogin__container__form'>

                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className='userLogin__container__form__input'
                            type='email'
                            placeholder='Email'
                        />

                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className='userLogin__container__form__input'
                            type='password'
                            placeholder='Password'
                        />

                        <button
                            onClick={submitHandler}
                            className='userLogin__container__form__btn'
                            type='submit'
                            value='Submit'>
                            {isLoding && (
                                <CircularProgress
                                    size={22}
                                    color="inherit"
                                    style={{ marginRight: "10px" }}
                                />
                            )}
                            <span>Login</span>

                        </button>

                    </form>

                </div>

                <h1
                    style={
                        { letterSpacing: '1.1px' }
                    }>

                    Don’t have an account?
                    <Link
                        style={
                            { marginLeft: '7px' }
                        }
                        to='/signup'>
                        Sign Up
                    </Link>
                </h1>

            </div>


        </div>
    )
}

export default UserLogin
