import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from "axios";
import { useContextData } from './ContextProvider';
import { useHistory } from 'react-router-dom';
import { authenticate } from './SigninHelper';

const UserHandler = () => {
   const history = useHistory()
   const { setFormLoader, setSignupErrors, setLoggedInUser } = useContextData()
   const url = 'https://doctor-portal-backend-server.herokuapp.com'

   // patient sign up
   const patientSignUp = async (formData) => {
      setFormLoader(true)
      const { name, email, password, confirmPassword } = formData
      const result = await axios.post(url + '/patient/signup', {
         name,
         email,
         password,
         confirmPassword,
      })
      setFormLoader(false)
      if (result.data.success || result.data.error) {
         if (result.data.success) {
            toast.success(result.data.success)
         } else {
            toast.error(result.data.error)
         }
      } else {
         setSignupErrors(result.data)
      }
   }

   // doctor sign up
   const doctorSignUp = async (formData) => {
      console.log(formData)
      setFormLoader(true)
      const { name, email, gender, degree, specialist, password, confirmPassword } = formData
      const result = await axios.post(url + '/doctor/signup', {
         name,
         email,
         gender,
         degree,
         specialist,
         password,
         confirmPassword,
      })
      console.log(result)
      setFormLoader(false)
      if (result.data.success || result.data.error) {
         if (result.data.success) {
            toast.success(result.data.success)
         } else {
            toast.error(result.data.error)
         }
      } else {
         setSignupErrors(result.data)
      }
   }

   // user sign in
   const userSignIn = async (values, redirect) => {
      setFormLoader(true)
      const { email, password } = values
      const result = await axios.post(url + '/user/signin', {
         email,
         password
      })
      setFormLoader(false)
      if (result.data.success || result.data.error) {
         if (result.data.success) {
            const { signInToken, success } = result.data
            toast.success(success)
            authenticate(signInToken)
            const decodedToken = jwtDecode(signInToken)
            console.log(decodedToken)
            setLoggedInUser(decodedToken)
            if (decodedToken.picture === '') {
               history.push('/upload/profile/pic')
            } else {
               redirect()
            }
         } else {
            toast.error(result.data.error)
         }
      } else {
         setSignupErrors(result.data)
      }
   }

   return {
      userSignIn,
      doctorSignUp,
      patientSignUp
   };
};

export default UserHandler;