import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { useForm } from 'react-hook-form';

const PrescriptionEditModal = (props) => {
   const {
      selectedPatient, 
      editModalIsOpen, 
      setEditModalIsOpen
  } = props
   // To get data from prescription modal and send on database
   const { register, handleSubmit, errors } = useForm()
   const onSubmit = data => {  
      // // Storing Data to Database
      // fetch("https://doctors-portal-backend.herokuapp.com/updateAppointmentTime",{
      //     method : "POST",
      //     headers : {
      //         "Content-type" : "application/json"
      //     },
      //     body: JSON.stringify(data)
      // })
      // .then(res => res.json())
      // .then(data => console.log(data))
      // setEditModalIsOpen(false)
   }

   const handleClose = () => {
      setEditModalIsOpen(false);
   };

   return (
      <div>
         <Dialog
          open={editModalIsOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
         >
            <DialogContent className="px-5 py-3">
               <DialogContentText id="alert-dialog-description">
               {
                  selectedPatient &&
                  <form 
                     className="px-3 px-md-5 px-lg-5 my-3" 
                     onSubmit={handleSubmit(onSubmit)}
                  >
                     <h5 className="text-primary text-center mb-5">{selectedPatient.name}'s Appointment</h5>
                     <div className="form-group row">
                        <label className="col-4">
                           Date
                        </label>
                        <input 
                           name="date" 
                           type="text" 
                           defaultValue={selectedPatient.bookingDate} 
                           ref={register({ required: true })} 
                           className="form-control col-8"
                        />
                        <div className="col-12">
                           {
                              errors.date && 
                              <span className="text-danger">
                                 Appointment date must not empty ! <br/>
                              </span>
                           }
                        </div>
                     </div>
                     <div className="form-group row">
                        <label className="col-4">
                           Time
                        </label>
                        <input 
                           type="text" 
                           name="time" 
                           defaultValue={selectedPatient.time} 
                           ref={register({ required: true })} 
                           className="form-control col-8"
                        />
                        <div className="col-12">
                           {
                              errors.time && 
                              <span className="text-danger">
                                 Appointment time must not empty ! <br/>
                              </span>
                           }
                        </div>
                     </div>
                     <div className="form-group text-right">
                        <input 
                           type="hidden"  
                           name="id"
                           value={selectedPatient._id} 
                           ref={register({ required: true })} 
                        />
                        <button 
                           type="submit" 
                           className="btn btn-primary"
                        >
                           Update
                        </button>
                     </div>
                  </form>
               }
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button 
               variant="outlined" 
               color="secondary" 
               onClick={handleClose}
               >
               Close
               </Button>
            </DialogActions>
        </Dialog>
      </div>
   );
};

export default PrescriptionEditModal;