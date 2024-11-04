import React, { useEffect, useState } from "react";
import "../Home/UserHome.css";
import developer from "../../assets/development.svg";
import axios from "axios";
import Footer from "../Footer/Footer";

const UserHome = () => {

	const [Category, setCategory] = useState([]);
	const [Blog, setBlog] = useState([]);


	useEffect(() => {
		getCategory();
		getBlog();
	}, [])

	const getCategory = () => {
		axios.get('http://www.localhost:3001/category/latest-category/4')
			.then(result => {
				console.log(result);
				setCategory(result.data.Category);
			})
			.catch(err => {
				console.error(err);
			});
	}


	const getBlog = () => {
		axios.get('http://www.localhost:3001/blogs/latest-blog/4')
			.then(result => {
				console.log(result);
				setBlog(result.data.Blog);
			})
			.catch(err => {
				console.error(err);
			});
	}



	return (
		<div className="userHome">
			<div className="userHome__banner">
				<div className="userHome__banner__img">
					<img src={developer} alt="img" />
				</div>

				<div className="userHome__banner__content">
					<p>Welcome to</p>
					<h1>Adarsh Blog App</h1>
				</div>
			</div>

			<div className="userHome__topCategory">

				<h1 className="userHome__topCategory__heading">Latest Category</h1>
				<div className="userHome__topCategory__data">
					{Category.map(data => (
						<div>
							<img
								className="userHome__topCategory__data__img"
								src={data.imageUrl}
								alt={data.name} />
							
							<p
								className="userHome__topCategory__data__para">
								{data.name}

							</p>
						</div>
					))}

				</div>

			</div>



			<div className="userHome__topBlog">

				<h1 className="userHome__topBlog__heading">Latest Blog</h1>
				<div className="userHome__topBlog__data">
					{Blog.map(Data => (
						<div className="userHome__topBlog__data__blog">


							<img
								className="userHome__topBlog__data__blog__img"
								src={Data.imageUrl}
								alt={Data.name} />
							

							<p
								className="userHome__topBlog__data__blog__category">
								{Data.category}

							</p>


							<p
								className="userHome__topBlog__data__blog__title">
								{Data.title}

							</p>

						
							

						</div>
					))}
				</div>

			</div>

			<Footer/>

		</div>

	);
};

export default UserHome;
