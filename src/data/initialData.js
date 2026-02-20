import doctorsData from './doctors.json';
import patientsData from './patients.json';

export const INITIAL_DOCTORS = doctorsData;
export const INITIAL_PATIENTS = patientsData;

export const DEMO_USER = patientsData[0];

export const DOCTORS = doctorsData.map((d) => ({
  id: d.id,
  name: d.fullName,
  specialty: d.specialty,
  image: null,
}));

export const TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export const PAYMENT_CARD = '8600 1234 5678 9012';
export const PAYMENT_CARD_OWNER = 'Alisher Karimov';