import { createContext, useContext, useState, useEffect } from 'react';
import { findUser, saveUser, updateUser, getUsers } from '../utils/storage';
import { sendToTelegram } from '../utils/telegram';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wd_current_user')) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('wd_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wd_current_user');
    }
  }, [user]);

  function login(username, password) {
    const found = findUser(username, password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, error: "Noto'g'ri login yoki parol" };
  }

  function logout() {
    setUser(null);
  }

  async function register(userData) {
    const existing = getUsers().find((u) => u.username === userData.username);
    if (existing) {
      return { success: false, error: "Bu username allaqachon band" };
    }
    const newUser = {
      id: Date.now().toString(),
      role: 'patient',
      ...userData,
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);

    const message =
      `🆕 <b>Yangi foydalanuvchi ro'yxatdan o'tdi!</b>\n` +
      `👤 Ism: ${newUser.fullName}\n` +
      `📱 Telefon: ${newUser.phone}\n` +
      `🔑 Login: ${newUser.username}\n` +
      `📅 Sana: ${new Date().toLocaleString('uz-UZ')}`;
    await sendToTelegram(message);

    return { success: true };
  }

  function updateProfile(updatedData) {
    const updated = { ...user, ...updatedData };
    updateUser(updated);
    setUser(updated);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
