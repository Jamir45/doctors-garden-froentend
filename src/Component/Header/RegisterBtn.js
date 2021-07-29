import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const RegisterBtn = () => {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const history = useHistory()
   const [patient, setPatient] = useState(null)
   const [doctor, setDoctor] = useState(null)
   useEffect(() => {
      if (patient) {
         history.push(`/registration/${patient}`)
         setAnchorEl(null);
         setDoctor(null)
      }
   }, [patient])

   useEffect(() => {
      if (doctor) {
         history.push(`/registration/${doctor}`)
         setAnchorEl(null);
         setPatient(null)
      }
   }, [doctor])

   return (
      <div>
         <Button
            variant="contained"
            onClick={handleMenu}
         >
            Registration
         </Button>
         <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
         >
            <MenuItem onClick={() => setPatient('patient')}>
               Patient Registration
            </MenuItem>
            <MenuItem onClick={() => setDoctor('doctor')}>
               Doctor Registration
            </MenuItem>
         </Menu>
      </div>
   );
};

export default RegisterBtn;