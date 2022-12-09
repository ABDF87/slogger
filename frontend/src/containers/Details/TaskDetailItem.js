import style from './TaskDetailItem.module.css';
import DetailTextEditor from './DetailTextEditor';

function TaskDetailItem({
  taskIdActive,
  projectIdActive,
  detailName,
  timeTask,
  detail,
}) {
  return (
    <div className={style.TaskDetailItem} id={taskIdActive}>
      <h1 className={style.detailTitle}>{detailName} </h1>

      <div className={style.timeTask}>created: {timeTask}</div>

      <div className={style.notesDetails}>
        <DetailTextEditor
          taskIdActive={taskIdActive}
          projectIdActive={projectIdActive}
          detail={detail}
          detailName={detailName}
        />
      </div>
    </div>
  );
}

export default TaskDetailItem;
