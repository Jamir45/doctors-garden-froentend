import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, LinearProgress, MenuItem, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStyles from './RegistrationFormStyle'
import { useForm } from 'react-hook-form';
import FirebaseHandler from '../ContextProvider/FirebaseHandler';
import UserHandler from '../ContextProvider/UserHandler';

const DoctorRegistrationForm = (props) => {

   const [values, setValues] = useState({
      name: '',
      email: '',
      gender: '',
      degree: '',
      specialist: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
   });

   const [password, setPassword] = useState(null)
   const { handleSubmit } = useForm();
   const { doctorSignUp } = UserHandler()
   const onSubmit = () => {
      if (values) {
         doctorSignUp(values)
      }
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
   const doctorSpecialist = ['Dental Specialist', 'Eye Specialist', 'Heart Specialist', 'Medicine Specialist', 'Child Specialist', 'Neurology Specialist']

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
            <TextField
               className='form-control my-3'
               id="standard-basic"
               label="Full Name"
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

         <FormControl className={classes.formControl}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
               aria-label="Gender"
               name="gender"
               required
               value={values.gender}
               onChange={handleChange('gender')}
            >
               <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
               />
               <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
               />
               <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
               />
            </RadioGroup>
         </FormControl>

         <div>
            <TextField
               className='form-control my-3'
               id="standard-basic"
               label="Education Degree"
               required
               value={values.degree}
               onChange={handleChange('degree')}
            />
         </div>

         <div>
            <TextField
               select
               label="Specialist"
               className='form-control my-3'
               value={values.specialist}
               onChange={handleChange('specialist')}
            >
               {doctorSpecialist.map((option) => (
                  <MenuItem className='py-3' key={option} value={option}>
                     {option}
                  </MenuItem >
               ))}
            </TextField>
         </div>

         <FormControl className={classes.textField + ' passwordField'} variant="filled">
            <InputLabel
               className='passwordLabel'
               htmlFor="password"
            >
               Password
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
               Confirm Password
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
               <Link to='/login'><span>Sign In</span></Link>
            </p>
         </div>
      </form>
   );
};

export default DoctorRegistrationForm;