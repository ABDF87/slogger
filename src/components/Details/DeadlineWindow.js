import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import style from './DeadlineWindow.module.css';

const DeadlineWindow = ({endDate, setEndDate}) => {
   



  return (
    <div className={style.wrapperClassName}>
        <DatePicker
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
      {/* <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        timeInputLabel='Time:'
        dateFormat='dd/MM/yyyy h:mm aa'
        minDate={new Date()}
       
        timeCaption="time"
        // minTime={new Date()}

   
        showTimeInput
        wrapperClassName={style.datePicker}
       
      /> */}
    </div>
  );
  // <Popup trigger={<button>Trigger</button>} position="top right">
  //   {close => (
  //     <div className={style.popUpWindow}>
  //       <input type="date"></input>
  //       <a className="close" onClick={close}>
  //         &times;
  //       </a>
  //     </div>
  //   )}
  // </Popup>
};

export default DeadlineWindow;
