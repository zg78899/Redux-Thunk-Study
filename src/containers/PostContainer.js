import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Post from '../components/Post';
import { getPost, goToHome, printState, clearPost } from '../modules/posts';
import { reducerUtils } from '../lib/asyncUtils';

function PostContainer({postId}) {

  //초기의 post의 값은 undefined 이다. 그렇기 때문에 unefined일때 사용할 값을 설정해준다. 
  const {data,loading,error} =useSelector(
    state => 
    state.posts.post[postId] || reducerUtils.initial() )
  
    const dispatch =useDispatch();



  
  useEffect(()=>{
    //만약에 기존의 데이터가 있으면 다시 api을 요청하지 않는다.
    if(data)return;
    dispatch(getPost(postId));
  },[postId,dispatch,data]);

  useEffect(()=>{
    dispatch(getPost(postId));
    
  },[postId,dispatch])

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

