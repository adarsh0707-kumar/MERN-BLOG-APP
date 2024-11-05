import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogById } from '../API/api';
import parse from 'html-react-parser';
import '../BlogDetail/BlogDetail.css'

const BlogDetail = () => {
  const [Blog, setBlog] = useState([]);
  const { blogsId } = useParams();

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

      </div>

    </div>

  );
};

export default BlogDetail;