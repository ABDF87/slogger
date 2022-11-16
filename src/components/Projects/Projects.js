import { useState } from 'react';
import style from './Projects.module.css';
import ProjectItem from './ProjectItem';
import TaskListContainer from '../Tasks/TaskListContainer';

function Projects(props) {
  const {
    projectItems,
    setProjectItem,
    addProject,
    makeActive,
    setTaskListName,
    tasks,
    deleteProjectHandler,
    detailRefreshHandle,
    setDetailName,
    changeProjectName,
    setChangeProjectName,
  
  } = props;

  const [disabledOff, setDisabledOff] = useState(true)

  const reversedProjects = projectItems.slice().reverse();

  const projectUpHandler = (id) => {
    projectItems.map((project) => {
      if (project.projectid === id) {
        let inintEl = projectItems.indexOf(project);
        let cutedEl = projectItems.splice(inintEl, 1)[0];
        cutedEl.isActive = true;
        setTaskListName(cutedEl.projectname)
        setProjectItem([...projectItems, cutedEl]);

      }
    });
  };



  return (
    <div className={style.projectsContainer}>
 
      {disabledOff ? <button className={style.addProjectButton} onClick={addProject}>
        Add project
      </button> : <button className={style.addProjectButtonOff} >
        Add project
      </button>}
      

      <div className={style.projectList}>
        {reversedProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            projectId={project.projectid}
            projectName={project.projectname}
            projectItems={projectItems}
            tasks={tasks}
            setTaskListName={setTaskListName}
            deleteProjectHandler={deleteProjectHandler}
            detailRefreshHandle={detailRefreshHandle}
            setDetailName={setDetailName}
            projectIsActive={project.isActive}
            changeProjectName={changeProjectName}
            setChangeProjectName={setChangeProjectName}
            isNewProject={project.isNewProject}
            projectUpHandler={projectUpHandler}
            disabledOff = {disabledOff}
            setDisabledOff = {setDisabledOff}
           
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
