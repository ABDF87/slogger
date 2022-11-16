import { useState } from 'react';

import ProgressBar from '@ramonak/react-progress-bar';
import style from './TaskDetailItem.module.css';
import DeadlineWindow from './DeadlineWindow';
import IntervalAlarm from './IntervalAlarm';
import TextEditorDetails from './TextEditorDetails';
import DetailTextEditor from './DetailTextEditor';



// set global varaible
let totalTime;



function TaskDetailItem({ taskIdActive, projectIdActive, detailName,timeTask,detail,taskCritical }) {
  const [progressBar, setProgressBar] = useState(false);
  const [currentDate, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

 


// calculating time
  let firstPartDayCurrentDayMin =
    parseInt(currentDate.getHours() * 60) +
    parseInt((currentDate.getTime() / (1000 * 60)) % 60);
  let secondPartCurrentDayMin =
    1400 -
    parseInt(currentDate.getHours() * 60) +
    parseInt((currentDate.getTime() / (1000 * 60)) % 60);

  let firstPartLastDayMin =
    parseInt(endDate.getHours() * 60) +
    parseInt((endDate.getTime() / (1000 * 60)) % 60);
  let secondPartLastDayMin =
    1440 -
    (parseInt(endDate.getHours() * 60) +
      parseInt((endDate.getTime() / (1000 * 60)) % 60));

  let totalDays = endDate.getDate() - currentDate.getDate();

 



  let decreseTime;
  if (totalDays == 0) {
    decreseTime = 1440 - firstPartDayCurrentDayMin - secondPartLastDayMin;
  } else if (totalDays == 1) {
    decreseTime = secondPartCurrentDayMin + firstPartLastDayMin;
  } else if (totalDays > 1) {
    decreseTime =
      secondPartCurrentDayMin + (totalDays - 1) * 1440 + firstPartLastDayMin;
  }

  let progress = parseInt(100 - (decreseTime * 100) / totalTime);


  const setDeadlinePopUp = (event) => {
    if (progressBar) {
      setProgressBar(false);
    } else {
      setProgressBar(true);
    }
  };

  const setDeadLine = () => {
    setDeadlinePopUp();
    totalTime = decreseTime;
   
  };

  // Остановить интервал
   const interval = setInterval(function () {
    if (progress < 100 && !progressBar) {
      setStartTime(new Date());
    } else clearInterval(interval);
  }, 61000);

  //   if ((progress) => 100) {
  //     ;
  //   }

  return (
    <div className={style.TaskDetailItem} id={taskIdActive}>
      <h1 className={style.detailTitle}>{detailName} </h1>
    <div>
      <div className={style.timeTask}>created: {timeTask}</div>
  
      <p>  <ul><li>  <span className={style.textCritical}> {taskCritical}</span></li></ul></p>
      </div>
      {/* {id} */}
      

      <div className={style.notesDetails}>
        <DetailTextEditor 
            taskIdActive={taskIdActive}
            projectIdActive={projectIdActive}
        
            detail = {detail}
            detailName = {detailName}
            />
            
      </div>
    </div>
  );
}

export default TaskDetailItem;


{/* <div className={style.setTimerBox}>
        <div className={style.deadlineBox}>
        {!progressBar ? (<><DeadlineWindow endDate={endDate} setEndDate={setEndDate} />
         
            <button
              className={style.setDedlineButton}
              onClick={setDeadLine}
              id={id}
            >
              Set deadline
            </button></> 
          ) : (
            <button
              className={style.setDedlineButton}
              id={id}
              onClick={setDeadLine}
            >
              Remove deadline
            </button>
          )}
        </div>
        <div className='progressBar'>
          {progressBar && (
            <ProgressBar
              // className='wrapper'
              // barContainerClassName="container"
              // labelClassName="label"
              // completedClassName="barCompleted"
              completed={progress}
              maxCompleted={100}
              // customLabel='Not there yet'
            />
          )}
        </div>
        {/* <div className={style.setIntervalBox}>
          <button className={style.setAlarmButton}>
            Set notification every:
          </button>
          <IntervalAlarm />
        </div> */}
