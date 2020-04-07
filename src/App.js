import React,{useState,useEffect} from 'react';
import Post from './components/Post';
import CreatePostForm from './components/CreatePostForm';
import {firestore} from './index';
import './App.css';

function App() {
  const [posts,setPosts] = useState([])
  const [showCreateForm,setShowCreateForm] = useState(false)

  const [title,setTitle] = useState('')
  const [image,setImage] = useState('')
  const [stock,setStock] = useState(0)

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

  const buyClickHandler = () => {
    for (const key in posts) {
      if (posts.hasOwnProperty(key)) {
        const element = posts[key];
        firestore.collection("posts").doc(element.id+'').set({
          id:element.id,
          title:element.title,
          image:element.image,
          stock:element.stock-element.count,
          count:0})
      }
    }
  }

  const createNewPostClickHandler = () => {
    setShowCreateForm(!showCreateForm)
  }

  const setTitleImagePost = (event) => {
    if(event.target.name==='title'){
      setTitle(event.target.value)
    }
    else if(event.target.name==='image'){
      setImage(event.target.value)
    }
    else if(event.target.name==='stock'){
      setStock(event.target.value)
    }
  }

  const createClickHandler = () => {
    let id = (posts.length===0)?1:posts[posts.length-1].id + 1
    firestore.collection("posts").doc(id+'').set({id,title,image,stock,count:0})
    setShowCreateForm(!showCreateForm)
  }

  return (
    <div className='App'>
      <h1>My Shop</h1>
      <div>{!showCreateForm?<button onClick={createNewPostClickHandler}>Create New Post</button>:null}</div>
      <div>{showCreateForm?<CreatePostForm createClick={createClickHandler} setHandler={setTitleImagePost}/>:null}</div>
      <ul style={{display:'flex',listStyle:'none'}}>{ renderPost()}</ul>
      <button onClick={buyClickHandler}>buy</button>
    </div>
  );
}

export default App;
