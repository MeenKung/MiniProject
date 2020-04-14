import React from 'react';
import './Form.css';
export default (props) => {
    const {isSignedIn,showLoginForm,showForm,setHandler,createPostHandler,cancelPostHandler} = props
    let style = null
    if(showLoginForm===false||isSignedIn===true)
    style = "formShowNoColor"
    return(
        <div>
            {showForm?
            <center>
                <div className="formShow">
                <div className="row">
                <div className="col-25">
                    title:
                </div>
                <div className="col-50">
                <input type='text' name='title' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    image(url):
                </div>
                <div className="col-50">
                    <input type='text' name='image' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    content:
                </div>
                <div className="col-50">
                    <input type='text' name='content' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                    price:
                </div>
                <div className="col-50">
                <input type='number' name='price' onChange={setHandler}/>
                </div>
            </div>
            <div className="row">
            <div className="col-25">
                stock:
            </div>
            <div className="col-50">
                <input type='number' name='stock' onChange={setHandler}/>
            </div>
            </div>
            <center><br/>
            <button className="bttn" onClick={createPostHandler}>Create</button> &nbsp;
            <button  className="myButton" onClick={cancelPostHandler}>Cancel</button>
            </center>
            </div>
        </center>: <div className={style}/>
        }
        </div>
    ) 
}
