function makeProjectActive(array, event) {
  array.map((el) => {
    if (el.projectid == event.target.id) {
     
      el.isActive = true;
    } else el.isActive = false;
  });
}

function makeTaskActive(array, event, activeProjectId) {
  array.map((el) => {
    if (el.taskid === event.target.id && el.projectid === activeProjectId) {
      el.isActive = true;
    } else if (el.taskid !== event.target.id && el.projectid === activeProjectId) {
      el.isActive = false;
    }
  });
}

function rerenderHandler(state, setState) {
  setState(!state);
}
export { makeProjectActive, makeTaskActive, rerenderHandler };
