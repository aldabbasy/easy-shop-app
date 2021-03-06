import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import AppStorage from '../utils/AppStorage';

type useAxiosGetReturnType = {
  data: any;
  loading: boolean;
  error: any;
  refetch: () => Promise<any>;
}

type useAxiosGetProps = {
  endpoint: string;
}

const useAxiosGet = ({ endpoint }: useAxiosGetProps): useAxiosGetReturnType => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);


  const refetch = async() => {
    setLoading(true);
    const token = AppStorage.get('access-token');
    const api = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    await api.get(`${API_URL}/${endpoint}`).then(res => {
      setData(res.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }


  useEffect(() => {
    setLoading(true);
    const token = AppStorage.get('access-token');
    const api = axios.create({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    api.get(`${API_URL}/${endpoint}`).then(res => {
      setData(res.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });

  }, [endpoint]);

  return { data, loading, error, refetch };
};

export default useAxiosGet;
