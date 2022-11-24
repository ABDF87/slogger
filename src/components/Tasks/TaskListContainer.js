import { useState } from 'react';
import TaskItem from './TaskItem';
import style from './TaskListContainer.module.css';

function TaskListContainer(props) {
  const {
    projectItems,
    projectId,
    addTask,
    tasks,
    setDetailName,
    deleteTaskHandler,
    taskListName,
    projectTime,
    setTask,
    setTaskCritical,
  } = props;
  const [text, setText] = useState('');
  const [disabledOff, setDisabledOff] = useState(true);
  const [nameExist, setNameExist] = useState(false);

  let activeProjectId;
  projectItems.map((project) => {
    if (project.isActive === true) {
      activeProjectId = project.projectid;
    }
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    tasks.map((task) => {
      if (task.taskname === text.trim()) {
        setNameExist(true);
        onSubmitHandler();
        return;
      }
    });
    if (text !== '' && disabledOff) {
      addTask(text);
      setText('');
      setNameExist(false);
    }
  };
  const preventSubmitHandler = (event) => {
    event.preventDefault();
  };

  const reversedTasks = tasks.slice().reverse();

  const taskUpHandler = (id) => {
    tasks.map((task) => {
      if (task.taskid === id) {
        let inintEl = tasks.indexOf(task);
        let cutedEl = tasks.splice(inintEl, 1)[0];
        cutedEl.isActive = true;
        setDetailName(cutedEl.taskname);
        setTask([...tasks, cutedEl]);
      }
    });
  };

  return (
    <div className={style.taskContainer} id={projectId}>
      <div className={style.taskContainerWrapper}>
        <div className={style.taskListTitle}>{taskListName}</div>
        <div className={style.projectTime}>created: {projectTime}</div>

        <form
          className={style.formTask}
          onSubmit={disabledOff ? onSubmitHandler : preventSubmitHandler}
        >
          <div className={style.formWrapper}>
            <div className={style.inputWrapper}>
              <input
                className={style.inputField}
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={'add new task'}
              />
            </div>
            <div className={style.buttonWrapper}>
              {disabledOff && text !== '' ? (
                <button className={style.buttonTask}>add task</button>
              ) : (
                <button className={style.buttonTaskDeactive}> add task</button>
              )}
            </div>
          </div>
          {nameExist && <div className={style.nameExist}>Name already exist</div>}
        </form>

        <div>
          {reversedTasks.map(
            (task) =>
              activeProjectId === task.projectid && (
                <TaskItem
                  taskName={task.taskname}
                  tasks={tasks}
                  taskId={task.taskid}
                  key={task.taskid}
                  taskFormValue={text}
                  setDetailName={setDetailName}
                  deleteTaskHandler={deleteTaskHandler}
                  projectItems={projectItems}
                  taskIsActive={task.isActive}
                  taskIsCritical={task.isCritical}
                  taskUpHandler={taskUpHandler}
                  setDisabledOff={setDisabledOff}
                  disabledOff={disabledOff}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskListContainer;
