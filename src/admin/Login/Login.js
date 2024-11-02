import React, { useState } from 'react';
import '../Login/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(userName, password);
        axios.post('http://www.localhost:3001/authentication/admin/login', {
            userName: userName,
            password: password
        })
            .then(res => {
                console.log(res.data);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('fullName', res.data.fullName);
                localStorage.setItem('token', res.data.token);
                navigate('/admin/dashboard')
            })
            .catch(err => {
                console.error(err);
            });
    }


    return (

        <div className='loginContainer'>


            <form className='loginContainer__loginBox'>
                <img className='loginContainer__loginBox__img' src={require('../../assets/a.png')} alt='' />
                <h1 className='loginContainer__loginBox__h1'>Adarsh Blog App</h1>
                
                <input onChange={(e) => { setUserName(e.target.value) }} className='loginContainer__loginBox__input' type='text' placeholder='User Name' />
                
                <input onChange={(e) => { setPassword(e.target.value) }} className='loginContainer__loginBox__input' type='password' placeholder='Password' />
                
                <input onClick={submitHandler} className='loginContainer__loginBox__btn' type='submit' value='Login' />
            </form>


        </div>

    )
}

export default Login