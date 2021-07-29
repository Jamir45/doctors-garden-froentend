import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { authenticate, userSignOut } from './SigninHelper';
import { useContextData } from './ContextProvider';
import { useHistory } from 'react-router-dom';
if (firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig);
}

const FirebaseHandler = () => {
   const url = 'https://doctor-portal-backend-server.herokuapp.com';
   const history = useHistory()
   const { setLoggedInUser } = useContextData()

   // Save Logged in use token
   const userToken = async () => {
      try {
         const idToken = await firebase.auth().currentUser.getIdToken(true)
         authenticate(idToken)
         setLoggedInUser(jwtDecode(idToken))
      } catch (error) {
         const errorMessage = error.message;
         toast.error(errorMessage)
      }
   }

   // Sign In With Gmail
   const signInWithGmail = async () => {
      try {
         const provider = new firebase.auth.GoogleAuthProvider();
         await firebase.auth().signInWithPopup(provider)
         userToken()
         history.push('/')
      } catch (error) {
         toast.error(error.message)
      }
      // try {
      //    const provider = new firebase.auth.GoogleAuthProvider();
      //    await firebase.auth().signInWithPopup(provider)
      //    const idToken = await firebase.auth().currentUser.getIdToken(true)
      //    toast.success('Sign In Successful, Please Wait For Redirect')
      //    if (idToken) {
      //       const signedUser = await axios.post(`${url}/google/facebook/signin`, {}, {
      //          headers: {authorization: idToken}
      //       })
      //       if (signedUser.data.success) {
      //          const {success, signInToken} = signedUser.data
      //          authenticate(signInToken)
      //          const decodedToken = jwtDecode(signInToken)
      //          setLoggedInUser(decodedToken)
      //          if (decodedToken.picture === '') {
      //             history.push('/upload/profile/pic')
      //          } else {
      //             redirect()
      //          }
      //       } else {
      //          toast.error(signedUser.data.error)
      //       }
      //    }
      // } catch (error) {
      //    const errorMessage = error.message;
      //    toast.error(errorMessage)
      // }
   }

   // Sign In With Facebook
   const signInWithFacebook = async () => {
      try {
         const fbProvider = new firebase.auth.FacebookAuthProvider();
         await firebase.auth().signInWithPopup(fbProvider)
         userToken()
         history.push('/')
      } catch (error) {
         toast.error(error.message)
      }
      // try {
      //    const fbProvider = new firebase.auth.FacebookAuthProvider();
      //    await firebase.auth().signInWithPopup(fbProvider)
      //    const idToken = await firebase.auth().currentUser.getIdToken(true)
      //    toast.success('Sign In Successful, Please Wait For Redirect')
      //    if (idToken) {
      //       const signedUser = await axios.post(`${url}/google/facebook/signin`, {}, {
      //          headers: {authorization: idToken}
      //       })
      //       if (signedUser.data.success) {
      //          const {success, signInToken} = signedUser.data
      //          authenticate(signInToken)
      //          const decodedToken = jwtDecode(signInToken)
      //          setLoggedInUser(decodedToken)
      //          if (decodedToken.picture === '') {
      //             history.push('/upload/profile/pic')
      //          } else {
      //             redirect()
      //          }
      //       } else {
      //          toast.error(signedUser.data.error)
      //       }
      //    }
      // } catch (error) {
      //    const errorMessage = error.message;
      //    toast.error(errorMessage)
      // }
   }

   // Email verification after submit Sign-up Form 
   const emailVerification = async (formData) => {
      try {
         const { username, email, password } = formData
         const token = await jwt.sign({
            username,
            email,
            password
         }, 'qwertyuiop', { expiresIn: "5m" });
         console.log(token)

         // const config = {
         //    url: `http://localhost:3000/complete-registration/${token}`,
         //    handleCodeInApp: true,
         // };
         // await firebase.auth().sendSignInLinkToEmail(email, config)
         // toast.success(`We are sent an email to ${email}. Please Check Your mail and Complete the registration Process`)
      } catch (error) {
         const errorMessage = error.message;
         toast.error(errorMessage)
      }
   }

   // Sign Up With Email and Password
   const signUpWithEmailAndPassword = async (formData) => {
      const { email, password } = formData
      try {
         await firebase.auth().createUserWithEmailAndPassword(email, password)
         toast.success('Sign Up Successful.')
         addUerName(formData)
         history.push('/login')
      } catch (error) {
         var errorMessage = error.message;
         toast.error(errorMessage)
      }
   }

   const addUerName = (formData) => {
      const { userName } = formData
      if (formData.doctorRegistration) {
         const doctorName = 'doctorName ' + userName
         const user = firebase.auth().currentUser;
         user.updateProfile({
            displayName: doctorName,
            address: 'doctorRegistration'
         })
            .then(result => {
               console.log(result)
            })
            .catch(error => {
               const errorMessage = error.message;
               toast.error(errorMessage)
            });
      } else {
         const user = firebase.auth().currentUser;
         user.updateProfile({
            displayName: userName,
         })
            .then(result => {
               console.log(result)
            })
            .catch(error => {
               const errorMessage = error.message;
               toast.error(errorMessage)
            });
      }
   }


   // User Sign Out
   const signOut = async () => {
      try {
         await firebase.auth().signOut()
         setLoggedInUser(null)
         toast.success('Sign Out Successful.')
         userSignOut()
         history.push('/')
      } catch (error) {
         const errorMessage = error.message;
         toast.error(errorMessage)
      }
   }


   return {
      signOut,
      signInWithGmail,
      signInWithFacebook,
      emailVerification,
      signUpWithEmailAndPassword,
   };
};

export default FirebaseHandler;