import React, { useEffect, useState } from "react";
import "../NavBar/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("fullName") !== null
    );

    const [user, setUser] = useState({
        fullName: localStorage.getItem("fullName"),
        image: localStorage.getItem("Image"),
    });

    const logOutHandler = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUser({
            fullName: "",
            image: "",
        });
    };

    const logInHandler = () => {
        setIsLoggedIn(true);
    };

    useEffect(() => {
        
        if (isLoggedIn) {
            setUser({
                fullName: localStorage.getItem("fullName"),
                image: localStorage.getItem("Image"),
            });
        }
        // setIsLoggedIn(localStorage.getItem("fullName") !== null);
    }, [isLoggedIn]);

    return (
        <div className="navBar">
            <div className="navBar__logo">
                <Link
                    to="/home"
                    className="navBar__logo__para">
                    <span className="navBar__logo__paraSpan">AKG</span>
                    Blog App
                </Link>
            </div>

            <div>
                <h1>Welcome
                    <span
                        style={{ fontSize: '18px', marginLeft: '7px', color: 'rgb(223, 11, 223)', letterSpacing: '2px', textTransform: 'capitalize' }}>
                        {user.fullName}
                    </span></h1>
            </div>

            <div className="navBar__menu">
                <Link
                    className="navBar__menu__link"
                    to="/home">
                    Home
                </Link>

                <Link
                    className="navBar__menu__link"
                    to="/blogs">
                    Blogs
                </Link>

                <Link
                    className="navBar__menu__link"
                    to="/about">
                    About
                </Link>

                <Link
                    className="navBar__menu__link"
                    to="/contact">
                    Contact
                </Link>

                <Link
                    className="navBar__menu__link"
                    onClick={logInHandler}
                    to="/login">
                    Login
                </Link>

                <Link
                    className="navBar__menu__link"
                    to="/login"
                    onClick={logOutHandler}>
                    LogOut
                </Link>

                <img
                    className="navBar__menu__img"
                    src={user.image}
                    alt={user.fullName}
                />

            </div>
        </div>
    );
};

export default NavBar;
