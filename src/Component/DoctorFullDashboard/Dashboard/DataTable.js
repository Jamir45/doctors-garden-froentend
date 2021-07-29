import React from 'react';
import { useContextData } from '../../ContextProvider/ContextProvider';
import Preloader from '../../Preloader/Preloader';
import EditIcon from '@material-ui/icons/Edit';

const DataTable = (props) => {
   const {userAppointment, setStatus, setPatientId} = useContextData()
   let slNo = 1;

   return (
      <div className="mt-3 bg-white rounded shadow-sm p-3 d-none d-md-block d-lg-block">
         <table className="table table-borderless">
            <thead>
               <tr className="text-center">
                  <th className="text-secondary text-left" scope="col">SL No</th>
                  <th className="text-secondary text-left" scope="col">Name</th>
                  <th className="text-secondary text-left" scope="col">Contact</th>
                  <th className="text-secondary text-left" scope="col">Booking Date</th>
                  <th className="text-secondary text-left" scope="col">Visiting Time</th>
                  <th className="text-secondary" scope="col">Prescription</th>
                  <th className={props.conditional === false ? "d-none" : "text-secondary"} scope="col">Action</th>
               </tr>
            </thead>
            <tbody>
               {
                  userAppointment && userAppointment.map(ap => {
                     return (
                        <tr>
                          <td className="text-center">{slNo++}</td>
                          <td className="text-center">{ap.patientName}</td>
                          <td className="text-center">{ap.phone}</td>
                          <td className="text-center">{ap.appointment.bookingDate}</td>
                          <td className="text-center">{ap.appointment.visitingHour}</td>
   
                          <td className="text-center">
                              {/* Prescription */}
                              {   
                                 ap.prescription.length === 0 ?
                                 <span>
                                    <span>Not Added</span> 
                                    <i onClick={()=> props.openPrescriptionModal(ap._id)} style={{cursor:"pointer"}} className="fas fa-plus-circle"></i>
                                 </span>
                                 :
                                 <button onClick={()=> props.openPrescriptionModal(ap._id)} className="btn btn-primary">View</button>
                           }
                           </td>
                           <td className={props.conditional === false ? "d-none" : "text-center"}>
                              <select onChange={(e) => {
                                 setStatus(e.target.value)
                                 setPatientId(ap._id)
                                 }} className={ap.appointmentStatus === "Rejected" ? "btn btn-danger" : ap.appointmentStatus === "Approved" ? "btn btn-success" : "btn btn-info" }>
                                 <option selected={ap.appointmentStatus === "Pending"} className="bg-white text-secondary">Pending</option>
                                 <option selected={ap.appointmentStatus === "Approved"}className="bg-white text-secondary">Approved</option>
                                 <option selected={ap.appointmentStatus === "Rejected"}className="bg-white text-secondary">Rejected</option>
                              </select>
                              <button onClick={()=> props.openDataEditModal(ap._id)} className="btn btn-warning editBtn">
                                 <EditIcon />
                              </button>
                           </td>
                        </tr>
                     )
                  })
               }
            </tbody>
         </table>
         {
            !userAppointment && <Preloader></Preloader>
         }
      </div>
   );
};

export default DataTable;