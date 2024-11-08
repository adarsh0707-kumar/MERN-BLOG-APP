import React, { useCallback, useEffect, useState } from 'react';
import '../Comment/Comment.css';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import { Link,  useParams } from 'react-router-dom';
import { getBlogById } from '../Blogs/API/api';


const Comment = () => {

  const email = localStorage.getItem('email');
  const [commentText, setCommentText] = useState('');
  const [blogId, setBlogId] = useState('');
  const [Comments, setComments] = useState([]);
  const [isLoding, setLoding] = useState(false);
  const [count, setCount] = useState();
  // const [commentId, setCommentId] = useState('')

  


  // const location = useLocation();
  const { blogsId} = useParams();

  const getCountComment = useCallback(() => {
    axios.get(`http://www.localhost:3001/comment/get/count/${blogId}`)
      .then(result => {
        console.log(result)
        setCount(result.data.total)
      })
      .catch(err => {
        console.error(err)
      })
  }, [blogId])
  // console.log(count)

  const deleteCommentById = (data) => {
    setLoding(true)
    if (data.email === email) {
      if (window.confirm('Do you want to delete this comment')) {
        axios.delete(`http://www.localhost:3001/comment/${data._id}`)
          .then(result => {
            setLoding(false)
            getCommentbyBlogId()
            getCountComment()
          })
          .catch(err => {
            setLoding(false)
            console.error(err)
          })
      }
      else {
        setLoding(false)
      }
    }
    else {
      window.alert("You can Only Delete Your Comment !");
      setLoding(false)
    }
  }



  const getCommentbyBlogId = useCallback(() => {
    axios.get(`http://www.localhost:3001/comment/${blogId}`)
      .then(result => {
        console.log(result)
        setComments(result.data.comment);
        // setCount(result.data.comment.length())
      })
      .catch(err => {
        console.error(err);
      })
  }, [blogId]);


  const fetchBlogId = useCallback(() => {
    getBlogById(blogsId)
      .then((response) => {
        console.log(response)
        setBlogId(response.data.blog[0]._id);
      })
      .catch(err => {
        console.error(err);
      });
    
  }, [blogsId]);


  const submitHandler = (e) => {
    e.preventDefault();
    setLoding(true)

    axios
      .post(
        "http://www.localhost:3001/comment",
        {
          email: email,
          commentText: commentText,
          blogId: blogId
        },

      )

      .then((res) => {
        setLoding(false);
        getCommentbyBlogId()
        getCountComment()
        
      })
      .catch((err) => {
        console.error(err);
      });
  }



  useEffect(() => {
    fetchBlogId();
    getCommentbyBlogId();
    getCountComment();
  }, [fetchBlogId, getCommentbyBlogId, getCountComment]);




  



  return (
    <div
      className='comment'>

      <div
        className='comment__container'>

        <form
          onSubmit={submitHandler}
          className='comment__container__form'>

          <input
            className='comment__container__form__input'
            disabled
            value={email}
            type='email'
            placeholder='Email'
          />

          <textarea
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
            autoCorrect="on"
            required
            spellCheck="true"
            autoCapitalize="on"
            className='comment__container__form__textArea'
            rows='10'
            placeholder='Your Comment'
            type='text'
          // columns = '1000'
          />

          <button
            className='comment__container__form__btn'
            type='submit'

            value=''
          >
            {isLoding && (
              <CircularProgress
                size={22}
                color="inherit"
                style={{ marginRight: "10px" }}
              />
            )}

            <span>Post Comment</span>
          </button>

        </form>

      </div>


      <div
        className='comment__showAll'>

        <h1
          className='comment__showAll__h1'>
          {count || 0} Comment on this blogs
        </h1>

        <div
          className='comment__showAll__container'>
          {Comments.map(data => (
            <div key={data._id}
              className='comment__showAll__container__data'>

              <p
                className='comment__showAll__container__data__user'>
                <span>User :- </span>{data.email}

              </p>

              <p
                className='comment__showAll__container__data__text'>
                {data.commentText}

              </p>

              <p
                className='comment__showAll__container__data__time'>

                {data.timestamp}

              </p>

              <Link
                to={`/blogs/${blogId}/comment/reply/${data._id}`}
                className='comment__showAll__container__data__btn'
        
              >

                {isLoding && (
                  <CircularProgress
                    size={22}
                    color="inherit"
                    style={{ marginRight: "10px" }}
                  />
                )}

                <span>Reply</span>
              </Link>

              <Link
                onClick={
                  () => deleteCommentById(data)
                }
                className='comment__showAll__container__data__btn'>

                {isLoding && (
                  <CircularProgress
                    size={22}
                    color="inherit"
                    style={{ marginRight: "10px" }}
                  />
                )}

                <span>Delete</span>

              </Link>


            </div>

          ))}


        </div>

      </div>


    </div>
  )
}

export default Comment