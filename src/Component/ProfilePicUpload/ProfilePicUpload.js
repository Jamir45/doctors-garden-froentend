import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import FormLoading from '../Loading/FormLoading';
import ImageCropper from './ImageCropper';

const ProfilePicUpload = ({setHeader}) => {
   useEffect(() => {
      setHeader(false)
   }, []) 

   const {formLoader, setFormLoader, toastMessage} = useContextData()
   
   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
      setFormLoader(false)
   };
   const inputRef = useRef()
   const triggerFileSelect = () => inputRef.current.click()
   const [image, setImage] = useState(null)

   const getFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
         const reader = new FileReader()
         reader.readAsDataURL(e.target.files[0])
         reader.addEventListener("load", () => {
            setImage(reader.result)
            setOpen(true)
         })
      }
      if (!open) {
         e.preventDefault()
      }
   }

   const picUrl = "https://res.cloudinary.com/dj7k9b8ps/image/upload/v1619071303/p1uf7vrckivcmiogwwwu.png"

   return (
      <div className='uploadImgPage'>
         {toastMessage()}
         <Paper elevation={3} className='uploadImgSection'>
            <img className="img-fluid rounded-circle" src={picUrl} alt=""/>
            <div>
               <input 
                  onChange={getFile} 
                  type="file" 
                  ref={inputRef} 
                  style={{display: 'none'}}
               />
               <Button
                  variant='contained'
                  color="primary"
                  className="uploadBtn"
                  onClick={(e) => triggerFileSelect(e)}
               >
                  {/* {profileEdit ? 'Change Photo' : 'Upload'} */}
                  Upload Photo
               </Button>
            </div>
         </Paper>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="imageCropDialog"
         >
            {
               formLoader && <FormLoading />
            }
            <DialogTitle id="alert-dialog-title" className="text-center px-5">
               Please Crop Your Image Before Upload.
            </DialogTitle>
            <DialogContent>
               <ImageCropper 
                  image={image} 
                  setHeader={setHeader}
                  handleClose={handleClose}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default ProfilePicUpload;