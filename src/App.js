import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import loginWindow from './components/Login.module.css';
import './App.css';
import Workspace from './components/Workspace';
import Login from './components/Login';
import Registration from './components/Registration';
import Unauthorized from './components/Unauthorized';
import OpeningWindow from './components/OpeningWindow';
import Missing from './components/Missing';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150,
};

function App() {
  return (
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
  );
}

export default App;
