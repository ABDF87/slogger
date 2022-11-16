import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './TaskList.module.css';
import TaskListContainer from './TaskListContainer';
import TaskItem from './TaskItem';

function TaskList({
  taskListName,
  projectItems,
  tasks,
  setTask,
  addTask,
  setDetailName,
  deleteTaskHandler,
  setTaskCritical
}) {
  return (
    <div className={style.taskList}>
      <div>
        {projectItems.map(
          (project) =>
            project.isActive && (
              <TaskListContainer
                key={project.projectid}
                projectId={project.projectid}
                projectItems={projectItems}
                addTask={addTask}
                tasks={tasks}
                setDetailName={setDetailName}
                deleteTaskHandler={deleteTaskHandler}
                taskListName={taskListName}
                projectTime={project.timeproject}
                setTask={setTask}
                setTaskCritical = {setTaskCritical}
              />
            )
        )}
      </div>
    </div>
  );
}

export default TaskList;
