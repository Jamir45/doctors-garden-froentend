import React from 'react';
import { useContextData } from '../../ContextProvider/ContextProvider';
import Preloader from '../../Preloader/Preloader';
import EditIcon from '@material-ui/icons/Edit';

const MobileDataTable = (props) => {
   const {setStatus, setPatientId, userAppointment} = useContextData()
   const statusHandler = (e, ap) => {
      setStatus(e.target.value)
      setPatientId(ap._id)
   }
   let slNo = 1;

   return (
      <div className="mt-3 bg-white rounded shadow-sm p-3 d-block d-md-none d-lg-none">
         {
            userAppointment && userAppointment.map(ap => {
               return (
               <div className="table table-borderless MobileTable">
                  <div className="DataContent bg-light py-3">
                     <div>
                        <b>SLNo:</b> {slNo++} 
                     </div>
                     <div>
                        <b>Name:</b> {ap.patientName} 
                     </div>
                  </div>
                  <div className="DataContent">
                     <b >Contact :</b> 
                     {ap.phone}
                  </div>
                  <div className="DataContent">
                     <b >Visiting Time :</b> 
                     {ap.appointment.visitingHour}
                  </div>
                  <div className="DataContent">
                     <b >Booking Date :</b> 
                     {ap.appointment.bookingDate}
                  </div>
                  <div className="DataContent">
                     <b >Prescription :</b>
                     <div>
                        {   
                           ap.prescription.length === 0 ?
                           <span>
                              <span>Not Added</span> 
                              <i onClick={()=> props.openPrescriptionModal(ap._id)} style={{cursor:"pointer"}} className="fas fa-plus-circle"></i>
                           </span>
                           :
                           <button onClick={()=> props.openPrescriptionModal(ap._id)} className="btn bg-primary text-white">View</button>
                        }
                        <button 
                           onClick={()=> props.openDataEditModal(ap._id)} 
                           className="btn btn-warning editBtn"
                        >
                           <EditIcon />
                        </button>
                     </div>
                  </div>
                  <div className={props.conditional === false ? "d-none" : "DataContent"}>
                     <b >Action :</b>
                     <select 
                        onChange={(e) => statusHandler(e, ap)} 
                        className={
                           ap.status === "Rejected" ? "btn btn-danger" : 
                           ap.status === "Approved" ? "btn btn-success" : 
                           "btn btn-info"
                        }
                     >
                        <option 
                           selected={ap.status === "Pending"} className="bg-white text-secondary"
                        >
                           Pending
                        </option>
                        <option 
                           selected={ap.status === "Approved"}
                           className="bg-white text-secondary"
                        >
                           Approved
                        </option>
                        <option 
                           selected={ap.status === "Rejected"}
                           className="bg-white text-secondary"
                        >
                           Rejected
                        </option>
                     </select>
                  </div>
               </div>
               )
            })
         }
         {
            !userAppointment && <Preloader></Preloader>
         }
      </div>
   );
};

export default MobileDataTable;