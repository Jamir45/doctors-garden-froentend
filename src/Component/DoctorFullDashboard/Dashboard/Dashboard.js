import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import DataTable from './DataTable';
import PrescriptionEditModal from './PrescriptionEditModal';
import PrescriptionModal from './PrescriptionModal';
import DashboardOverView from './DashboardOverView';
import MobileDataTable from './MobileDataTable';
import { useContextData } from '../../ContextProvider/ContextProvider';

const Dashboard = (props) => {
    const {
        userAppointment,
        setSelectedPatient,
        setModalIsOpen,
        setEditModalIsOpen
    } = useContextData()

    // For Open Prescription Modal when Click View or Plus Button
    const openPrescriptionModal = (patientId) => {
        setModalIsOpen(true);
        const selectedAp = userAppointment.find(ap => ap._id === patientId)
        setSelectedPatient(selectedAp)
    }

    // For Open Prescription Edit Modal when Click Edit Button
    const openDataEditModal = (apId) => {
        setEditModalIsOpen(true);
        const selectedAp = userAppointment.find(ap => ap._id === apId)
        setSelectedPatient(selectedAp);
    }

    return (
        <div className="DashboardPage row">
            <Sidebar></Sidebar>
            <div className="col-md-10 col-lg-10">
                <div className="DashboardDetails">
                    {
                        props.conditional === false ?
                            <h5>Prescription</h5> :
                            <h5>Dashboard</h5>
                    }
                    {
                        props.conditional === false ?
                            <div></div> :
                            <DashboardOverView />
                    }
                    <DataTable
                        openPrescriptionModal={openPrescriptionModal}
                        openDataEditModal={openDataEditModal}
                        conditional={props.conditional}
                    />
                    <MobileDataTable
                        openPrescriptionModal={openPrescriptionModal}
                        openDataEditModal={openDataEditModal}
                        conditional={props.conditional}
                    />
                    {/* Prescription Edit Modal For Patient */}
                    <PrescriptionEditModal />

                    {/* Prescription Modal For Patient */}
                    <PrescriptionModal />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;