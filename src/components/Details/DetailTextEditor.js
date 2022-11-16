import { useState, useEffect, useRef } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import styles from './DetailTextEditor.module.css';

const DetailTextEditor = ({
  taskIdActive,
  projectIdActive,
  detail,
  detailName,
}) => {
    
const [detailPost, setDetailPost] = useState('');



  const userRef = useRef();

  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const uploadPost = async () => {
      try {
        const response = await axiosPrivate.get('/details', {
          signal: controller.signal,
          taskid: taskIdActive,
        });
        let result = response.data;

        result.map((el) => {
          if (el.taskid === taskIdActive) {
            setDetailPost(el.taskpost);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    uploadPost();
  }, []);

 

  useEffect(() => {
    const savePost = async () => {
      try {
        const response = await axiosPrivate.put('/details', {
          signal: controller.signal,
          projectid: projectIdActive,
          taskid: taskIdActive,
          taskpost: detailPost,
        });
      } catch (err) {
        console.error(err);
      }
    };
    savePost();
  }, [detailPost]);

  return (
    <>
      <div className={styles.noteWrapper}>
        <label htmlFor='' className={styles.noteTitle}>
         
        </label>
        <textarea
          id={taskIdActive}
          placeholder = 'Notes..'
          type='text'
          className={styles.textarea}
          ref={userRef}
          value={detailPost}
          onChange={(e) => {
            setDetailPost(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default DetailTextEditor;
