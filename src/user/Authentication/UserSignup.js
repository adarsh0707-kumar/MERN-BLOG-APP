import axios from 'axios';
import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { app } from "../../Firebase";
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import '../Authentication/UserSignup.css';

const UserSignup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [isLoding, setLoding] = useState(false);
    const [strength, setStrength] = useState(null);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setStrength(getPasswordStrength(newPassword));
    };

    const getPasswordStrength = (password) => {
        let strength = 0;

        // Check password length
        if (password.length >= 8) {
            strength += 1;
        }

        // Check for digits
        if (/\d/.test(password)) {
            strength += 1;
        }

        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }

        // Check for lowercase letters
        if (/[a-z]/.test(password)) {
            strength += 1;
        }

        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }

        switch (strength) {
            case 0:
            case 1:
                return 'Weak';
            case 2:
            case 3:
                return 'Fair';
            case 4:
            case 5:
                return 'Strong';
            default:
                return 'Excellent';
        }
    }
    const fileHandler = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            // setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoding(true);

        const storage = getStorage(app);
        const myRef = storageRef(storage, `User/${Date.now()}`);
        await uploadBytes(myRef, file);
        const uploadedImageUrl = await getDownloadURL(myRef);

        axios
            .post(
                "http://www.localhost:3001/authentication/user/signup",
                {
                    fullName: fullName,
                    email: email,
                    password: password,
                    imageUrl: uploadedImageUrl,
                },

            )

            .then((res) => {
                setLoding(false);
                navigate("/login");
            })
            .catch((err) => {
                setLoding(false);
                console.error(err);
            });

    }



    return (
        <div
            className='userSignup'>

            <div
                className='userSignup__container'>

                <h2
                    className='userSignup__container__heading'>
                    Sign Up Form
                </h2>

                <form
                    className='userSignup__container__form'
                    onSubmit={submitHandler}>

                    <label
                        className='userSignup__container__form__label'>
                        Full Name:
                    </label>


                    <input
                        className='userSignup__container__form__input'
                        type="text"
                        placeholder='Full Name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    <label
                        className='userSignup__container__form__label'>Email:

                    </label>


                    <input
                        className='userSignup__container__form__input'
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required

                    />

                    <label
                        className='userSignup__container__form__label'>
                        Password:

                    </label>

                    <input
                        className='userSignup__container__form__input'
                        type="password"
                        placeholder='Password'
                        value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        required
                        onChange={handlePasswordChange}
                    />

                    {password && (
                        <div
                            className={`password-strength-meter ${strength.toLowerCase()}`}
                        >
                            Password Strength: {strength}
                        </div>
                    )}


                    <label
                        className='userSignup__container__form__label'>
                        Profile Image:

                    </label>

                    <input
                        className='userSignup__container__form__input'
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            fileHandler(e);
                        }}
                        required
                    />


                    <button
                        className='userSignup__container__form__btn'
                        type="submit">

                        {isLoding && (
                            <CircularProgress
                                size={22}
                                color="inherit"
                                style={{ marginRight: "10px" }}
                            />
                        )}

                        <span>
                            Sign Up
                        </span>

                    </button>


                </form>

            </div>



            <div
                className='userSignup__login'>
                <h1
                    className='userSignup__login__heading'>
                    Already have an account?

                    <Link
                        className='userSignup__login__heading__link'
                        to='/login'>
                        Login

                    </Link>

                </h1>

            </div>

        </div>
    );
};
export default UserSignup