import axios from '../../Api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    
    console.log('USERFRESh works')
  
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });

    console.log('RFRESH WORKS');

    setAuth((prev) => {
      console.log('PREVIOUS', JSON.stringify(prev));
      console.log(response.data.accessToken);
      console.log("USERID REFR",response.data.userID);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        userID: response.data.userID
    }
    });
    return response.data.accessToken;

  };
  return refresh;
};

export default useRefreshToken;