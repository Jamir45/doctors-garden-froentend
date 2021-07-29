import { Fab, Paper } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import React, { useRef, useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';

const Profile = () => {
   const { loggedInUser, userAppointment } = useContextData();

   const inputRef = useRef()
   const triggerFileSelect = () => inputRef.current.click()
   const [image, setImage] = useState(null)
   console.log(image)

   const getFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
         const reader = new FileReader()
         reader.readAsDataURL(e.target.files[0])
         reader.addEventListener("load", () => {
            setImage(reader.result)
         })
      }
   }

   return (
      <div className='container row mx-auto'>
         <div className='col-md-6 mx-auto'>
            {
               loggedInUser &&
               <div className='profileDiv'>
                  <div className='profileImg'>
                     <img
                        className='img-fluid rounded-circle'
                        src={loggedInUser.picture} alt=""
                     />
                     <input
                        onChange={getFile}
                        type="file"
                        ref={inputRef}
                        style={{ display: 'none' }}
                     />
                     <Fab
                        size="small"
                        aria-label="edit"
                        className="editImgBtn"
                        onClick={(e) => triggerFileSelect(e)}
                     >
                        <EditIcon />
                     </Fab>
                  </div>
                  <div className='profileDetails'>
                     <h5> {loggedInUser.username || loggedInUser.name} </h5>
                     <p className='m-0'> {loggedInUser.email} </p>
                     <h6>List of your appointments</h6>
                  </div>
               </div>
            }
            <div className="appointmentList">
               {
                  userAppointment &&
                  userAppointment.map(apData => {
                     const { patientName, phone, email, gender, age, weight, appointmentStatus, appointment, prescription } = apData;
                     const { username, degree, specialist, profilePic } = apData.selectedDoctor
                     return <Paper elevation={1} className="appointment">
                        <p>Appointment of <span>{username}</span></p>
                        <div className="patient">
                           <div className="table table-borderless MobileTable">
                              <div className="DataContent bg-light py-3">
                                 <div>
                                    <b>Name :</b> {patientName}
                                 </div>
                                 <div>
                                    <b>Contact :</b> {phone}
                                 </div>
                              </div>
                              <div className="DataContent px-3">
                                 <b>Meet with :</b>
                                 {specialist}
                              </div>
                              <div className="DataContent px-3">
                                 <b >Visiting Time :</b>
                                 {appointment.visitingHour}
                              </div>
                              <div className="DataContent px-3">
                                 <b >Booking Date :</b>
                                 {appointment.bookingDate}
                              </div>
                              <div className="DataContent px-3">
                                 <b>Appointment Status :</b>
                                 {appointmentStatus}
                              </div>
                              <div className="DataContent px-3">
                                 <b>Prescription :</b>
                                 <button
                                    className="btn btn-success editBtn px-3"
                                    disabled={appointmentStatus !== "Approved" && true}
                                 >
                                    View
                                 </button>
                              </div>
                           </div>
                        </div>
                     </Paper>
                  })
               }
            </div>
         </div>
      </div>
   );
};

export default Profile;