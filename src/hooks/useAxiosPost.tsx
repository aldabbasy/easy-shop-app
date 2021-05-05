import { useCallback, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import AppStorage from '../utils/AppStorage';

type useAxiosPostReturnType = [
  () => void,
  {
    data: any;
    loading: boolean;
  }
]

type useAxiosPostProps = {
  endpoint: string;
  body?: any;
  callback?: () => any;
}

const useAxiosPost = ({ endpoint, body, callback }: useAxiosPostProps): useAxiosPostReturnType => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const afterResolve = useCallback((data) => {
      setData(data);
      setLoading(false);

      if(callback){
        callback();
      }
    },[setData, setLoading, callback]
  );

  const sendRequest = () => {
    const api = axios.create({
      headers: {
        'Authorization': `Bearer ${AppStorage.get('access-token')}`
      }
    });

    setLoading(true);

    api.post(`${API_URL}/${endpoint}`, body).then(res => {
      afterResolve(res.data);
    });
  }

  return [sendRequest, { data, loading }];
};

export default useAxiosPost;
