import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './Login.module.css';
import axios from '../../Api/axios';
const LOGIN_URL = '/auth';

function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/workspace';
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const userID = response?.data?.userID;
  
      setAuth({ user, pwd, roles, accessToken, userID });
   
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
      
    
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <>
      <section className={styles.signInScreen}>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live='assertive'
        >
          {errMsg}
        </p>
        <div className={styles.formContainer}>
          <form className={styles.signInForm} onSubmit={handleSubmit}>
            <h1 className={styles.signInformTitle}>Sign in</h1>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button
              type='submit'
              className={styles.signInButton}
              title='Sign in'
            >
              Sign in
            </button>
            <div className={styles.logginBottom}>
              <div className={styles.persistCheck}>
                <input
                  type='checkbox'
                  id='persist'
                  onChange={togglePersist}
                  checked={persist}
                />
                <label htmlFor='persist'>Trust This Device</label>
              </div>
              <div className={styles.needAccountWrapper}>
              <p className={styles.needAccount}>Need an Account? </p>
            
              <span className='line'>
                {/*put router link here*/}
                <a href='/registration'>Sign Up</a>
              </span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
