import React, { useState, useEffect } from 'react';
import Post from './components/Post/Post';
import Form from './components/Form/Form';
import BuyForm from './components/Form/BuyForm';
import LoginForm from './components/Form/LoginForm';
import Bill from './components/Bill/Bill';
import TabHeader from './components/TabHeader';
import config from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
import './App.css';

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


  const [showForm, setShowForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showBuyForm, setShowBuyForm] = useState(false)
  const [showBills, setShowBills] = useState(false)

  const [searchPost, setSearchPost] = useState('')


  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [imageAsFile, setImageAsFile] = useState('')
  const [content, setContent] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  const [post, setPost] = useState([])
  const [bills, setBills] = useState([])
  const [buyInfo, setBuyInfo] = useState([])
  const [buyer,setBuyer] = useState('')
  const [address,setAddress] = useState('')
  const [postNO,setPostNO] = useState(0)

  const [isSignedIn, setIsSignedInState] = useState(false)

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

  const renderPost = () => {
    if (posts && posts.length)
      return posts.map((post) => {
        if(searchPost===post.title.slice(0,searchPost.length))
        return (
          <Post key={post.id} post={post}
            editPostHandler={editPostHandler}
            deletePostHandler={deletePostHandler}
            showEditDeleteButton={showForm}
            plusCountHandler={plusCountHandler}
            minusCountHandler={minusCountHandler} 
            buyHandler={buyHandler}/>
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
          <Bill key={bill.id} bill={bill} deleteBillHandler={deleteBillHandler}/>
        )
      })
    else
      return (<li>No bill</li>)
  }

  const setPostData = (event) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    }
    if (event.target.name === 'image') {
      setImageAsFile(event.target.files[0])
    }
    if (event.target.name === 'content') {
      setContent(event.target.value)
    }
    if (event.target.name === 'stock') {
      setStock(event.target.value)
    }
    if (event.target.name === 'price') {
      setPrice(event.target.value)
    }
  }

  const setBuyData = (event) => {
    if (event.target.name === 'buyer') {
      setBuyer(event.target.value)
    }
    if (event.target.name === 'address') {
      setAddress(event.target.value)
    }
    if (event.target.name === 'postNO') {
      setPostNO(event.target.value)
    }
  }

  const clearData = () => {
    setTitle('')
    setImage('')
    setContent('')
    setStock(0)
    setPrice(0)
    setBuyInfo([])
    setPost([])
    setBuyer('')
    setAddress('')
    setPostNO(0)
    setSearchPost('')
  }


  const createPostHandler = () => {
    if(title!=''&&image!=''&&content!=''&&price!=0&&stock!=0){
    let id = (posts.length === 0) ? 1 : posts[posts.length - 1].id + 1
    firestore.collection("posts").doc(id + '').set({ id, title, image, content, count: 0, stock, price, seller: firebaseAuth.currentUser.displayName })
    clearData()
    setShowForm(false)}
  }

  const cancelPostHandler = () => {
    clearData()
    setShowForm(false)
    setShowBuyForm(false)
  }


  const editPostHandler = (id) => {
    if(title!=''&&image!=''&&content!=''&&price!=0&&stock!=0){
    firestore.collection("posts").doc(id + '').set({ id, title, image, content, count: 0, stock, price, seller: firebaseAuth.currentUser.displayName })
    clearData()
    setShowForm(false)
    }
  }

  const deletePostHandler = (id) => {
    firestore.collection("posts").doc(id + '').delete()
    clearData()
    setShowForm(false)
  }

  const plusCountHandler = (post) => {
    const { id, title, image, content, stock, count, price, seller } = post
    if (count < stock) {
      firestore.collection("posts").doc(id + '').set({ id, title, image, content, count: count + 1, stock, price, seller })
    }

  }
  const minusCountHandler = (post) => {
    const { id, title, image, content, stock, count, price, seller } = post
    if (count > 0) {
      firestore.collection("posts").doc(id + '').set({ id, title, image, content, count: count - 1, stock, price, seller })
    }
  }

  const buyHandler = (post) => {
    setPost(post)
    const {title, count, price, seller } = post
    if(count>0){
      let buyinfo = {title,count,price,seller,cost:price*count}
      setBuyInfo(buyinfo)
      setShowBuyForm(true)
      setShowForm(false)
    }
  }
  const createBillHandler = () => {
    if(buyer!=''&& address!=''&& postNO!=0){
    let id = (bills.length === 0) ? 1 : bills[bills.length - 1].id + 1
    firestore.collection("bills").doc(id + '').set({id,buyInfo,address,buyer,postNO})
    const {title, image, content, stock, count, price, seller } = post
    firestore.collection("posts").doc(post.id + '').set({ id:post.id, title, image, content, count:0, stock:stock-count, price, seller })
    clearData()
    setShowBuyForm(false)
    }
  }
  const deleteBillHandler = (id) => {
    firestore.collection("bills").doc(id + '').delete()
  }
  const handleFireBaseUpload = e => {
    e.preventDefault()
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    uploadTask.on('state_changed', 
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, () => {
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
     .then(fireBaseUrl => {
      setImage(fireBaseUrl)
     })
    })
  }

  return (
    <div className="App">
      <TabHeader isSignedIn={isSignedIn} 
        search={(e)=>{setSearchPost(e.target.value)}}
        signOutClick={() => {
          firebaseAuth.signOut()
          clearData()
          setShowForm(false)
          setShowLoginForm(false)
          setShowBills(false)
        }}
        customClick={() => {
          setShowForm(true)
          setShowBuyForm(false)
        }}
        showBillsClick={() => {
          setShowBills(!showBills)
        }}
        signInClick={() => {
          setShowLoginForm(true)
          setShowBuyForm(false)
        }}
        cancelClick={() => setShowLoginForm(false)}
        showCancelButton={showLoginForm}
        />
      <LoginForm isSignedIn={isSignedIn} showLoginForm={showLoginForm} uiConfig={uiConfig}/>  
      <Form isSignedIn={isSignedIn} showLoginForm={showLoginForm} showForm={showForm} 
        handleFireBaseUpload={handleFireBaseUpload}
        setHandler={setPostData} cancelPostHandler={cancelPostHandler} createPostHandler={createPostHandler}/>
      <BuyForm showBuyForm={showBuyForm} buyInfo={buyInfo} setHandler={setBuyData} cancelHandler={cancelPostHandler} confirmHandler={createBillHandler}/>    
      <ul style={{ display: 'flex', flexWrap: 'wrap'}}>{renderPost()}</ul>
      {showBills?<div><center>
        <div className="billTab">
        <div className="content">
          Your bill
        </div>
      </div>
      </center>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>{renderBill()}</ul></div>:null}
      <div className="foot">
        <div className="content">
          Alameen Da-oh 6035512018
          </div>
      </div>
    </div>
  );
}
export default App;