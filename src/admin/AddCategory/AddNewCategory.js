import React, { useState } from 'react';
import '../AddCategory/AddNewCategory.css';

const AddNewCategory = () => {


  const [categoryName, setCategoryName] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  const fileHandler = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="addCategory">
      <p>Add new category</p>

      <form className='addCategory__form'>
        <input onChange={(e) =>{setCategoryName(e.target.value)}} className='addCategory__form__input' type='text' placeholder='Category Name' />
        <input onChange={(e) => { fileHandler(e) }} className='addCategory__form__input' type='file' />
        <img className='addCategory__form__img' src={imageUrl} alt={categoryName } />
        <button className='addCategory__form__btn' type='submit'>Submit</button>
      </form>

    </div>
  )
}

export default AddNewCategory