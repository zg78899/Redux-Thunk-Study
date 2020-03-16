import axios from 'axios';

export const getPosts =async()=>{
  const response =await axios.get('http://localhost:4000/posts')
  //응답된 데이터를 반환하겠다.
  return response.data;
}

export const getPostById =async (id)=>{
const response = await axios.get(`http://localhost:4000/posts/${id}`);
return response.data;
}
