import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../CommentList/CommentList.css';


const CommentList = () => {

  const [comment, setComment] = useState([]);
  // const navigate = useNavigate();



  useEffect(() => {
    getComment();
  }, [])

  const getComment = () => {
    axios.get('http://www.localhost:3001/comment')
      .then(res => {
        console.log(res.data.comment);
        setComment(res.data.comment);
      })
      .catch(err => {
        console.error(err);
      })
  }

  const deleteComment = (data) => {
    if (window.confirm("Are you sure, want to delete ?? ")) {

      axios.delete(`http://www.localhost:3001/comment/${data._id}`)
        .then(res => {
          console.log(res);
          getComment();
        })
        .catch(err => {
          console.error(err);
        })





    }
  }

  return (
    <div className='commentList'>
      {comment.map((Data) => (

        <div key={Data._id} className='commentList__data'>

          <p className='commentList__data__paraDate'><span>Date :- </span>{Data.timestamp}</p>
          <p className='commentList__data__paraEmail'><span>User :- </span>{Data.email}</p>

          <p className='commentList__data__para'>{Data.commentText}</p>
          <button onClick={() => { deleteComment(Data) }} className='commentList__data__btn'>Delete</button>

        </div>

      ))}

    </div>
  )
}

export default CommentList