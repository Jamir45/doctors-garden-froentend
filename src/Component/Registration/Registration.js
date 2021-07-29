import { Paper } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import loginPNG from '../../images/login.png'
import { useContextData } from '../ContextProvider/ContextProvider';
import FormLoading from '../Loading/FormLoading';
import CommonForm from '../Login/CommonForm/CommonForm';
import DoctorRegistrationForm from './DoctorForm';
import PatientRegistrationForm from './PatientForm';

const Registration = () => {
   const {userType} = useParams()
   console.log(userType)
   const {toastMessage, formLoader} = useContextData()

   return (
      <div className="container">
         <div className="row RegistrationPage">
            {toastMessage()}
            <div className="col-md-6">
               <div className='RegistrationFormDiv'>
                  <Paper className='RegistrationPaper' elevation={3}>
                     <div className="text-center">
                        <h5 className='Title'>
                           {
                              userType === 'doctor' ? 
                              "Doctor's Registration Form" :
                              "Patient's Registration Form"
                           }
                        </h5>
                     </div>
                     {userType === 'doctor' && <DoctorRegistrationForm />}
                     {userType === 'patient' && <PatientRegistrationForm />}
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

export default Registration;