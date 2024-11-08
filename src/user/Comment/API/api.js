import axios from 'axios';

export const getCommentById = (blogId, CommentId) => {

  return axios.get(`http://localhost:3001/comment/${blogId}/${CommentId}`);

}