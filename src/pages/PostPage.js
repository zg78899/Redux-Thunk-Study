import React from 'react';
import PostContainer from '../containers/PostContainer';

function PostPage({ match }) {
const {id} = match.param;
//url 파라미터 조회하기

//url 파라미터의 값은 문자열이기 때문에 parseInt를 사용하여 숫자로 변환해 주어야한다. 
const postId =parseInt(id,10);
  return (
    <PostContainer postId={postId}/>
  )
}
export default PostPage;