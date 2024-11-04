import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CategoryList/CategoryList.css";
import { deleteObject, getStorage, ref as storageRef } from "firebase/storage";
import { app } from "../../Firebase";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

const CategoryList = () => {
	const [category, setCategory] = useState([]);
	const navigate = useNavigate();
	const [isLoding, setLoding] = useState(false);

	useEffect(() => {
		getCategory();
	}, []);

	const getCategory = () => {
		axios
			.get("http://www.localhost:3001/category")
			.then((res) => {
				setCategory(res.data.category);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const deleteCategory = (data) => {
		if (window.confirm("Are you sure, want to delete ?? ")) {
			setLoding(true);
			const storage = getStorage(app);
			const myRef = storageRef(storage, `${data.imageUrl}`);
			deleteObject(myRef)
				.then((result) => {
					axios
						.delete(`http://www.localhost:3001/category/${data._id}`, {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("token"),
							},
						})
						.then((res) => {
							setLoding(false);
							getCategory();
						})
						.catch((err) => {
							console.error(err);
						});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	return (
		<div className="categoryList">
			{category.map((Data) => {
				return (
					<div key={Data._id} className="categoryList__data">
						<div className="categoryList__data__content">
							<p className="categoryList__data__content__para">{Data.name}</p>
						</div>

						<div className="categoryList__data__content">
							<img className="categoryList__data__content__img" src={Data.imageUrl} alt={Data.name} />
						</div>

						<div className="categoryList__data__content">
							<button
								onClick={() => {
									navigate("/admin/dashboard/editCategory", { state: { myData: Data } });
								}}
								className="categoryList__data__content__btn1">
								Edit
							</button>
						</div>

						<div className="categoryList__data__content">
							<button
								onClick={() => {
									deleteCategory(Data);
								}}
								className="categoryList__data__content__btn2">
								{isLoding && <CircularProgress size={22} color="inherit" style={{ marginRight: "10px" }} />}
								<span>Delete</span>
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CategoryList;
