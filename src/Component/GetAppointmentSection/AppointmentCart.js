import { Button } from '@material-ui/core';
import React from 'react';

const AppointmentCart = (props) => {
    const { id, subject, visitingHour } = props.appointment

    return (
        <div className="col-md-4 mb-5">
            <div className="card appointment-card p-3">
                <div className="card-body text-center">
                    <h5>{subject}</h5>
                    <p>Visiting Time</p>
                    <h6>{visitingHour}</h6>
                    <Button
                        variant="contained"
                        onClick={() => props.modalController(id)}
                    >
                        Book appointment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCart;