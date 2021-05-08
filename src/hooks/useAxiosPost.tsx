import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import AppStorage from '../utils/AppStorage';

type useAxiosPostReturnType = [
  (body:any) => Promise<any>,
  {
    data: any;
    loading: boolean;
    error: any;
  }
]

type useAxiosPostProps = {
  endpoint: string;
  body?: any;
  callback?: () => any;
}

const useAxiosPost = ({ endpoint }: useAxiosPostProps): useAxiosPostReturnType => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    headers: {
      'Authorization': `Bearer ${AppStorage.get('access-token')}`
    }
  });

  const sendRequest = async(body) => {
    setLoading(true);

    await api.post(`${API_URL}/${endpoint}`, body).then(res => {
      setData(res.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }

  return [sendRequest, { data, loading, error }];
};

export default useAxiosPost;
