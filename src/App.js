import React, { useState, useEffect } from 'react';
import Post from './components/Post/Post';
import Form from './components/Form/Form';
import BuyForm from './components/Form/BuyForm';
import LoginForm from './components/Form/LoginForm';
import Bill from './components/Bill/Bill';
import TabHeader from './components/TabHeader';
import Foot from './components/Foot';
import config from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

if (firebase.apps.length === 0)
firebase.initializeApp(config)
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const firebaseAuth = firebase.auth()

function App() {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([])
  const [bills, setBills] = useState([])
  const [isSignedIn, setIsSignedInState] = useState(false)

  const showStatus = useSelector(state => state.showStatus)
  const searchPost = useSelector(state => state.searchPost)

  const form = useSelector(state => state.form)
  const postToBuy = useSelector(state => state.postToBuy) 
  const buyInfo = useSelector(state => state.buyInfo)
  const buyerForm = useSelector(state => state.buyerForm)

  useEffect(() => {
    retriveData()
    loginStatus()
  }, [])

  const loginStatus = () => {
    firebaseAuth.onAuthStateChanged(user => {
      setIsSignedInState(!!user)
    })
  }
  const retriveData = () => {
    firestore.collection("posts").onSnapshot((snapshot) => {
      let myPost = snapshot.docs.map(d => {
        const { id, title, image, content, stock, count, seller, price } = d.data()
        return { id, title, image, content, stock, count, seller, price }
      })
      setPosts(myPost)
    })
    firestore.collection("bills").onSnapshot((snapshot) => {
      let myBill = snapshot.docs.map(d => {
        const {id,buyInfo,buyer,address,postNO } = d.data()
        return {id,buyInfo,buyer,address,postNO }
      })
      setBills(myBill)
    })
  }

  const clearData = () => {
    dispatch({type:'FORM_CLEAR'})
    dispatch({type:'FILEIMAGE_CLEAR'})
    dispatch({type:'BUYINFO_CLEAR'})
    dispatch({type:'POSTTOBUY_CLEAR'})
    dispatch({type:'BUYERFORM_CLEAR'})
    dispatch({type:'SEARCH_CLEAR'})
  }


  const createPostHandler = () => {
    if(form.title!==''&&form.image!==''&&form.content!==''&&form.price!==0&&form.stock!==0){
    let id = (posts.length === 0) ? 1 : posts[posts.length - 1].id + 1
    firestore.collection("posts").doc(id + '').set({ id, ...form ,count: 0, seller: firebaseAuth.currentUser.displayName })
    clearData()
    dispatch({type:'NOT_SHOWFORM'})
    }
  }

  const cancelPostHandler = () => {
    clearData()
    dispatch({type:'NOT_SHOWFORM'})
    dispatch({type:'NOT_SHOWBUYFORM'})
  }

  const editPostHandler = (id) => {
    if(form.title!==''&&form.image!==''&&form.content!==''&&form.price!==0&&form.stock!==0){
    firestore.collection("posts").doc(id + '').set({ id, ...form, count: 0, seller: firebaseAuth.currentUser.displayName })
    clearData()
    dispatch({type:'NOT_SHOWFORM'})
    }
  }

  const deletePostHandler = (id) => {
    firestore.collection("posts").doc(id + '').delete()
    clearData()
    dispatch({type:'NOT_SHOWFORM'})
  }

  
  const createBillHandler = () => {
    if(buyerForm.buyer!==''&&buyerForm.address!==''&& buyerForm.postNO!==0){
    let id = (bills.length === 0) ? 1 : bills[bills.length - 1].id + 1
    firestore.collection("bills").doc(id + '').set({id,buyInfo,...buyerForm})
    const {title, image, content, stock, count, price, seller } = postToBuy
    firestore.collection("posts").doc(postToBuy.id + '').set({ id:postToBuy.id, title, image, content, count:0, stock:stock-count, price, seller })
    clearData()
    dispatch({type:'NOT_SHOWBUYFORM'})
    }
  }
  
  const signOutHandler = () => {
    firebaseAuth.signOut()
    clearData()
    dispatch({type:'NOT_SHOWFORM'})
    dispatch({type:'NOT_SHOWLOGINFORM'})
    dispatch({type:'NOT_SHOWBILLS'})
  }

  const renderPost = () => {
    if (posts && posts.length)
      return posts.map((post) => {
        if(searchPost===post.title.slice(0,searchPost.length))
        return (
          <Post key={post.id} post={post}
            editPostHandler={editPostHandler}
            deletePostHandler={deletePostHandler}/>
        )
        else
        return null
      })
    else
      return (<li>No Post</li>)
  }

  const renderBill = () => {
    if (bills && bills.length)
      return bills.map((bill) => {
        return (
          <Bill key={bill.id} bill={bill}/>
        )
      })
    else
      return (<li>No bill</li>)
  }
  
  return (
    <div className="App">
      <TabHeader isSignedIn={isSignedIn} signOutClick={signOutHandler}/>
      <LoginForm isSignedIn={isSignedIn} uiConfig={uiConfig}/>  
      <Form isSignedIn={isSignedIn} cancelPostHandler={cancelPostHandler} createPostHandler={createPostHandler}/>
      <BuyForm cancelHandler={cancelPostHandler} confirmHandler={createBillHandler}/>    
      <ul style={{ display: 'flex', flexWrap: 'wrap'}}>{renderPost()}</ul>
      {showStatus.showBills?<div><center>
        <div className="billTab">
        <div className="content">
          Your bill
        </div>
      </div>
      </center>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>{renderBill()}</ul></div>:null}
      <Foot/>
    </div>
  );
}
export default App;