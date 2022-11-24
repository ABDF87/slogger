import style from './TaskList.module.css';
import TaskListContainer from './TaskListContainer';

function TaskList({
  taskListName,
  projectItems,
  tasks,
  setTask,
  addTask,
  setDetailName,
  deleteTaskHandler,
  setTaskCritical,
}) {
  return (
    <div className={style.taskList}>
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
                
              />
            )
        )}
    </div>
  );
}

export default TaskList;
