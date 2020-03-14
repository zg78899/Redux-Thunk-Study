import React from 'react';
//하나의 포스트를 조회하는 프레젠테이셔널 컴포넌트

function Post({ post }) {
  const {title,body} = post;
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  )
}

export default Post;