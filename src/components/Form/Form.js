import React from 'react';
import './Form.css';
export default (props) => {
    const {isSignedIn,showLoginForm,showForm,setHandler,handleFireBaseUpload,createPostHandler,cancelPostHandler} = props
    let style = null
    if(showLoginForm===false||isSignedIn===true)
    style = "formShowNoColor"
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
                <input type='text' name='title' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    image:
                </div>
                <div className="col50">
                    <input type='file' name='image' onChange={setHandler}/>
                    <button onClick={handleFireBaseUpload}>upload to firebase</button>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    content:
                </div>
                <div className="col50">
                    <input type='text' name='content' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col25">
                    price:
                </div>
                <div className="col50">
                <input type='number' name='price' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
            <div className="col25">
                stock:
            </div>
            <div className="col50">
                <input type='number' name='stock' onChange={setHandler}/>
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
