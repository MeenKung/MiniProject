import React from 'react'
import './Form.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebaseAuth} from '../../App'
export default (props) => {
    const {isSignedIn,showLoginForm,uiConfig} = props
    return(
       <div>
           {
               showLoginForm&&!isSignedIn? 
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