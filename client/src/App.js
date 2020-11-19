import React, { useEffect, useState } from 'react';
import { CSSReset, ThemeProvider} from "@chakra-ui/core";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { BaseUrl } from './constants';
import axios from 'axios';
import HomePage from './Components/Pages/HomePage';
import Header from './Components/Widgets/Header';

import AdminClasses from './Components/Pages/Courses/AdminClasses';
import FavoriteClasses from './Components/Pages/Courses/FavoriteClasses';
import ClassInfo from './Components/Pages/Courses/ClassInfo'
import CreateClass from './Components/Pages/Courses/CreateClass'
import UpdateClass from './Components/Pages/Courses/UpdateClass';


import AdminUsers from './Components/Pages/UsersManagement/AdminUsers';
import UpdateUserRole from './Components/Pages/UsersManagement/UpdateUserRole';

import AdminClassrooms from './Components/Pages/Classrooms/AdminClassrooms';
import CreateClassroom from './Components/Pages/Classrooms/CreateClassroom';
import UpdateClassroom from './Components/Pages/Classrooms/UpdateClassroom';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(BaseUrl + '/auth/office365/success', { withCredentials: true })
    .then((response) => {
        setUser(response.data.user);
        setAuthenticated(response.data.authenticated);
    }).catch(err => {
        console.log(err)
    })
  })

  const handleLogout = () => {
    setAuthenticated(false);
    setUser(null);
  }

  return (
    <ThemeProvider>
      <CSSReset />
      <BrowserRouter>
          <Header authenticated={authenticated} handleLogout={handleLogout}></Header>
          <Switch>
            <Route exact path="/">
              <HomePage authenticated={authenticated} user={user}></HomePage>
            </Route>
            <Route exact path="/admin_classrooms">
              <AdminClassrooms authenticated={authenticated} user={user}></AdminClassrooms>
            </Route>
            <Route exact path="/create_classroom">
              <CreateClassroom authenticated={authenticated} user={user}></CreateClassroom>
            </Route>
            <Route exact path="/update_classroom/:id">
              <UpdateClassroom authenticated={authenticated} user={user}></UpdateClassroom>
            </Route>
            <Route exact path="/info_class/:id">
              <ClassInfo authenticated={authenticated} user={user}></ClassInfo>
            </Route>
            <Route exact path="/create_class">
              <CreateClass authenticated={authenticated} user={user}></CreateClass>
            </Route>
            <Route exact path="/update_class/:id">
              <UpdateClass authenticated={authenticated} user={user}></UpdateClass>
            </Route>
            <Route exact path="/admin_users">
              <AdminUsers authenticated={authenticated} user={user}></AdminUsers>
            </Route>
            <Route exact path="/update_user/:id">
              <UpdateUserRole authenticated={authenticated} user={user}></UpdateUserRole>
            </Route>
            <Route exact path="/admin_courses">
              <AdminClasses authenticated={authenticated} user={user}></AdminClasses>
            </Route>
            <Route exact path="/fav_courses">
              <FavoriteClasses authenticated={authenticated} user={user}></FavoriteClasses>
            </Route>

          </Switch>
      </BrowserRouter>

    
    </ThemeProvider>
  );
}

export default App;
