import axios from 'axios';
import { API_URL } from './constants';

type authenticateUserProps = {
  username: string;
  password: string;
};
export async function authenticateUser({username, password}:authenticateUserProps) {
  try {
    var data;
    const api = axios.create({
      baseURL: `${API_URL}`,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        username: `${username}`,
        password: `${password}`
      }
    });

    await api.post(`/login`).then(res => {
      data = JSON.parse(res.data);
    });
    return data;
  }
  catch (ex) {
    throw ex;
  }
}