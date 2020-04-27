import React from 'react'
import '../App.css';
import {firebaseAuth} from '../App';
import { useSelector, useDispatch } from 'react-redux';
export default (props) => {
    const dispatch = useDispatch();
    const showCancelButton = useSelector(state => state.showStatus.showLoginForm)
    const {isSignedIn,signOutClick} = props 
    return(
        <div className="nav">
        <div className="head">
          MeenShop
          &nbsp;&nbsp;
          <input type='text' placeholder='search' onChange={(e) => dispatch({type: 'SEARCH_CHANGE', search: e.target.value})} style={{width:200}}/>
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
            <button className="mButton" 
                onClick={() => {dispatch({type:'SHOWFORM'})
                dispatch({type:'NOT_SHOWBUYFORM'})}}>Custom</button>&nbsp;
            </li>
            <li className="li">
            <button className="mButton" onClick={() => {dispatch({type:'TOGGLE_SHOWBILLS'})}}>Show Bills</button>
            </li>
            </ul>
            </div> :
                <div>
            <button className="mButton" onClick={() => {
                  dispatch({type:'SHOWLOGINFORM'})
                  dispatch({type:'NOT_SHOWBUYFORM'})
            }}>Sign in!</button>
            &nbsp;{
            showCancelButton?
            <button className="mButton" onClick={()=>dispatch({type:'NOT_SHOWLOGINFORM'})}>cancel</button>:null
            }
                </div>

          }
        </div>
      </div>
    )
}