import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import FirebaseHandler from '../../ContextProvider/FirebaseHandler';

const CommonForm = () => {
   const history = useHistory();
   const location = useLocation();
   const from = location.state ? `${location.state.from.pathname}` : "/";
   // let { from } = location.state || { from: { pathname: "/" } };
   const redirect = () => {
      history.replace(from)
      // history.push(from)
   }
   const {signInWithGmail, signInWithFacebook} = FirebaseHandler()

   return (
      <div className='socialLogin'>
         <div className="socialBox">
            <div 
               onClick={() => signInWithGmail(redirect)}
               className='googleLogin'
            >
               <span>Continue With Google</span>
            </div>
         </div>
         <div className="socialBox">
            <div 
               onClick={() => signInWithFacebook(redirect)}
               className='facebookLogin'
            >
               <span>Continue With Facebook</span>
            </div>
         </div>
      </div>
   );
};

export default CommonForm;