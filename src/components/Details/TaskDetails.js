import TaskDetailItem from './TaskDetailItem';
import style from './TaskDetails.module.css';

function TaskDetails(props) {
  const { details, tasks, detailName, projectItems,taskCritical } = props;

  let activeProjectId;
  let activeTaskId;
  projectItems.map((project) => {
    if (project.isActive) {
      activeProjectId = project.projectid;
    } 
    // else console.log('no active tasks for details');
  });

  tasks.map((task) => {
    if (task.isActive && task.projectid === activeProjectId) {
      activeTaskId = task.taskid;
    } 
    // else console.log('no active tasks for details');
  });



  return (
    <div className={style.taskDetailsContainer}>
      {details.map((detail) =>
        detail.taskid === activeTaskId &&
        activeProjectId === detail.projectid && (
          <TaskDetailItem
            key={detail.taskid}
            taskIdActive={detail.taskid}
            projectIdActive={detail.projectid}
            detailName={detailName}
            detail = {detail}
            timeTask = {detail.timetask}
            taskCritical = {taskCritical}
            // detailPost = {detailPost} 
            // setDetailPost = {setDetailPost}
          />
        )
      )}
    </div>
  );
}

export default TaskDetails;
