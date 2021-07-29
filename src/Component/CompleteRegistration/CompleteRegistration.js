import { Button, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import FirebaseHandler from '../ContextProvider/FirebaseHandler';
import { toast } from 'react-toastify';

const CompleteRegistration = ({ setHeader }) => {
   useEffect(() => {
      setHeader(false)
   }, [])

   const { toastMessage } = useContextData()
   const { signUpWithEmailAndPassword } = FirebaseHandler()

   const registrationComplete = () => {
      const userData = JSON.parse(localStorage.getItem('userForSignUp'))
      console.log(userData)
      if (userData) {
         signUpWithEmailAndPassword(userData)
         if (userData.doctorRegistration) {

         } else {
         }
      } else {
         toast.error('You have open this link at the same browser')
      }
   }

   return (
      <div className="container accountActivationPage">
         {toastMessage()}
         <div className="accountActiveDiv">
            {/* {
               formLoader && <FormLoading />
            } */}
            <Paper className='accountActive' elevation={3}>
               <h4>Your Email Verification Successful</h4>
               <h5>Now Click Below Button To Complete Your Registration Process</h5>
               <Button
                  className='activeBtn'
                  variant="contained"
                  onClick={() => registrationComplete()}
               >
                  Activate Account
               </Button>
            </Paper>
         </div>
      </div>
   );
};

export default CompleteRegistration;