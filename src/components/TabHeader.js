import React from 'react'
import '../App.css';
import {firebaseAuth} from '../App';
export default (props) => {
    const {isSignedIn,search,showCancelButton,signInClick,cancelClick,signOutClick,customClick,showBillsClick} = props 
    return(
        <div className="nav">
        <div className="head">
          MeenShop
          &nbsp;&nbsp;
          <input type='text' placeholder='search' onChange={search} style={{width:200}}/>
        </div>
        <div className="tab">

          {isSignedIn ?
            <div>
              <ul className="ulProfile">
                <li className="liProfile">
                    Welcome {firebaseAuth.currentUser.displayName}
                </li>
                <li className="liProfile">
                  <img
                alt="profile"
                src={firebaseAuth.currentUser.photoURL}
                width='30'
                height='30'
                className="imgProfile"
              />
              </li>
              
            &nbsp;
            <li className="li">
            <button className="mButton" onClick={signOutClick}>Sign out!</button>&nbsp;
            </li>
            <li className="li">
            <button className="mButton" onClick={customClick}>Custom</button>&nbsp;
            </li>
            <li className="li">
            <button className="mButton" onClick={showBillsClick}>Show Bills</button>
            </li>
            </ul>
            </div> :
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