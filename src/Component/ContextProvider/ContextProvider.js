import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getCookie, isAuthenticated, userSignOut } from './SigninHelper';


// Create Context
const DataContext = createContext()
export const useContextData = () => useContext(DataContext)

// Create Context Provider and
export const ContextDataProvider = (props) => {
   const contexts = ContextProvider()
   return <DataContext.Provider value={contexts}>
      {props.children}
   </DataContext.Provider>
}

const ContextProvider = () => {
   const url = "https://doctor-portal-backend-server.herokuapp.com"
   const [date, setDate] = useState(new Date())
   const [selectedPatient, setSelectedPatient] = useState(null);
   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [formLoader, setFormLoader] = useState(false);
   const [editModalIsOpen, setEditModalIsOpen] = useState(false);
   const [signupErrors, setSignupErrors] = useState(null);


   // Manage Signed User 
   const [loggedInUser, setLoggedInUser] = useState(null);
   console.log(loggedInUser)
   const userToken = isAuthenticated()
   useEffect(() => {
      const loggedUser = userToken && jwtDecode(userToken)
      setLoggedInUser(loggedUser)
   }, [])

   const signOut = (history) => {
      userSignOut()
      setLoggedInUser(null)
      history.push('/')
   }

   // Get All doctors data
   const token = getCookie('doctorGardenToken')
   const [allDoctors, setAllDoctors] = useState(null);
   useEffect(() => {
      axios.get(url + '/get/all/doctors')
         .then(result => {
            setAllDoctors(result.data)
         })
   }, [])

   // Get Patient appointed data
   const [userAppointment, setUserAppointment] = useState(null)
   useEffect(() => {
      if (loggedInUser) {
         const actionType = loggedInUser.role === 'doctor' ? 'doctor' : 'patient'
         axios.get(`${url}/get/${actionType}/appointment`, {
            headers: { authorization: token }
         })
            .then(result => {
               setUserAppointment(result.data)
            })
      }
   }, [loggedInUser])

   // Update Patient Status
   const [status, setStatus] = useState(null)
   const [patientId, setPatientId] = useState(null)
   useEffect(() => {
      if (status) {
         axios.put(url + '/add-status', { status, patientId }, {
            headers: { authorization: token }
         })
            .then(result => {
               console.log(result)
               if (!result.data.error) {
                  const newData = userAppointment.map(ap => {
                     if (ap._id === result.data._id) {
                        return result.data
                     } else {
                        return ap
                     }
                  })
                  setUserAppointment(newData)
               } else {
                  toast.error(result.data.error)
               }
            })
      }
   }, [status])


   // Show Toast Message in Our Component
   const toastMessage = () => {
      return <ToastContainer
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
      />
   }


   return {
      date,
      setDate,
      signOut,
      status,
      setStatus,
      setPatientId,
      loggedInUser,
      allDoctors,
      setLoggedInUser,
      selectedPatient,
      setSelectedPatient,
      userAppointment,
      setUserAppointment,
      toastMessage,
      modalIsOpen,
      formLoader,
      signupErrors,
      setSignupErrors,
      setFormLoader,
      setModalIsOpen,
      editModalIsOpen,
      setEditModalIsOpen,
   }
};

export default ContextProvider;