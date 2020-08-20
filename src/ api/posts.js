// const sleep = n =>new Promise((resolve)=>setTimeout(resolve,n))

//{id,title,body}

// const posts =[
//   {
//     id:1,
//     titie:'hihi',
//     body:'리덕스 미들웨어에 대해 공부하자'
//   },
//   {
//     id:2,
//     titie:'hih',
//     body:'리덕스 미들웨어에 대해'
//   },
//   {
//     id:3,
//     titie:'hi',
//     body:'리덕스 미들웨어에'
//   }
// ];
// //가짜 api 함수 를 만들어 줌;
// export const getPosts = async()=>{
//   await sleep(500);
//   return posts;
// } 
// export const getPostsById = async (id)=>{
//   await sleep(500);
//   return posts.find(post=>post.id === id);
// }


import axios from 'axios';
import posts from '../modules/posts';
//가짜 api
export const getPosts =async()=>{
  const response =await axios.get('/posts')
  //응답된 데이터를 반환하겠다.
  return response.data;
}

export const getPostById =async (id)=>{
const response = await axios.get(`/posts/${id}`);
return response.data;
}


//
//redux thunk는 함수를 dispatch할수있게 해주는 미들웨어였다.
//redux saga는 액션을 모니터링하고있다가 특정 액션을 발생하면 특정 작업(현재 상태 조회,액션을 dispatch,javascript코드를 실행)을 한다.
//redux-saga는 thunk에서 다루기 힘든 작업을 처리할수있는데 예를 들면 비동기 작업을 진행할때 기존의 요청을 취소할수있다.
