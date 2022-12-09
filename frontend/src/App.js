import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Workspace from './containers/workplace/Workspace';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import Unauthorized from './components/Auth/Unauthorized';
import OpeningWindow from './containers/opening/OpeningWindow';
import Missing from './components/Auth/Missing';
import Layout from './routs/Layout';
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
