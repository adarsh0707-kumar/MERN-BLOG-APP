import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayOut from "./admin/AdminLayOut";
import AdminLogin from "./admin/Login/Login";
import AdminDashboard from "./admin/Dashboard/Dashboard";
import Home from "./admin/Home/Home";
import BlogList from "./admin/BlogList/BlogList";
import AddNewBlog from "./admin/AddBlog/AddNewBlog";
import CategoryList from "./admin/CategoryList/CategoryList";
import AddNewCategory from "./admin/AddCategory/AddNewCategory";
import CommentList from "./admin/CommentList/CommentList";
import { isLogin } from "../src/checkAuth";
import UserLayOut from "./user/UserLayOut";
import UserHome from "./user/Home/UserHome";
import AboutUs from "./user/About/AboutUs";
import Blogs from "./user/Blogs/Blogs";
import Contact from "./user/Contact/Contact";
import UserLogin from "./user/Authentication/UserLogin";
import UserSignup from "./user/Authentication/UserSignup";

const router = createBrowserRouter([
	{
		path: "",
		element: <UserLayOut />,
		children: [
			{ path: "", element: <UserHome /> },
			{ path: "home", element: <UserHome /> },
			{ path: "about", element: <AboutUs /> },
			{ path: "blogs", element: <Blogs /> },
			{ path: "contact", element: <Contact /> },
			{ path: "login", element: <UserLogin /> },
			{ path: "signup", element: <UserSignup /> },
		],
	},
	{
		path: "admin",
		element: <AdminLayOut />,
		children: [
			{ path: "login", Component: AdminLogin },
			{
				path: "dashboard",
				loader: isLogin,
				Component: AdminDashboard,
				children: [
					{ path: "", Component: Home },
					{ path: "blog", element: <BlogList /> },
					{ path: "addBlog", element: <AddNewBlog key="addBlog" mode="addBlog" /> },
					{ path: "category", element: <CategoryList /> },
					{ path: "addCategory", element: <AddNewCategory key="add" mode="add" /> },
					{ path: "comment", element: <CommentList /> },
					{ path: "editCategory", element: <AddNewCategory key="edit" mode="edit" /> },
					{ path: "editBlog", element: <AddNewBlog key="editBlog" mode="editBlog" /> },
				],
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
