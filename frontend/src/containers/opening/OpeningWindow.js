import style from './OpeningWindow.module.css';
import Registration from '../../components/Auth/Registration';
import { useNavigate } from "react-router-dom";

function OpeningWindow() {
  const navigate = useNavigate();

  return (
    <div className={style.openingWindow}>
      <div className={style.containerLeft}>
        <div className={style.titleWrapper}>
          {/* <img className={style.logo} src='/photos/logo.png' /> */}
          <h1 className={style.title}>Slogger</h1>
        
        </div>
        <div className={style.descriptionContainer}>
        <p className={style.disclaimer}>
            Simple organizer for your projects.
          </p>
          <div className={style.getStartedButton} onClick={()=>navigate('/registration')}>Get started
            </div>
          <div className={style.benefits}>
            <p>
              <ul>
                <li>It's free</li>
                <li>Easy to use</li>
                <li>Flеxible for projects of any level</li>
                <li>Encrypted data storage</li>
              </ul>
            </p>
          </div>
          </div>
           {/* <Registration /> */}
        </div>
        <div className={style.containerRight}>
        <div className={style.screenshotWrapper}>  
        <div className={style.buttonWrapper}>
        <div className={style.getStartedButtonWhite} onClick={()=>navigate('/registration')}>Get started
            </div>
            <div className={style.logInButton} onClick={()=>navigate('/login')}>Sign in 
            </div>
            </div>
        <img className={style.screenshot} src='/photos/screenshot.png' style={{width:"auto", height:'400px'}}/>
        </div>
        </div>
     
       
   
      
    </div>
  );
}

export default OpeningWindow;
