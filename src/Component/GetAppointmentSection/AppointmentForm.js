import React from 'react';
import { useForm } from 'react-hook-form';
import PatientHandler from '../ContextProvider/PatientHandler';

const AppointmentForm = (props) => {
   const { setIsBooked, selectedAppointment, selectedDoctor } = props
   const { makeAppointment } = PatientHandler()

   // Form Submit Handler
   const { register, handleSubmit, errors } = useForm();
   const onSubmit = data => {
      if (data) {
         makeAppointment(data, selectedAppointment, selectedDoctor, setIsBooked)
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="form-group">
            <input
               type="text"
               name="patientName"
               ref={register({ required: true })}
               placeholder="Enter Patient Name"
               className="form-control"
            />
            {
               errors.name &&
               <span className="text-danger">
                  This field is required
               </span>
            }
         </div>
         <div className="form-group">
            <input
               type="text"
               name="phone"
               ref={register({ required: true })}
               placeholder="Phone Number"
               className="form-control"
            />
            {
               errors.phone &&
               <span className="text-danger">
                  This field is required
               </span>
            }
         </div>
         <div className="form-group">
            <input
               type="text"
               name="email"
               ref={register({ required: true })}
               placeholder="Email"
               className="form-control"
            />
            {
               errors.email &&
               <span className="text-danger">
                  This field is required
               </span>
            }
         </div>
         <div className="form-group row">
            <div className="col-4">
               <select
                  name="gender"
                  className="form-control"
                  ref={register({ required: true })}
               >
                  <option disabled={true} value="Selecte Gender">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Not set">Other</option>
               </select>
               {
                  errors.gender &&
                  <span className="text-danger">
                     This field is required
                  </span>
               }
            </div>
            <div className="col-4">
               <input
                  name="age"
                  type="number"
                  ref={register({ required: true })}
                  placeholder="Your Age"
                  className="form-control"
               />
               {
                  errors.age &&
                  <span className="text-danger">
                     This field is required
                  </span>
               }
            </div>
            <div className="col-4">
               <input
                  ref={register({ required: true })}
                  className="form-control"
                  name="weight"
                  placeholder="Weight"
                  type="number"
               />
               {
                  errors.weight &&
                  <span className="text-danger">
                     This field is required
                  </span>
               }
            </div>
         </div>
         <div className="form-group text-center mb-0 pb-0">
            <button
               type="submit"
               className="btn btn-primary"
            >Send</button>
         </div>
      </form>
   );
};

export default AppointmentForm;