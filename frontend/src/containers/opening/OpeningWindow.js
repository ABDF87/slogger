import style from './OpeningWindow.module.css';
import Registration from '../../components/Auth/Registration';

function OpeningWindow() {

  return (
    <div className={style.openingWindow}>
      <div className={style.container}>
        <div className={style.titleWrapper}>
          <h1 className={style.title}>Slogger</h1>
          <p className={style.disclaimer}>
            Simple organizer for your projects.
          </p>
          <div className={style.benefits}>
            <p>
              <ul>
                <li>Easy to use</li>
                <li>Flеxible for projects of any level</li>
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
