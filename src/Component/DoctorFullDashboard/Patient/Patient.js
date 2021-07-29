import React from 'react';
import { useContextData } from '../../ContextProvider/ContextProvider';
import Preloader from '../../Preloader/Preloader';
import Sidebar from '../Sidebar/Sidebar';
import PatientMobile from './PatientMobile';

const Patient = () => {
   const {userAppointment} = useContextData()
   let slNo = 1;

   return (
      <div className="DashboardPage row">
         <Sidebar />
         <div className="d-none d-md-block col-md-10 col-lg-10">
            <h4 className='py-3'>Patient Info</h4>
            <div className="DashboardDetails rounded shadow-sm p-3">
               <table className="table table-borderless">
                  <thead>
                     <tr>
                        <th className="text-secondary" scope="col">SL No</th>
                        <th className="text-secondary" scope="col">Name</th>
                        <th className="text-secondary text-center" scope="col">Gender</th>
                        <th className="text-secondary text-center" scope="col">Age</th>
                        <th className="text-secondary text-center" scope="col">Weight</th>
                        <th className="text-secondary text-center" scope="col">Phone</th>
                        <th className="text-secondary text-center" scope="col">Email</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        userAppointment && userAppointment.map( patient => {
                           const {patientName, gender, age, weight, phone, email} = patient
                           return <tr>
                              <td> {slNo++} </td>
                              <td> {patientName} </td>
                              <td className="text-center py-3"> {gender} </td>
                              <td className="text-center py-3"> {age} </td>
                              <td className="text-center py-3"> {weight} </td>
                              <td className="text-center py-3"> {phone} </td>
                              <td className="text-center py-3"> {email} </td>
                           </tr>
                        })
                     }
                  </tbody>
               </table>
               {
                  !userAppointment && <Preloader></Preloader>
               }
            </div>
         </div>
         <PatientMobile />
      </div>
   );
};

export default Patient;