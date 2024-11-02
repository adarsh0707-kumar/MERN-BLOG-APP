import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayOut from './admin/AdminLayOut';
import AdminLogin from './admin/Login/Login';
import AdminDashboard from './admin/Dashboard/Dashboard';
import Home from './admin/Home/Home';
import BlogList from './admin/BlogList/BlogList';
import AddNewBlog from './admin/AddBlog/AddNewBlog';
import CategoryList from './admin/CategoryList/CategoryList';
import AddNewCategory from './admin/AddCategory/AddNewCategory';
import CommentList from './admin/CommentList/CommentList';

const router = createBrowserRouter([
  {
    path: 'admin', element: <AdminLayOut />, children: [
      { path: 'login', Component: AdminLogin },
      {
        path: 'dashboard', Component: AdminDashboard, children: [
          { path: '', Component: Home },
          { path: 'blog', Component: BlogList },
          { path: 'addBlog', Component: AddNewBlog },
          { path: 'category', Component: CategoryList },
          { path: 'addCategory', element: <AddNewCategory key='add' mode='add'/> },
          { path: 'comment', Component: CommentList },
          { path: 'editCategory', element: <AddNewCategory key='edit' mode='edit' /> }
          
      ]}
  ]}
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
