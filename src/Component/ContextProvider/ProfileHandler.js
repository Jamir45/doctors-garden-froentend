import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { dataURLtoFile } from '../ProfilePicUpload/URLConverter';
import { useContextData } from './ContextProvider';
import { authenticate, getCookie } from './SigninHelper';
import { useHistory } from 'react-router-dom';

const ProfileHandler = () => {
   const history = useHistory()
   const token = getCookie('doctorGardenToken')
   const url = 'https://doctor-portal-backend-server.herokuapp.com';
   const { setFormLoader, setLoggedInUser } = useContextData()

   // Upload User Profile Pic
   const uploadProfile = async (croppedImage, setHeader, handleClose) => {
      const convertDataUrl = croppedImage.toDataURL("image/jpeg")
      const convertFileUrl = dataURLtoFile(convertDataUrl, "cropped-image.jpeg")
      const formData = new FormData()
      formData.append('file', convertFileUrl)
      const result = await axios.post(url + '/profile/image/upload', formData, {
         headers: { authorization: token }
      })
      console.log(result.data)
      if (result.data.success) {
         const { success, signInToken } = result.data
         setFormLoader(false)
         authenticate(signInToken)
         setLoggedInUser(jwtDecode(signInToken))
         toast.success(success)
         handleClose()
         history.push('/')
         setHeader(true)
      } else {
         setFormLoader(false)
         toast.error(result.data.error)
      }
   }

   return {
      uploadProfile
   }
};

export default ProfileHandler;