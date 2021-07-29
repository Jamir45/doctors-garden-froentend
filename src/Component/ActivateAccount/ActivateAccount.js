import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Paper } from '@material-ui/core';
import { useContextData } from '../ContextProvider/ContextProvider';
import axios from "axios"
import { toast } from 'react-toastify';
import FormLoading from '../Loading/FormLoading';

const ActivateAccount = ({ setHeader }) => {
   useEffect(() => {
      setHeader(false)
   }, [])

   const { formLoader, setFormLoader, toastMessage } = useContextData()
   const { userToken } = useParams()
   const history = useHistory()
   const url = 'https://doctor-portal-backend-server.herokuapp.com'

   const activateHandler = async () => {
      setFormLoader(true)
      const result = await axios.post(url + '/account/activation', { token: userToken })
      console.log(result.data)
      if (result.data.success) {
         toast.success(result.data.success)
         setTimeout(() => {
            history.push('/login')
            setHeader(true)
         }, 1000)
         setFormLoader(false)
         // window.location.pathname('/login')
      } else {
         toast.error(result.data.error)
         setFormLoader(false)
      }
   }

   return (
      <div className="container accountActivationPage">
         {toastMessage()}
         <div className="accountActiveDiv">
            {
               formLoader && <FormLoading />
            }
            <Paper className='accountActive' elevation={3}>
               <h4>Please Click Activate Button To Activate Your Account</h4>
               <Button
                  className='activeBtn'
                  type="submit"
                  variant="contained"
                  onClick={activateHandler}
               >
                  Activate Account
               </Button>
            </Paper>
         </div>
      </div>
   );
};

export default ActivateAccount;