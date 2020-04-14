import React from 'react'
import './Form.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
export default (props) => {
    const {isSignedIn,showLoginForm,firebaseAuth,uiConfig} = props
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