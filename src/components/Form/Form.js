import React from 'react';
import './Form.css';
import { useSelector, useDispatch } from 'react-redux';
import {storage} from '../../App'
export default (props) => {
    const dispatch = useDispatch();
    const showLoginForm = useSelector(state => state.showStatus.showLoginForm)
    const showForm = useSelector(state => state.showStatus.showForm)
    const imageAsFile = useSelector(state => state.imageAsFile)
    const {isSignedIn,createPostHandler,cancelPostHandler} = props
    let style = null
    if(showLoginForm===false||isSignedIn===true)
    style = "formShowNoColor"

    const handleFireBaseUpload = (e) => {
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
          dispatch({type:'IMAGE_CHANGE',image:fireBaseUrl})
         })
        })
    }

    return(
        <div>
            {showForm?
            <center>
                <div className="formShow">
                <div className="row">
                <div className="col25">
                    title:
                </div>
                <div className="col50">
                <input type='text' name='title' onChange={(e)=>dispatch({type:'TITLE_CHANGE',title:e.target.value})}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    image:
                </div>
                <div className="col50">
                    <input type='file' name='image' onChange={(e)=>dispatch({type:'FILEIMAGE_CHANGE',imageAsFile:e.target.files[0]})}/>
                    <button onClick={handleFireBaseUpload}>upload to firebase</button>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    content:
                </div>
                <div className="col50">
                    <input type='text' name='content' onChange={(e)=>dispatch({type:'CONTENT_CHANGE',content:e.target.value})}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    price:
                </div>
                <div className="col50">
                <input type='number' name='price' onChange={(e)=>dispatch({type:'PRICE_CHANGE',price:e.target.value})}/>
                </div>
            </div>
            <div className="row">
            <div className="col25">
                stock:
            </div>
            <div className="col50">
                <input type='number' name='stock' onChange={(e)=>dispatch({type:'STOCK_CHANGE',stock:e.target.value})}/>
            </div>
            </div>
            <center><br/>
            <button className="cButton" onClick={createPostHandler}>Create</button> &nbsp;
            <button  className="cancelButton" onClick={cancelPostHandler}>Cancel</button>
            </center>
            </div>
        </center>: <div className={style}/>
        }
        </div>
    ) 
}
