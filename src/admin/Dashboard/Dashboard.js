import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { Link, Outlet } from 'react-router-dom';
import('../Dashboard/Dashboard.css');


const Dashboard = () => {




  return (
    <div className='dashboard'>

      <div className='dashboard__sideNavbar'>
        <div className='dashboard__sideNavbar__logoContainer'>
          <img className='dashboard__sideNavbar__logoContainer__logo' src={require('../../assets/a.png')} alt='logo' />
          <h1 className='dashboard__sideNavbar__logoContainer__logoHeading'>Adarsh MERN Blog App</h1>
        </div>

        <Link to='/admin/dashboard/' className='dashboard__sideNavbar__link' style={{ background: 'orange' }}><DashboardIcon /><span>Dashboard</span></Link>
        <Link to='/admin/dashboard/blog' className='dashboard__sideNavbar__link'><EditNoteIcon /><span>Blog List</span></Link>
        <Link to='/admin/dashboard/addBlog' className='dashboard__sideNavbar__link'><AddBoxSharpIcon /><span>Add Blog</span></Link>
        <Link to='/admin/dashboard/category' className='dashboard__sideNavbar__link'><CategoryIcon /><span>Category List</span></Link>
        <Link to='/admin/dashboard/addCategory' className='dashboard__sideNavbar__link'><PlaylistAddIcon /><span>Add Category</span></Link>
        <Link to='/admin/dashboard/comment' className='dashboard__sideNavbar__link'><MapsUgcIcon /><span>Comments</span></Link>
        <Link className='dashboard__sideNavbar__link'><PeopleAltIcon /><span>Log Out</span></Link>

      </div>

      <div className='dashboard__mainContent'>
        <Outlet />
      </div>

    </div>
  )
}

export default Dashboard