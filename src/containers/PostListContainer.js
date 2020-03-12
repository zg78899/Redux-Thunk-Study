import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { getPosts } from '../modules/posts';
import PostList from '../components/PostList';

function PostListContainer() {

  const {data,loading,error}=useSelector(state=>state.posts.posts);
  const dispatch = useDispatch();

  //useEffect을 사용하여 api을 가져온다.
  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch])
  //훅을 사용하여 duspatch을 했을때 의존성 배열에 dispatch을 넣어주는것이 lint의 속성에 맞다.
  if(loading)return <div>로딩중...</div>;
  if(error) return <div>에러 발생!!</div>;
  if(!data) return null;
  return <PostList posts={data} />;
  //위의 결과를 모두 패스 했다면 유효하다는 의미 이제는 보여 주려는 값을 반환하면 된다.
  

}
export default PostListContainer;