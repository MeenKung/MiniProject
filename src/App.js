import React,{useState,useEffect} from 'react';
import Post from './components/Post';
import {firestore} from './index'

function App() {
  const [posts,setPosts] = useState([])

  useEffect(()=>{
    retriveData()
  },[])

  const retriveData = () => {
    firestore.collection("posts").onSnapshot((snapshot) => {
        let myPost = snapshot.docs.map(d=>{
          const {id,title,image,stock,count} = d.data()
          return {id,title,image,stock,count}
        })
        setPosts(myPost)
    })
  }

  const renderPost = () => {
    if(posts && posts.length)
    return posts.map( (post,index) =>{
        return (
          <Post key={index} post={post}/>
        )
      })
    else 
    return (<li>No Post</li>)
  }
  return (
    <div>
      <h1>My Shop</h1>
      <ul style={{display:'flex',listStyle:'none'}}>{ renderPost()}</ul>
      <button >buy</button>
    </div>
  );
}

export default App;
