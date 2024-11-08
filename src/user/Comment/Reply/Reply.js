import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCommentById } from '../API/api';
import { getBlogById } from '../../Blogs/API/api';
import CircularProgress from "@mui/material/CircularProgress";
import '../Reply/Reply.css';
import axios from 'axios';

const Reply = () => {

  const [Blog, setBlog] = useState('');
  const [comment, setComment] = useState([])
  const email = localStorage.getItem('email');
  const [commentText, setCommentText] = useState('');
  const [Comments, setComments] = useState([]);
  const [isLoding, setLoding] = useState(false);
  const [count, setCount] = useState();

  const navigate = useNavigate();


  const { blogsId, CommentId } = useParams();



  const getCountComment = useCallback(() => {

    axios.get(`http://www.localhost:3001/comment/get/count/${CommentId}`)
      .then(result => {
        console.log(result)
        setCount(result.data.total)
      })
      .catch(err => {
        console.error(err)
      })
  }, [CommentId])


  const getCommentbyBlogId = useCallback(() => {
    axios.get(`http://www.localhost:3001/comment/${CommentId}`)
      .then(result => {
        console.log(result)
        setComments(result.data.comment);
        setCount(result.data.comment.length())
      })
      .catch(err => {
        console.error(err);
      })
  }, [CommentId]);



  const submitHandler = (e) => {
    e.preventDefault();
    setLoding(true)

    axios
      .post(
        "http://www.localhost:3001/comment",
        {
          email: email,
          commentText: commentText,
          blogId: CommentId
        },

      )

      .then((res) => {
        setLoding(false);
        getCommentbyBlogId()
        getCountComment()
      })
      .catch((err) => {
        setLoding(false)
        console.error(err);
      });
  }


  const backHandler = (data) => {
    navigate(`/blogs/${data}/comment`)
  }

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




  useEffect(() => {
    getCommentbyBlogId();
    getCountComment();
    
    getBlogById(blogsId)
      .then((response) => {
        console.log(response)
        setBlog(response.data.blog[0]._id);
      })
      .catch(err => {
        console.error(err);
      })


    getCommentById(Blog, CommentId)

      .then((result) => {
        console.log(result)
        setComment(result.data.comment);
      })
      .catch(err => {
        console.error(err);
      })

  }, [blogsId, CommentId, Blog, getCommentbyBlogId, getCountComment]);








  return (
    <div className='reply'>

      <div
        className='reply__container'>

        <form
          onSubmit={submitHandler}
          className='reply__container__form'>

          <input
            className='reply__container__form__input'
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
            className='reply__container__form__textArea'
            rows='10'
            placeholder='Your Comment'
            type='text'
          // columns = '1000'
          />

          <button
            className='reply__container__form__btn'
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
        className="reply__showAll">

        <div
          className="reply__showAll__onReply">

          {comment.map(data => (

            <div
              key={data._id}
              className="reply__showAll__onReply__data">


              <p
                className="reply__showAll__onReply__data__user">
                <span>User :- </span>{data.email}

              </p>

              <p
                className="reply__showAll__onReply__data__text">
                <span>Comment :- </span>{data.commentText}

              </p>

              <div
                className="reply__showAll__onReply__data__time">
                <span>{data.timestamp}</span>

                <button
                  onClick={() => backHandler(data.blogId)}
                  className="reply__showAll__onReply__data__time__link">
                  Back

                </button>

              </div>

            </div>

          ))}

        </div>
        <h1>{count} reply on this Comment</h1>
        <div
          className='reply__showAll__container'>



          {Comments.map(data => (
            <div key={data.key}
              className='reply__showAll__container__data'>

              <p
                className='reply__showAll__container__data__user'>
                <span>User :- </span>{data.email}

              </p>

              <p
                className='reply__showAll__container__data__text'>
                {data.commentText}

              </p>

              <p
                className='reply__showAll__container__data__time'>

                {data.timestamp}

              </p>

              <Link
                to={`./reply/${data._id}`}
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
                className='reply__showAll__container__data__btn'>

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

  );

}

export default Reply