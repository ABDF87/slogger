import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import loginWindow from './components/Auth/Login.module.css';
import './App.css';
import Workspace from './components/Workspace';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Unauthorized from './components/Auth/Unauthorized';
import OpeningWindow from './components/OpeningWindow';
import Missing from './components/Missing';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/Auth/RequireAuth';
import PersistLogin from './components/Auth/PersistLogin';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150,
};



function App() {

  function Example() {
    useEffect(() => {
      document.title = 'Slogger';
    }, []);
  }
  Example()
  
  return (
    <>
    <title>Slogger</title>
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* puplic routes */}
        <Route index element={<OpeningWindow />} />
        <Route path='registration' element={<Registration />} />
        <Route path='login' element={<Login />} />
        <Route path='unauthorized' element={<Unauthorized />} />
       
        
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path='workspace'  element={<Workspace />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
