import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBlogById } from '../API/api';
import parse from 'html-react-parser';
import '../BlogDetail/BlogDetail.css'

const BlogDetail = () => {
  const [Blog, setBlog] = useState([]);
  const { blogsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogById(blogsId)
      .then((response) => {
        console.log(response)
        setBlog(response.data.blog[0]);
      })
      .catch(err => {
        console.error(err);
      })
  }, [blogsId]);

  const handleComment = (blogId) => {
    getBlogById(blogId)
      .then((response) => {
        // Handle the response data
        const blog = response.data.blog;
        console.log(blog)

        navigate(`/blogs/${blogId}/comment`, { state: blog });
      });
  };


  return (
    <div className='blogDetail'>

      <div className='blogDetail__blog'>

        {Blog && (

          <div className='blogDetail__blog__data'>

            <h1
              className='blogDetail__blog__data__title'>
              {Blog.title}

            </h1>

            <h2
              className='blogDetail__blog__data__category'>
              Category :- {Blog.category}

            </h2>

            <img
              className='blogDetail__blog__data__img'
              src={Blog.imageUrl}
              alt={Blog.title}
            />

            <p
              className='blogDetail__blog__data__description'>
              {
                parse(`${Blog.description}`)
              }

            </p>

          </div>

        )}
        <Link
          to='/blogs'
          className='blogDetail__blog__btn'>
          Back
        </Link>

        <Link
          to={`/blogs/${Blog.id}/comment`}
          onClick={() => {
            handleComment(Blog._id)
          }}
          className='blogDetail__blog__btn'>

          Comment
        </Link>

      </div>

    </div>

  );
};

export default BlogDetail;