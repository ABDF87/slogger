import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiArrowFromBottom } from 'react-icons/bi';
import { BiTrashAlt } from 'react-icons/bi';
import { BsFlagFill } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import style from './TaskItem.module.css';
import { makeTaskActive } from '../util/utils';

function TaskItem({
  projectItems,
  taskName,
  tasks,
  taskId,
  setDetailName,
  deleteTaskHandler,
  taskIsActive,
  taskUpHandler,
  setDisabledOff,
  taskIsCritical,
}) {
  const [editTaskNameOn, seteditTaskNameOn] = useState(true);
  const [newTaskName, setNewTaskName] = useState('new task');
  const [showWarning, setShowWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(Boolean);

  const controller = new AbortController();
  const axiosPrivate = useAxiosPrivate();

  let activeProjectId;

  projectItems.map((project) => {
    if (project.isActive === true) {
      activeProjectId = project.projectid;
    }
  });

  const setChangeTaskNameMode = (event) => {
    event.preventDefault();
    makeTaskActive(tasks, event);

    if (editTaskNameOn === true) {
      seteditTaskNameOn(false);
    } else {
      seteditTaskNameOn(true);
    }
  };

  const submitPreventHandler = (event) => {
    event.preventDefault();
  };

  const onClickActive = (event) => {
    tasks.map((task) => {
      if (
        task.taskid === event.target.id &&
        task.projectid === activeProjectId
      ) {
        task.isActive = true;
      } else if (
        task.taskid !== event.target.id &&
        task.projectid == activeProjectId
      ) {
        task.isActive = false;
      }
    });
    //set corrspond detail name
    tasks.map((task) => {
      if (event.target.id === task.taskid) {
        setDetailName(task.taskname);
      }
    });
    //
  };

  useEffect(() => {
    const actualTask = () => {
      tasks.map((task) => {
        if (task.isActive) {
          setDetailName(task.taskname);
        }
      });
      if (taskIsCritical === true) {
        setIsCritical(true);
      } else if (taskIsCritical === false) {
        setIsCritical(false);
      }
    };
    actualTask();
  }, []);

  const changeName = async (event) => {
    makeTaskActive(tasks, event, activeProjectId);
    setDisabledOff(true);
    tasks.map((task) => {
      if (task.isActive === true && task.projectid === activeProjectId) {
        //Restrict usage same name twise
        task.taskname = event.target.value;
        setNewTaskName(task.taskname);
        setDetailName(task.taskname);
      }
    });

    try {
      const response = await axiosPrivate.put('/tasks', {
        signal: controller.signal,
        taskname: event.target.value,
        taskid: event.target.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = (event) => {
    tasks.map((task) => {
      if (event.target.id === task.taskid) {
        deleteTaskHandler(task.taskid);
      }
    });
    setShowWarning(false);
  };

  const criticalTrueHandler = async (id) => {
    try {
      const response = await axiosPrivate.put('/tasks', {
        signal: controller.signal,
        isCritical: 'true',
        taskid: id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const criticalFalseHandler = async (id) => {
    try {
      const response = await axiosPrivate.put('/tasks', {
        signal: controller.signal,
        isCritical: 'false',
        taskid: id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const criticalStatus = (event) => {
    tasks.map((task) => {
      if (task.taskid === event.target.id) {
        console.log(task.taskname);

        if (isCritical === true) {
          setIsCritical(false);

          criticalFalseHandler(event.target.id);
          task.isCritical = false;
        } else if (isCritical === false) {
          setIsCritical(true);
          criticalTrueHandler(event.target.id);
          task.isCritical = true;
        }
      }
    });
  };

  return (
    <div className={style.taskItemWrapper}>
      {editTaskNameOn && tasks.length > 0 ? (
        <>
          {!showWarning ? (
            <div>
              <button
                className={
                  taskIsActive ? style.taskNameItemActive : style.taskNameItem
                }
                id={taskId}
                onClick={onClickActive}
              >
                {taskName}

                <div className={style.optionsBar}>
                  <div className={style.optionsBarNoFlag}>
                    <AiOutlineEdit
                      className={style.changeTaskNameButton}
                      onClick={setChangeTaskNameMode}
                    />
                    <BiTrashAlt
                      className={style.deleteTaskButton}
                      onClick={() => {
                        setShowWarning(true);
                      }}
                      id={taskId}
                    />
                    <BiArrowFromBottom
                      className={style.ProjectDoneButton}
                      onClick={() => {
                        taskUpHandler(taskId);
                      }}
                      id={taskId}
                    />
                  </div>
                  <div
                    id={taskId}
                    className={style.flagWrapper}
                    onClick={criticalStatus}
                  ></div>
                  <BsFlagFill
                    id={taskId}
                    className={
                      isCritical ? style.criticalRed : style.criticalBlack
                    }
                    onClick={criticalStatus}
                  />
                </div>
              </button>
            </div>
          ) : (
            <div className={style.deleteContainer}>
              Delete task?
              <button id={taskId} onClick={deleteTask}>
                Yes
              </button>
              <button
                onClick={() => {
                  setShowWarning(false);
                }}
              >
                No
              </button>
            </div>
          )}
        </>
      ) : (
        <form
          className={style.taskNameItem}
          onSubmit={taskName ? setChangeTaskNameMode : submitPreventHandler}
        >
          <input
            className={style.inputTaskName}
            placeholder='set new name'
            onChange={changeName}
            value={taskName}
            id={taskId}
            autoFocus
          />

          {taskName ? (
            <button
              className={style.taskNameDoneButton}
              id={taskId}
              onClick={seteditTaskNameOn}
            >
              Done
            </button>
          ) : (
            <>
              <button id={taskId} className={style.taskNameDoneButtonDisabled}>
                Done
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default TaskItem;
