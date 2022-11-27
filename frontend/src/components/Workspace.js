import { useEffect, useState } from 'react';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from '../Api/axios';
import Projects from './Projects/Projects';
import TaskList from './Tasks/TaskList';
import TaskDetails from './Details/TaskDetails';
import Header from './Header/Header';
import styles from './Workspace.module.css';
import useAuth from './hooks/useAuth';

let i = [];

const Workspace = () => {
  const [projectItems, setProjectItem] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const [tasks, setTask] = useState([]);
  const [details, setDetails] = useState([]);
  const [taskListName, setTaskListName] = useState('Here will be your tasks');
  const [detailName, setDetailName] = useState('Here will be your detail');
  const [changeProjectName, setChangeProjectName] = useState(true);

  const { auth } = useAuth();

  let userID = auth?.userID;

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const ADDPROJECT_URL = '/projects';
  const controller = new AbortController();

  useEffect(() => {
    const uploadProjects = async () => {
      try {
        const responseProject = await axiosPrivate.get(`/projects/${userID}`, {
          signal: controller.signal,
        });
        const responseTask = await axiosPrivate.get(`/tasks/${userID}`, {
          signal: controller.signal,
        });
        const responseDetails = await axiosPrivate.get(`/details/${userID}`, {
          signal: controller.signal,
        });

        responseProject.data.map((project) => {
          if (
            responseProject.data[responseProject.data.length - 1].projectid ===
            project.projectid
          ) {
            project.isActive = true;

            responseTask.data.map((task) => {
              if (project.projectid === task.projectid) {
                i.push(task);
                i[i.length - 1].isActive = true;

                // i[0].isActive = true;
              }
              i.map((el) => {
                if (el.taskid === i[i.length - 1].taskid) {
                  el.isActive = true;
                } else el.isActive = false;
              });
            });
          } else {
            project.isActive = false;
          }
        });

        setProjectItem(responseProject.data);
        setTask(responseTask.data);
        setDetails(responseDetails.data);
      } catch (err) {
        console.error(err);
      }
    };
    uploadProjects();
  }, []);

  const addProject = () => {
    let currentDate = new Date();
    let timeProject =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();

    const newProject = {
      userid: userID,
      projectname: '',
      isActive: true,
      isCompleted: false,
      projectid: uuidv4(),
      timeproject: timeProject,
      isNewProject: true,
    };

    setTaskListName(newProject.name);
    setProjectItem([...projectItems, newProject]);
    setTasksList([...tasksList, newProject]);
    setTaskListName(newProject.projectname);

    const createProject = async () => {
      try {
        const response = await axiosPrivate.post('/projects', {
          signal: controller.signal,
          userid: userID,
          projectname: '',
          projectid: newProject.projectid,
          isActive: false,
          timeproject: newProject.timeproject,
        });
      } catch (err) {
        console.error(err);
      }
    };
    createProject();

    // Set active project
    projectItems.map((project) => {
      if (projectItems[projectItems.length - 1] === project.projectid) {
        project.isActive = true;
        project.isNewProject = true;
      } else {
        project.isActive = false;
        project.isNewProject = false;
      }
    });
  };

  const addTask = (text, taskNewName) => {
    //set active id
    let activeProjectId;
    projectItems.map((project) => {
      if (project.isActive === true) {
        activeProjectId = project.projectid;
      }
    });
    let currentDate = new Date();
    let timeTask =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();
    // set new Task
    const newTask = {
      userid: userID,
      taskname: text,
      isActive: true,
      isCritical: false,
      isCompleted: false,
      projectid: activeProjectId,
      timetask: timeTask,
      taskid: uuidv4(),
      taskpost: '',
    };
    setTask([...tasks, newTask]);
    setDetails([...details, newTask]);
    setDetailName(newTask.taskname);

    const createTask = async () => {
      try {
        const response = await axiosPrivate.post('/tasks', {
          signal: controller.signal,
          userid: userID,
          taskname: newTask.taskname,
          taskid: newTask.taskid,
          projectid: newTask.projectid,
          isActive: false,
          isCritical: false,
          taskpost: '',
        });
        const responseDetail = await axiosPrivate.post('/details', {
          signal: controller.signal,
          userid: userID,
          detailname: newTask.taskname,
          taskid: newTask.taskid,
          projectid: newTask.projectid,
          timetask: newTask.timetask,
          taskpost: '',
        });
      } catch (err) {
        console.error(err);
      }
    };
    createTask();

    // assign task as an active

    tasks.map((task) => {
      if (task[tasks.length - 1] && task.projectId === activeProjectId) {
        task.isActive = true;
      } else if (
        !task[tasks.length - 1] &&
        task.projectid === activeProjectId
      ) {
        task.isActive = false;
      }
    });
  };

  const deleteProjectHandler = async (id) => {
    setTask(tasks.filter((task) => task.projectid !== id));

    setProjectItem(projectItems.filter((project) => project.projectid !== id));

    if (projectItems.length <= 2) {
      projectItems[projectItems.length - 1].isActive = true;
    } else if (projectItems.length > 2) {
      projectItems[projectItems.length - 2].isActive = true;
    }

    try {
      const response = await axiosPrivate.delete('/projects', {
        signal: controller.signal,
        data: { projectid: id },
      });
      const responseTask = await axiosPrivate.delete('/tasks/all', {
        signal: controller.signal,
        data: { projectid: id },
      });
      const responseDetail = await axiosPrivate.delete('/details/all', {
        signal: controller.signal,
        data: { projectid: id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTaskHandler = async (id) => {
    setTask(tasks.filter((task) => task.taskid !== id));
    setDetails(details.filter((detail) => detail.taskid !== id));

    if (tasks.length <= 2) {
      tasks[tasks.length - 1].isActive = true;
    } else if (tasks.length > 2) {
      tasks[tasks.length - 2].isActive = true;
    }

    try {
      const request = await axiosPrivate.delete('/tasks', {
        signal: controller.signal,
        data: { taskid: id },
      });
      const requestDetails = await axiosPrivate.delete('/details', {
        signal: controller.signal,
        data: { taskid: id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  // make last el in projectItems and tasks active
  if (projectItems.length === 1) {
    projectItems[0].isActive = true;
  } else if (tasks.length === 1) {
    tasks[0].isActive = true;
  }
  return (
    <>
      <Header />

      <div className={styles.contentBox}>
        <Projects
          projectItems={projectItems}
          setProjectItem={setProjectItem}
          addProject={addProject}
          tasks={tasks}
          setDetailName={setDetailName}
          setTaskListName={setTaskListName}
          deleteProjectHandler={deleteProjectHandler}
          changeProjectName={changeProjectName}
          setChangeProjectName={setChangeProjectName}
        />
        <TaskList
          projectItems={projectItems}
          tasksList={tasksList}
          taskListName={taskListName}
          tasks={tasks}
          setTask={setTask}
          addTask={addTask}
          setDetailName={setDetailName}
          deleteTaskHandler={deleteTaskHandler}
          setProjectItem={setProjectItem}
        />
        <TaskDetails
          details={details}
          tasks={tasks}
          detailName={detailName}
          projectItems={projectItems}

        />
      </div>
    </>
  );
};

export default Workspace;
