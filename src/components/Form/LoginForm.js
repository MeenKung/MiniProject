import React from 'react'
import './Form.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebaseAuth} from '../../App'
import { useSelector} from 'react-redux';
export default (props) => {
    const showStatus = useSelector(state => state.showStatus)
    const {isSignedIn,uiConfig} = props
    return(
       <div>
           {
               showStatus.showLoginForm&&!isSignedIn? 
               <center>
                <div className="formShowLogin">
                   <StyledFirebaseAuth
               uiConfig={uiConfig}
               firebaseAuth={firebaseAuth}/>
               </div>
               </center>
               :null
           }
       </div>
    )
}