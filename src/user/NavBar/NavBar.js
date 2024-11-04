import React from "react";
import "../NavBar/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<div className="navBar">
			<div className="navBar__logo">
				<Link to="/home" className="navBar__logo__para">
					<span className="navBar__logo__paraSpan">AKG</span>
					Blog App
				</Link>
			</div>

			<div className="navBar__menu">
				<Link className="navBar__menu__link" to="/home">
					Home
				</Link>

				<Link className="navBar__menu__link" to="/blogs">
					Blogs
				</Link>

				<Link className="navBar__menu__link" to="/about">
					About
				</Link>

				<Link className="navBar__menu__link" to="/contact">
					Contact
				</Link>

				<Link className="navBar__menu__link" to="/login">
					Login
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
