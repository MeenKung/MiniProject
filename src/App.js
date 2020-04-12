import React,{useState,useEffect} from 'react';
import Post from './components/Post';
import Form from './components/Form';
import config from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './App.css';

if( firebase.apps.length === 0)
    firebase.initializeApp(config)
export const firestore = firebase.firestore()

function App() {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  const [posts,setPosts] = useState([])
  const [showForm,setShowForm] = useState(false)

  const [title,setTitle] = useState('')
  const [image,setImage] = useState('')
  const [content,setContent] = useState('')
  const [price,setPrice] = useState(0)
  const [stock,setStock] = useState(0)

  const [isSignedIn,setIsSignedInState] = useState(false)

  
  
  useEffect(()=>{
    retriveData()
    firebase.auth().onAuthStateChanged(user => {
      setIsSignedInState(!!user)
    })
  },[])

  const retriveData = () => {
    firestore.collection("posts").onSnapshot((snapshot) => {
        let myPost = snapshot.docs.map(d=>{
          const {id,title,image,content,stock,count,seller,price} = d.data()
          return {id,title,image,content,stock,count,seller,price}
        })
        setPosts(myPost)
    })
  }

  const renderPost = () => {
    if(posts && posts.length)
    return posts.map( (post) =>{
        return (
              <Post key={post.id} post={post} 
              editPostHandler={editPostHandler} 
              deletePostHandler={deletePostHandler} 
              showEditDeleteButton={showForm}
              plusCountHandler={plusCountHandler}
              minusCountHandler={minusCountHandler}/>
        )
      })
    else 
    return (<li>No Post</li>)
  }

  const setPostData = (event) => {
    if(event.target.name==='title'){
      setTitle(event.target.value)
    }
    if(event.target.name==='image'){
      setImage(event.target.value)
    }
    if(event.target.name==='content'){
      setContent(event.target.value)
    }
    if(event.target.name==='stock'){
      setStock(event.target.value)
    }
    if(event.target.name==='price'){
      setPrice(event.target.value)
    }
  }

  const clearData = () => {
    setTitle('')
    setImage('')
    setContent('')
    setStock(0)
    setPrice(0)
  }

  const createPostHandler = () => {
    let id = (posts.length===0)?1:posts[posts.length-1].id + 1
    firestore.collection("posts").doc(id+'').set({id,title,image,content,count:0,stock,price,seller:firebase.auth().currentUser.displayName})
    clearData()
    setShowForm(false)
  }

  const canclePostHandler = () => {
    clearData()
    setShowForm(false)
  }


  const editPostHandler = (id) => {
    firestore.collection("posts").doc(id+'').set({id,title,image,content,count:0,stock,price,seller:firebase.auth().currentUser.displayName})
    clearData()
    setShowForm(false)
  }

  const deletePostHandler = (id) => {
    firestore.collection("posts").doc(id+'').delete()
    clearData()
    setShowForm(false)
  }

  const plusCountHandler = (post) => {
    const {id, title,image,content,stock,count,price,seller} = post
    if(count<stock){
        firestore.collection("posts").doc(id+'').set({id,title,image,content,count:count+1,stock,price,seller})
    }
    
  }
  const minusCountHandler = (post) => {
    const {id, title,image,content,stock,count,price,seller} = post
    if(count>0){
        firestore.collection("posts").doc(id+'').set({id,title,image,content,count:count-1,stock,price,seller})
    }
  }
  return (
    <div className='App'>
      <h1>My Shop </h1>
      {isSignedIn ? (
          <span>
            <h1>Welcome {firebase.auth().currentUser.displayName} <img
              alt="profile"
              src={firebase.auth().currentUser.photoURL}
              width='50'
            /></h1>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          </span>
        ) : 
            <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
            }
      <div><button onClick={()=>setShowForm(true)} hidden={showForm || !isSignedIn}>Custom</button></div>
      <div>{showForm?<Form createClick={createPostHandler} setHandler={setPostData} cancelClick={canclePostHandler}/>:null}</div>
      <ul style={{display:'flex',listStyle:'none'}}>{ renderPost()}</ul>
    </div>
  );
}
export default App;