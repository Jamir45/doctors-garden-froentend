import React from 'react';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './LoginFormStyle.js'
import { useForm } from 'react-hook-form';
import RegisterBtn from '../Header/RegisterBtn.js';
import UserHandler from '../ContextProvider/UserHandler.js';

const LoginForm = (props) => {
   const classes = useStyles();
   const history = useHistory();
   const location = useLocation();
   // const from = location.state ? `${location.state.from.pathname}` : "/";
   let { from } = location.state || { from: { pathname: "/" } };
   const redirect = () => {
      history.replace(from)
      // history.push(from)
   }

   const [values, setValues] = React.useState({
      email: '',
      password: '',
   });

   const { userSignIn } = UserHandler()
   const { handleSubmit } = useForm();
   const onSubmit = () => {
      userSignIn(values, redirect)
   };

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
               Password
            </InputLabel>
            <Input
               id="password"
               type={values.showPassword ? 'text' : 'password'}
               value={values.password}
               required
               onChange={handleChange('password')}
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
         <div className="d-flex justify-content-between">
            <FormControlLabel
               value="Remember Me"
               control={<Checkbox color="primary" />}
               label="Remember Me"
               labelPlacement="Remember Me"
            />
            <span>
               <Link to="/password/reset">Forgot Password.?</Link>
            </span>
         </div>
         <Button
            type="submit"
            variant="contained"
            className='singUpOrSignIn mt-3'
         // onClick={() => setFormLoader(true)}
         >
            Submit
         </Button>

         <div className='massage'>
            <p>Don't have an account? <RegisterBtn /></p>
         </div>
      </form>
   );
};

export default LoginForm;