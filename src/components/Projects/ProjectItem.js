import { AiOutlineEdit } from 'react-icons/ai';
import { BiArrowFromBottom } from 'react-icons/bi';
import { MdOutlineDone } from 'react-icons/md';
import { BiTrashAlt } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { makeProjectActive } from '../util/utils';
import style from './ProjectItem.module.css';

function ProjectItem(props) {
  const {
    key,
    projectItems,
    projectId,
    setTaskListName,
    activeId,
    tasks,
    deleteProjectHandler,
    detailRefreshHandle,
    setDetailName,
    projectIsActive,
    projectName,
    setProjectItem,
    changeProjectName,
    setChangeProjectName,
    isNewProject,
    project,
    projectUpHandler,
    disabledOff,
    setDisabledOff,
  } = props;

  const [newProjectName, setNewProjectName] = useState('New Project');
  const [nameToCompare, setNametoCompare] = useState('');
  const [changeModeOn, setChangeModeOn] = useState(true);
  const [buttonActive, setButtonActive] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const controller = new AbortController();
  const axiosPrivate = useAxiosPrivate();

  if (isNewProject && changeModeOn) {
    setChangeModeOn(false);
    project.isNewProject = false;
  }

  useEffect(() => {
    const actualProject = () => {
      projectItems.map((project) => {
        if (project.isActive) {
          setTaskListName(project.projectname);
        }
      });
    };

    actualProject();
  }, []);

  const setChangeNameMode = (event) => {
    makeProjectActive(projectItems, event);
    if (changeModeOn) {
      setChangeModeOn(false);
    } else {
      setChangeModeOn(true);
    }
  };

  const submitPreventHandler = (event) => {
    event.preventDefault();
  };

  const changeName = async (event, id) => {
    //make project active
    makeProjectActive(projectItems, event);

    // make project is not new
    if (isNewProject) {
      setChangeModeOn(false);
    }
    //diasbled "Add project" button
    if (event.target.value !== '') {
      setDisabledOff(true);
    }

    //prevent two project with the same name
    let i = [];
    let result = event.target.value;
    result = result.trim();

    projectItems.map((project) => {
      if (project.projectname === result) {
        i.push(project);
      }
    });

    if (i.length >= 1) {
      setButtonActive(false);
    } else setButtonActive(true);

    // assign new name for a project
    projectItems.map((project) => {
      if (project.projectid === event.target.id) {
        project.projectname = event.target.value;
        // nameToCompare = project.projectname;
        setNewProjectName(project.projectname);
        setTaskListName(project.projectname);
      }
    });

    // change project name in DB
    try {
      const response = await axiosPrivate.put('/projects', {
        signal: controller.signal,
        projectname: event.target.value,
        projectid: event.target.id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  let i = [];

  const onClickActive = (event) => {
    // makeProjectActive(projectItems, event);
    projectItems.map((project) => {
      if (event.target.id === project.projectid) {
        setTaskListName(project.projectname);
        project.isActive = true;
      } else {
        project.isActive = false;
      }
    });

    tasks.map((task) => {
      if (event.target.id === task.projectid) {
        i.push(task);
      }
    });
    i.map((el) => {
      if (el.taskid === i[i.length - 1].taskid) {
        el.isActive = true;
      } else el.isActive = false;
    });

    tasks.map((task) => {
      if (event.target.id === task.projectId && task.isActive === true) {
        setDetailName(task.name);
      }
    });
  };

  if (projectName === '') {
    setDisabledOff(false);
  }

  const deleteProject = (event) => {
    projectItems.map((project) => {
      if (event.target.id === project.projectid) {
        setNewProjectName('');
        deleteProjectHandler(project.projectid);
      }
    });
    setShowWarning(false);
    setDisabledOff(true);
  };

  return (
    <div className={style.projectItem}>
      {changeModeOn && projectItems.length > 0 ? (
        <>
          {!showWarning ? (
            <div onClick={onClickActive}>
              <button
                // className={style.projectButton}
                className={
                  projectIsActive
                    ? style.projectNameItemActive
                    : style.projectNameItem
                }
                id={projectId}
                onClick={onClickActive}
              >
                {projectName}

                <div className={style.actionBox}>
                  <AiOutlineEdit
                    className={style.changeProjectNameButton}
                    title='edit name'
                    onClick={setChangeNameMode}
                    id={projectId}
                  />
                  <BiTrashAlt
                    className={style.deliteProjectButton}
                    onClick={() => {
                      setShowWarning(true);
                      setDisabledOff(false);
                    }}
                    id={projectId}
                  />
                  <BiArrowFromBottom
                    className={style.ProjectDoneButton}
                    onClick={() => {
                      projectUpHandler(projectId);
                    }}
                  />
                </div>
              </button>
            </div>
          ) : (
            <div className={style.deleteContainer}>
              <p>Delete project?</p>
              <button id={projectId} onClick={deleteProject}>
                Yes
              </button>
              <button
                onClick={() => {
                  setShowWarning(false);
                  setDisabledOff(true);
                }}
              >
                No
              </button>
            </div>
          )}
        </>
      ) : (
        <form
          className={style.projectNameItemActive}
          onSubmit={projectName ? setChangeModeOn : submitPreventHandler}
        >
          <>
            <input
              className={style.inputProjectName}
              onChange={changeName}
              id={projectId}
              value={projectName}
              autoFocus
            />

            {buttonActive && projectName ? (
              <button className={style.ProjectNameDoneIcon} id={projectId}>
                Done
              </button>
            ) : (
              <>
                <button
                  className={style.ProjectNameDoneIconDisabled}
                  id={projectId}
                  onClick={submitPreventHandler}
                >
                  Done
                </button>
              </>
            )}
          </>
        </form>
      )}
    </div>
  );
}

export default ProjectItem;
