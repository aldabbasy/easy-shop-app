import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import AppStorage from '../utils/AppStorage';

type useAxiosReturnType = {
  data: any;
  loading: boolean;
}

type useAxiosProps = {
  endpoint: string;
  body?: any;
  callback?: () => {};
  method: string;
}

const useAxios = ({ endpoint, body, callback, method }: useAxiosProps): useAxiosReturnType => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const afterResolve = useCallback((data) => {
      setData(data);
      setLoading(false);

      if(callback){
        callback();
      }
    },[setData, setLoading, callback]
  );

  useEffect(() => {
    const api = axios.create({
      headers: {
        'Authorization': `Bearer ${AppStorage.get('access-token')}`
      }
    });

    if(method === 'GET'){
      api.get(`${API_URL}/${endpoint}`).then(res => {
        afterResolve(res.data);
      });
    }
    else{
      api.post(`/${endpoint}`, body).then(res => {
        afterResolve(res.data);
      });
    }
  }, [afterResolve, body, endpoint, method]);

  return { data, loading };
};

export default useAxios;
