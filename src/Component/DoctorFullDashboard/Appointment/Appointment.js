import React from 'react';
import { useContextData } from '../../ContextProvider/ContextProvider';
import ReactCalender from '../../GetAppointmentSection/ReactCalender';
import Preloader from '../../Preloader/Preloader';
import Sidebar from '../Sidebar/Sidebar';

const Appointment = () => {
   const {date, userAppointment} = useContextData()
   const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
   const appointedData = userAppointment && userAppointment.filter( data => data.appointment.bookingDate === formatedDate)

   return (
      <div className="DashboardPage row">
         <Sidebar />
         <div className="col-md-10 col-lg-10" >
         <h4 className="py-3">Appointed Patient</h4>
         <div className='DashboardDetails row'>
            <div className="col-md-6 pb-5">
               <ReactCalender />
            </div>
            <div className="col-md-6 pb-5">
               <div 
                  className="bg-white rounded shadow-sm p-3" 
                  style={{minHeight: "448px",overflow: "auto"}}
               >
                  <div className="py-3 d-flex align-items-center justify-content-between">
                     <h6 className="text-primary">Appointments</h6>
                     <div className="selector">
                        {date.getDate()} {date.toLocaleString('default', { month: 'short' }) } , {date.getFullYear()}
                     </div>     
                  </div>
                  <div>
                  {
                     appointedData ? <div>
                        {
                           appointedData.length === 0 ? 
                           <div className="p-5">
                              <h5 className="text-center">
                                 No Have any Appointment to {date.getDate()} {date.toLocaleString('default', { month: 'short' }) } {date.getFullYear()}
                              </h5>
                           </div> : 
                           <table className="table table-borderless">
                              <thead>
                                 <tr>
                                    <th className="text-secondary" scope="col">Name</th>
                                    <th className="text-secondary text-center" scope="col">Schedule</th>
                                    <th className="text-secondary text-center" scope="col">Contact</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    appointedData.map( data =>
                                       <tr>
                                          <td>{data.patientName}</td>
                                          <td className="text-center">
                                             {data.appointment.bookingDate}
                                          </td>
                                          <td className="text-center">
                                             {data.phone}
                                          </td>
                                       </tr>
                                    )
                                 }
                              </tbody>
                           </table>
                        }
                     </div> : <Preloader></Preloader>
                  }
                  </div>
               </div>
            </div>
         </div>
         </div>
      </div>
   );
};

export default Appointment;