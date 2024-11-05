import axios from 'axios';

export const getBlogById = (blogId) => {
  return axios.get(`http://localhost:3001/blogs/${blogId}`);
}