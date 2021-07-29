import React from 'react';
import loginPNG from '../../images/login.png'
import LoginForm from './LoginForm';
import { Paper } from '@material-ui/core';
import CommonForm from './CommonForm/CommonForm';
import { useEffect } from 'react';
import FormLoading from '../Loading/FormLoading';
import { useContextData } from '../ContextProvider/ContextProvider';

const Login = ({setHeader}) => {
   const {toastMessage, formLoader} = useContextData()
   useEffect(() => {
      setHeader(true);
   }, [])

   return (
      <div className="container">
         <div className="row loginPage">
            {toastMessage()}
            <div className="col-md-6">
               <div className='loginFormDiv'>
                  <Paper className='loginPaper' elevation={3}>
                     <div className="text-center">
                        <h5 className='Title'>
                           Doctor's Registration Form
                        </h5>
                     </div>
                     <LoginForm />
                     <div className='row orOptionDiv'>
                        <span className='orOption col-5'></span>
                        <span className='col-2 text-center'>OR</span>
                        <span className='orOption col-5'></span>
                     </div>
                     <CommonForm />
                  </Paper>
                  {
                     formLoader && <FormLoading />
                  }
               </div>
            </div>
            <div className="col-md-6">
               <img className='img-fluid' src={loginPNG} alt=""/>
            </div>
         </div>
      </div>
   );
};

export default Login;