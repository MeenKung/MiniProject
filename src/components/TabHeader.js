import React from 'react'
import '../App.css';
export default (props) => {
    const {isSignedIn,search,showCancelButton,signInClick,cancelClick,signOutClick,customClick,showBillsClick,firebaseAuth} = props 
    return(
        <div className="nav">
        <div className="head">
          MeenShop
          <input type='text' placeholder='search' onChange={search} style={{width:50}}/>
        </div>
        
        <div className="tab">

          {isSignedIn ?
            <span>
              Welcome {firebaseAuth.currentUser.displayName}
              <img
                alt="profile"
                src={firebaseAuth.currentUser.photoURL}
                width='30'
              />
            &nbsp;
            <button className="mButton" onClick={signOutClick}>Sign out!</button>&nbsp;
            <button className="mButton" onClick={customClick}>Custom</button>&nbsp;
            <button className="mButton" onClick={showBillsClick}>Show Bills</button>
            </span> :
                <div>
            <button className="mButton" onClick={signInClick}>Sign in!</button>
            &nbsp;{
            showCancelButton?
            <button className="mButton" onClick={cancelClick}>cancel</button>:null
            }
            
                </div>

          }
        </div>
      </div>
    )
}