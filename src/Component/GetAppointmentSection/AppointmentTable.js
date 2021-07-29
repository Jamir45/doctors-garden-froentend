import React, { useState, useEffect } from 'react';
import appointmentTicketData from '../../Data/appointment'
import AppointmentCart from './AppointmentCart';
import Modal from 'react-modal';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core/';
import { useContextData } from '../ContextProvider/ContextProvider';
import AppointmentForm from './AppointmentForm';
import FormLoading from '../Loading/FormLoading';

Modal.setAppElement('#root')

const AppointmentTable = () => {
   const { date, allDoctors, formLoader } = useContextData()

   // Selected Appointment Ticked
   const [selectedAppointment, setSelectedAppointment] = useState(null);

   // Popup Modal Form for Booking Appointment 
   const [isBooked, setIsBooked] = useState(false);
   const [selectedDoctor, setSelectedDoctor] = useState(null)
   console.log(selectedDoctor)
   const [open, setOpen] = useState(false);
   const handleClose = () => {
      setOpen(false);
      setIsBooked(false);
      setSelectedDoctor(null)
   };

   const modalController = (selectedAppointmentId) => {
      setOpen(true);
      const appointment = appointmentTicketData.find(ap => ap.id === selectedAppointmentId);
      if (appointment) {
         setSelectedAppointment(appointment)
      }
   }

   const [specialistDoctor, setSpecialistDoctor] = useState(null)
   useEffect(() => {
      if (allDoctors && selectedAppointment) {
         const doctor = allDoctors.filter(data => data.specialist.toLowerCase() === selectedAppointment.subject.toLowerCase())
         setSpecialistDoctor(doctor)
      }
   }, [selectedAppointment])

   return (
      <div className="appointments container py-5">
         <h3>
            Available Appointments on {date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()}
         </h3>
         <div className="row">
            {
               appointmentTicketData.map(singleData => <AppointmentCart
                  appointment={singleData}
                  modalController={modalController}
               />
               )
            }
         </div>

         {/* To Get Modal Box on Click Book Appointment Button */}
         <div>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
               className="appointmentDialogBox"
            >
               <DialogContent className='addPrescriptionModal p-3 p-md-3'>
                  {
                     isBooked ?
                        <div className="prescriptionBox text-center p-5 mx-5">
                           <i className="fas fa-check-circle" style={{ fontSize: "5em", color: 'green' }}></i>
                           <h4 className="mt-5 lead">
                              Appointment Request Sent!
                           </h4>
                        </div>
                        :
                        selectedAppointment &&
                        <div className="prescriptionBox px-md-3 px-lg-3">
                           <h4 className="text-primary text-center">
                              {
                                 selectedDoctor ?
                                    selectedDoctor.username :
                                    `Chose an ${selectedAppointment.subject}`
                              }
                           </h4>
                           <p className="text-center text-secondary small mb-3">
                              {
                                 selectedDoctor ?
                                    selectedDoctor.specialist :
                                    `On ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`
                              }
                           </p>
                           {
                              selectedDoctor ?
                                 <AppointmentForm
                                    setIsBooked={setIsBooked}
                                    selectedDoctor={selectedDoctor._id}
                                    selectedAppointment={selectedAppointment}
                                 /> :
                                 <div className="doctorList">
                                    {
                                       specialistDoctor &&
                                       specialistDoctor.map(doctor => {
                                          const { _id, username, degree, specialist, profilePic } = doctor
                                          return <div className="doctor">
                                             <div className="imgDiv">
                                                <img className="img-fluid rounded-circle" src={profilePic} alt="" />
                                             </div>
                                             <div className="detailsDiv">
                                                <div>
                                                   <h6>{username}</h6>
                                                   <p>{degree}</p>
                                                   <p>{specialist}</p>
                                                </div>
                                                <Button
                                                   variant="contained"
                                                   onClick={() => setSelectedDoctor({
                                                      _id,
                                                      username,
                                                      specialist
                                                   })}
                                                >
                                                   Select
                                                </Button>
                                             </div>
                                          </div>
                                       })
                                    }
                                 </div>
                           }
                        </div>
                  }
               </DialogContent>
               <DialogActions>
                  {
                     isBooked ?
                        <Button
                           variant="outlined"
                           color="secondary"
                           onClick={handleClose}
                        >
                           Close
                        </Button> :
                        <Button
                           variant="outlined"
                           color="secondary"
                           onClick={handleClose}
                        >
                           Disagree
                        </Button>
                  }
               </DialogActions>
               {
                  formLoader && <FormLoading />
               }
            </Dialog>
         </div>
      </div>
   );
};

export default AppointmentTable;