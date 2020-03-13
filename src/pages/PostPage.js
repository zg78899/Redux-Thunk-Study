import React from 'react';
import PostContainer from '../containers/PostContainer';

function PostPage({ match }) {
const {id} =match.param;
const postId =parseInt(id,10);
  return (
    <PostContainer postId={postId}/>
  )
}
export default PostPage;