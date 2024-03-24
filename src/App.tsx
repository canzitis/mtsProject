import React from 'react';
// @ts-ignore
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import AuthPopupSetNewPassword from "./components/Auth/AuthPopupSetNewPassword/AuthPopupSetNewPassword";
import AuthPopupLogin from './components/Auth/AuthPopupLogin/AuthPopupLogin';
import AuthPopupPasswordRecovery from './components/Auth/AuthPopupPasswordRecovery/AuthPopupPasswordRecovery';
import AuthPopupRegistration from "./components/Auth/AuthPopupRegistration/AuthPopupRegistration";

function App() {
  // @ts-ignore
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<AuthPopupLogin/>}/>
        <Route path="/recover-password" element={<AuthPopupPasswordRecovery/>}/>
        <Route path="/new-password" element={<AuthPopupSetNewPassword/>}/>
        <Route path="/register" element={<AuthPopupRegistration/>}/>
      </Routes>
    </Router>

  );
}

export default App;
