import React from 'react';
import { Link } from 'react-router-dom';
import MobileSidebar from './MobileSidebar';

const Sidebar = () => {
    return (
        <>
            <div className="d-none d-md-block col-md-2 col-lg-2">
                <div className="sidebar p-lg-3" style={{height:"91vh"}}>
                    <ul className="list-unstyled">
                        <li>
                            <Link 
                                to="/doctor/dashboard" 
                                className="text-white text-center"
                            >
                                <i className="fas fa-grip-horizontal"></i>
                                <span>Dashboard</span> 
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/doctor/appointment" 
                                className="text-white text-center"
                            >
                                <i className="fas fa-calendar-alt"></i>
                                <span>Appointment</span> 
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/doctor/patients" 
                                className="text-white text-center"
                            >
                                <i className="fas fa-users"></i>
                                <span>Patients</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/doctor/prescriptions" 
                                className="text-white text-center"
                            >
                                <i className="fas fa-file-alt"></i>
                                <span>Prescriptions</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/doctor/setting" 
                                className="text-white text-center" 
                            >
                                <i className="fas fa-cog"></i>
                                <span>Setting</span>
                            </Link>
                        </li>
                    </ul>
                    <div>
                        <Link to="/" className="text-white">
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>
            <MobileSidebar />
        </>
    );
};

export default Sidebar;