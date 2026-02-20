import { INITIAL_DOCTORS, INITIAL_PATIENTS } from '../data/initialData';

const USERS_KEY = 'wd_users';
const APPOINTMENTS_KEY = 'wd_appointments';

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function updateUser(updatedUser) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === updatedUser.id);
  if (idx !== -1) {
    users[idx] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

export function findUser(username, password) {
  // NOTE: passwords are stored in plain text for demo purposes only.
  // In a production system, always hash passwords (e.g. with bcrypt).
  return getUsers().find(
    (u) => u.username === username && u.password === password
  ) || null;
}

export function getAppointments() {
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveAppointment(appointment) {
  const appointments = getAppointments();
  appointments.push(appointment);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function isSlotTaken(doctorId, date, time) {
  return getAppointments().some(
    (a) => a.doctorId === doctorId && a.date === date && a.time === time
  );
}

export function initializeStorage() {
  const users = getUsers();
  if (users.length === 0) {
    const allUsers = [...INITIAL_PATIENTS, ...INITIAL_DOCTORS];
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  }
}
