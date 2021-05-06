import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import AppStorage from '../utils/AppStorage';

type useAxiosGetReturnType = {
  data: any;
  loading: boolean;
  refetch: () => Promise<any>;
}

type useAxiosGetProps = {
  endpoint: string;
  callback?: () => {};
}

const useAxiosGet = ({ endpoint, callback }: useAxiosGetProps): useAxiosGetReturnType => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const afterResolve = useCallback((responseData) => {
      setData(responseData);
      setLoading(false);

      if(callback){
        callback();
      }
    },[setData, setLoading, callback]
  );


  const api = useCallback(axios.create({
    headers: {
      'Authorization': `Bearer ${AppStorage.get('access-token')}`
    }
  }),[]
  );

  const refetch = async() => {
    setLoading(true);

    await api.get(`${API_URL}/${endpoint}`).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => {

    api.get(`${API_URL}/${endpoint}`).then(res => {
      afterResolve(res.data);
    });

  }, [afterResolve, endpoint, api]);

  return { data, loading, refetch };
};

export default useAxiosGet;
