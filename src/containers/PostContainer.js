import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Post from '../components/Post';
import { getPost, goToHome, printState } from '../modules/posts';
import { reducerUtils } from '../lib/asyncUtils';

function PostContainer({postId}) {
  const {data,loading,error} =useSelector(
    state => 
    state.posts.post[postId] || reducerUtils.initial() )
  const dispatch =useDispatch();

  useEffect(()=>{
    //만약에 기존의 데이터가 있으면 다시 api을 요청하지 않는다.
    if(data)return;
    dispatch(getPost(postId));
  },[postId,dispatch,data]);

  if(loading && !data) return <div> 로딩중...</div>
  if(error) return <div>에러 발생!!</div>
  if(!data) return null;
  
  return (
    <>
    <button onClick={()=>dispatch(goToHome())}>홈으로 이동</button>
    <button onClick={()=>dispatch(printState())}>상태를 조회</button>
   <Post post={data}/>
    </>
  )

}
export default PostContainer;