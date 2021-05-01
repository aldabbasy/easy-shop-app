import axios from 'axios';
import { API_URL } from './constants';
import AppStorage from './AppStorage';

type authenticateUserProps = {
  username: string;
  password: string;
};
export async function authenticateUser({username, password}:authenticateUserProps) {
  try {
    var data;
    const api = axios.create({
      baseURL: `${API_URL}`
    });
    const encryptedPassword = btoa(unescape(encodeURIComponent(password)));

    await api.post(`/login`, { username: `${username}`, password: `${encryptedPassword}` }).then(res => {
      data = res.data;
      AppStorage.set('access-token',data.access_token);
    });
    return data;
  }
  catch (ex) {
    throw ex;
  }
}