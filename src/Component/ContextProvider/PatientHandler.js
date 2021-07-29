import { toast } from 'react-toastify';
import axios from "axios";
import { useContextData } from './ContextProvider';
import { getCookie } from './SigninHelper';


const PatientHandler = () => {
   const { date, setFormLoader, selectedPatient, userAppointment, setUserAppointment, setSelectedPatient } = useContextData()
   const url = 'https://doctor-portal-backend-server.herokuapp.com'
   const token = getCookie('doctorGardenToken')

   // appointment making
   const makeAppointment = async (data, appointment, selectedDoctor, setIsBooked) => {
      setFormLoader(true)
      const bookingDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const { patientName, phone, email, gender, age, weight } = data
      const { subject, visitingHour } = appointment
      const result = await axios.post(url + '/make/appointment',
         {
            selectedDoctor,
            patientName,
            phone,
            email,
            gender,
            age,
            weight,
            appointmentStatus: 'Pending',
            appointment: {
               bookingDate,
               visitingHour,
               subject,
            },
            prescription: []
         },
         {
            headers: { authorization: token }
         }
      )
      setFormLoader(false)
      console.log(result)
      if (result.data.success) {
         const { success, savedAppointment } = result.data
         setIsBooked(true)
         toast.success(success)
         console.log(savedAppointment)
         setUserAppointment([...userAppointment, savedAppointment])
      } else {
         toast.error(result.data.error)
      }
   }

   // add prescription on patient database 
   const addPrescription = async (prescription) => {
      const result = await axios.put(url + '/add-prescription', {
         patientId: selectedPatient._id,
         prescription
      }, {
         headers: { authorization: token }
      }
      )
      console.log(result.data)
      if (!result.data.error) {
         const upDatePatient = userAppointment && userAppointment.map(ap => {
            if (ap.userId === result.data.userId) {
               return result.data
            } else {
               return ap
            }
         })
         setUserAppointment(upDatePatient)
         setSelectedPatient(result.data)
      } else {
         toast.error(result.data.error)
      }
   }


   return {
      makeAppointment,
      addPrescription
   };
};

export default PatientHandler;