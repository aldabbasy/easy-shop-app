import axios from 'axios';
import { API_URL } from './constants';

type authenticateUserProps = {
  username: string;
  password: string;
};
export async function authenticateUser({username, password}:authenticateUserProps) {
  try {
    console.log(username)
    var data;
    const api = axios.create({
      baseURL: `${API_URL}`
    });

    await api.post(`/login`, { username: `${username}`, password: `${password}` }).then(res => {
      data = res.data;
    });
    return data;
  }
  catch (ex) {
    throw ex;
  }
}