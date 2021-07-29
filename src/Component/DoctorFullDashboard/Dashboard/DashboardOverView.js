import React from 'react';
import { useContextData } from '../../ContextProvider/ContextProvider';

const DashboardOverView = () => {
    const { date, userAppointment } = useContextData()

    // Pending Appointments
    const pendingPatient = userAppointment && userAppointment.filter(data => data.status === 'Pending')

    // Total Appointed Patient
    const totalPatient = userAppointment && userAppointment.filter(data => data.status === 'Approved')

    // Today's Appointments
    const formatedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const todayAppointed = userAppointment && userAppointment.filter(data => data.appointment.bookingDate === formatedDate)

    return (
        <div className="row dashboardOverView">
            <div className="col-md-3">
                <div className={"overVieStatus bg-danger"}>
                    <h1>
                        {pendingPatient ? pendingPatient.length : 0}
                    </h1>
                    <h6>Pending Appointment</h6>
                </div>
            </div>
            <div className="col-md-3">
                <div className={"overVieStatus bg-info"}>
                    <h1>
                        {todayAppointed ? todayAppointed.length : 0}
                    </h1>
                    <h6>Today's Appointment</h6>
                </div>
            </div>
            <div className="col-md-3">
                <div className={"overVieStatus bg-success"}>
                    <h1>
                        {userAppointment ? userAppointment.length : 0}
                    </h1>
                    <h6>Total Appointments</h6>
                </div>
            </div>
            <div className="col-md-3">
                <div className={"overVieStatus bg-warning"}>
                    <h1>
                        {totalPatient ? totalPatient.length : 0}
                    </h1>
                    <h6>Total Appointed</h6>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverView;