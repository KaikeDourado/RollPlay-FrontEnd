import { app, auth } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export const authApi = {
  async signInEmail(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido:', result.user.email);
      return result;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      await signOut(auth);
      console.log('Logout bem-sucedido');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  },

  async getIdToken(forceRefresh = false) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Nenhum usuário autenticado');
      }

      const token = await user.getIdToken(forceRefresh);
      return token;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw error;
    }
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  getAuth() {
    return auth;
  }
};

export default authApi;