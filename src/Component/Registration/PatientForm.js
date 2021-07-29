import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, LinearProgress, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './RegistrationFormStyle'
import { useForm } from 'react-hook-form';
import CommonForm from '../Login/CommonForm/CommonForm';
import FirebaseHandler from '../ContextProvider/FirebaseHandler';
import UserHandler from '../ContextProvider/UserHandler';
import { useContextData } from '../ContextProvider/ContextProvider';

const PatientRegistrationForm = (props) => {
   const { patientSignUp } = UserHandler()
   const { setFormLoader } = useContextData()

   const [values, setValues] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false
   });

   const [password, setPassword] = useState(null)
   const { handleSubmit } = useForm();
   const onSubmit = (data) => {
      patientSignUp(values)
   };

   const classes = useStyles();
   const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
   };
   const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
   };
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div>
               <TextField
                  className='form-control my-3'
                  id="standard-basic"
                  label="User Name"
                  required
                  value={values.name}
                  onChange={handleChange('name')}
               />
            </div>

            <div>
               <TextField
                  className='form-control my-3'
                  id="standard-basic"
                  label="Email"
                  required
                  value={values.email}
                  onChange={handleChange('email')}
               />
            </div>

            <FormControl className={classes.textField + ' passwordField'} variant="filled">
               <InputLabel
                  className='passwordLabel'
                  htmlFor="password"
               >
                  Password*
               </InputLabel>
               <Input
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  required
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={() => setPassword(values.password)}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                     </InputAdornment>
                  }
               />
            </FormControl>

            <FormControl className={classes.textField + ' passwordField'} variant="filled">
               <InputLabel
                  className='passwordLabel'
                  htmlFor="confirmPassword"
               >
                  Confirm Password*
               </InputLabel>
               <Input
                  id="confirmPassword"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  required
                  onChange={handleChange('confirmPassword')}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                        >
                           {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                     </InputAdornment>
                  }
               />
               {
                  password && values.confirmPassword !== '' ?
                     password !== values.confirmPassword &&
                     <span className='Error'> Confirm Password Is Not Match </span>
                     : ''
               }
            </FormControl>
            <Button
               type="submit"
               variant="contained"
               className='singUpOrSignIn mt-3'
            >
               Submit
            </Button>

            <div className='massage'>
               <p>
                  Already have an account?
                  <Link to='/login'><span>Login</span></Link>
               </p>
            </div>
         </form>
         <div className='row orOptionDiv'>
            <span className='orOption col-5'></span>
            <span className='col-2 text-center'>OR</span>
            <span className='orOption col-5'></span>
         </div>
         <CommonForm />
      </>
   );
};

export default PatientRegistrationForm;