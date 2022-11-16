import { useState } from 'react';
import style from './OpeningWindow.module.css';

import GreetingScreen from './GreetingScreen';
import SignUpScreen from './Registration';
import Registration from './Registration';

function OpeningWindow() {
  const [signInStatus, setSignInStatus] = useState(true);

  return (
    <div className={style.openingWindow}>
      <div className={style.container}>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>Persister</h1>
          <p className={style.disclaimer}>Simple organizer for your projects.</p>
          <div className={style.benefits}>
          <p >
            <ul>
              <li>Easy to use</li>
              <li>Flaxible for projects of any level</li>
              <li>Encrypted data storage</li>
           
            </ul>
          </p>
          </div>
        </div>
        <div className={style.registerWrapper}>
          <Registration />
        </div>
      </div>
    </div>
  );
}

export default OpeningWindow;
