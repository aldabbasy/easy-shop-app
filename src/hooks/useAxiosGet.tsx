import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import AppStorage from '../utils/AppStorage';

type useAxiosGetReturnType = {
  data: any;
  loading: boolean;
}

type useAxiosGetProps = {
  endpoint: string;
  callback?: () => {};
}

const useAxiosGet = ({ endpoint, callback }: useAxiosGetProps): useAxiosGetReturnType => {
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

    api.get(`${API_URL}/${endpoint}`).then(res => {
      afterResolve(res.data);
    });

  }, [afterResolve, endpoint]);

  return { data, loading };
};

export default useAxiosGet;
