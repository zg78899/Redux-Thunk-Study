import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

function PostListContainer() {

  const {data,loading,error} = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  //useEffect을 사용하여 api을 가져온다.
  //컴포넌트가 마운트 될때 getPosts Thunk함수를 가져온다.
  useEffect(()=>{
    //postList을 재 로딩하는 문제를 해결하기 위한 코드
    //data가 이지 존재한다면 아무것도 하지않겠다.
    // if(!data)return;
    dispatch(getPosts());
  },[dispatch])

  console.log(data);
  //훅을 사용하여 duspatch을 했을때 의존성 배열에 dispatch을 넣어주는것이 lint의 속성에 맞다.
  if(loading && !data) return <div> 로딩중...</div>;
  if(error) return <div> 에러 발생!!</div>;
  if(!data) return null;
  
  return <PostList posts={data}/>
  //위의 결과를 모두 패스 했다면 유효하다는 의미 이제는 보여 주려는 값을 반환하면 된다.
}
export default PostListContainer;