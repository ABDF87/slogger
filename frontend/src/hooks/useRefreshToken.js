import axios from '../../Api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        userID: response.data.userID,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
