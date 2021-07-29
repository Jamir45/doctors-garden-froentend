import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { useContextData } from '../../ContextProvider/ContextProvider';
import PatientHandler from '../../ContextProvider/PatientHandler';

const PrescriptionModal = (props) => {
    const { modalIsOpen, setModalIsOpen, selectedPatient } = useContextData()
    const { addPrescription } = PatientHandler()

    const { register, handleSubmit, errors } = useForm()
    const onSubmit = (prescription, event) => {
        addPrescription(prescription)
        event.target.reset(prescription)
    }
    const handleClose = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <Dialog
                open={modalIsOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {
                    selectedPatient &&
                    <div className="px-3 px-md-5 px-lg-5 py-3">
                        <div className="px-3 px-md-0 px-lg-0 mb-3 d-flex justify-content-between">
                            <span className="text-primary">
                                {selectedPatient.patientName}
                            </span>
                            <span>Gender : {selectedPatient.gender}</span>
                            <span>Age : {selectedPatient.age}</span>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="row add-prescription px-3 px-md-0 px-lg-0">
                            {
                                errors.medicine &&
                                <span className="text-danger">
                                    Medicine Name Can't Be Empty
                                </span>
                            }
                            <div className="col-5 p-0">
                                <input
                                    type="text"
                                    name="medicine"
                                    className="form-control"
                                    placeholder="Medicine Name"
                                    ref={register({ required: true })}
                                />
                            </div>

                            {errors.doge && <span></span>}
                            <div className="col-3 p-0">
                                <select
                                    name="rules"
                                    className="form-control"
                                    ref={register({ required: true })}
                                >
                                    <option value="1 - 1 - 1">1 - 1 - 1</option>
                                    <option value="1 - 0 - 1">1 - 0 - 1</option>
                                    <option value="1 - 0 - 0">1 - 0 - 0</option>
                                    <option value="1 - 1 - 0">1 - 1 - 0</option>
                                    <option value="1 - 1 - 0">1 - 1 - 0</option>
                                    <option value="0 - 1 - 1">0 - 1 - 1</option>
                                    <option value="1 - 0 - 0">1 - 0 - 0</option>
                                    <option value="0 - 0 - 1">0 - 0 - 1</option>
                                </select>
                            </div>

                            <div className="col-3 p-0">
                                <input
                                    name="days"
                                    type="number"
                                    placeholder="Days"
                                    className="form-control"
                                    ref={register({ required: true })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary col-1"
                            >
                                <i className="fas fa-plus"></i>
                            </button>
                        </form>

                        {/* Medicine List */}
                        <div
                            className="mt-5"
                            style={{ height: "auto", overflow: "auto" }}
                        >
                            {
                                <table className="table table-borderless">
                                    {
                                        selectedPatient.prescription.length &&
                                        selectedPatient.prescription.map((prescript, index) =>
                                            <tr>
                                                <td>{index + 1}.</td>
                                                <td>{prescript.medicine}</td>
                                                <td>{prescript.rules}</td>
                                                <td>{prescript.days} Days</td>
                                            </tr>
                                        )
                                    }
                                </table>
                            }
                        </div>
                    </div>
                }
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PrescriptionModal;