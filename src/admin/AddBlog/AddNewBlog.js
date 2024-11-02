import React, { useEffect, useState } from 'react';
import '../AddCategory/AddNewCategory.css';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { app } from '../../Firebase';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';



const AddNewBlog = () => {


  const [categoryName, setCategoryName] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    console.log(location.state);
    if (location.state != null) {
      setCategoryName(location.state.myData.name);
      setImageUrl(location.state.myData.imageUrl);
    }
  }, [location.state])


  const fileHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (location.state == null) {

      console.log(categoryName, file);
      const storage = getStorage(app);
      const myRef = storageRef(storage, `category/${Date.now()}`);
      await uploadBytes(myRef, file)
      const uploadedImageUrl = await getDownloadURL(myRef);
      console.log(uploadedImageUrl);
      axios.post('http://www.localhost:3001/category', {
        name: categoryName,
        imageUrl: uploadedImageUrl
      })
        .then(res => {
          console.log(res.data);
          navigate('/admin/dashboard/category')
        })
        .catch(err => {
          console.error(err);
        });
    }
    else {
      if (file == null) {

        axios.put(`http://www.localhost:3001/category/${location.state.myData._id}`, {
          name: categoryName,
          imageUrl: location.state.myData.imageUrl
        })
          .then(res => {
            console.log(res.data);
            navigate('/admin/dashboard/category')
          })
          .catch(err => {
            console.error(err);
          });
      }
      else {

        console.log(categoryName, file);
        const storage = getStorage(app);
        const myRef = storageRef(storage, `${location.state.myData.imageUrl}`);
        await uploadBytes(myRef, file)
        const uploadedImageUrl = await getDownloadURL(myRef);
        console.log(uploadedImageUrl);
        axios.put(`http://www.localhost:3001/category/${location.state.myData._id}`, {
          name: categoryName,
          imageUrl: uploadedImageUrl
        })
          .then(res => {
            console.log(res.data);
            navigate('/admin/dashboard/category')
          })
          .catch(err => {
            console.error(err);
          });

      }
    }
  }

  return (
    <div className="addCategory">

      <form onSubmit={submitHandler} className='addCategory__form'>

        <input value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} className='addCategory__form__input' type='text' placeholder='Category Name' />
        <input onChange={(e) => { fileHandler(e) }} className='addCategory__form__input' type='file' />
        {imageUrl != null && <img className='addCategory__form__img' src={imageUrl} alt={categoryName} />}
        <button className='addCategory__form__btn' type='submit'>Submit</button>

      </form>

    </div>
  )
}

export default AddNewBlog