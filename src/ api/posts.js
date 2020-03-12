//redux-thunk로 프로미스 다루기
//Promise을 만든다.
const sleep =n=>new Promise(resolve=>setTimeout(resolve,n));
//{id,title,body} 형식의 데이터를 만들어 줄것

const posts=[
  {
    id:1,
    title:'redux미들웨어를 만들어 봅시다.',
    body:'디럭스 미들웨어를 만들어 볼까요?'
  },
  {
    id:2,
    title:'리액트를 공부하는 것은 재밌다.',
    body:'정말 재밌나요?'
  },
  {
    id:3,
    title:'개발자의 공부는 재밌다.',
    body:'조금은 재밌다. 물론 잘할 때'
  },
]
//비동기 함수
//가짜 api함수

export const getPosts =async()=>{
  await sleep(500)
  return posts;
}
export const getPostById =async (id)=>{
  await sleep(500)
  return posts.find(post => post.id === id);
}