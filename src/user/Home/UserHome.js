import React from "react";
import "../Home/UserHome.css";
import developer from "../../assets/development.svg";

const UserHome = () => {
	return (
		<div className="userHome">
			<div className="userHome__banner">
				<div className="userHome__banner__img">
					<img src={developer} alt="img" />
				</div>
				<div></div>
			</div>
		</div>
	);
};

export default UserHome;
