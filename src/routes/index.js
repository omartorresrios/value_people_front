import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import MainLayout from '../components/MainLayout';
import Landing from '../components/Landing';
import Name from '../components/signup/Name';
import Professions from '../components/signup/Professions';
import GeneralInfo from '../components/signup/GeneralInfo';
// import SignIn from '../views/SignIn';
// import AdminSignIn from '../views/AdminSignIn';
// import AdminDashboard from '../components/AdminDashboard';
// import SignUpPersonalData from '../views/SignUpPersonalData';
// import SignUpCompanyData from '../views/SignUpCompanyData';
// import NotFound from '../components/NotFound';
import '../styles/index.css';

const createRoutes = (props) => {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/registration/name" component={Name}/>
        <Route path="/registration/professions" component={Professions}/>
        <Route path="/registration/general" component={GeneralInfo}/>
      </Switch>
    </BrowserRouter>
  );
};

export default createRoutes;
