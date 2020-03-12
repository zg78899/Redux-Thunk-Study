//리듀서 Utils라는 객체를 선언해주겠다.
export const reducerUtils={
  initial:(data=null)=>({
    data,
    loading:false,
    error:null
  })
}