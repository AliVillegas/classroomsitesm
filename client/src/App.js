import React, { useEffect, useState } from 'react';
import { CSSReset, ThemeProvider} from "@chakra-ui/core";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { BaseUrl } from './constants';
import axios from 'axios';
import HomePage from './Components/Pages/HomePage';
import Header from './Components/Widgets/Header';
import AdminCourses from './Components/Pages/AdminCourses';
import AdminUsers from './Components/Pages/AdminUsers';
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
              <CreateClassroom></CreateClassroom>
            </Route>
            <Route exact path="/update_classroom/:id">
              <UpdateClassroom></UpdateClassroom>
            </Route>
            <Route exact path="/admin_users">
              <AdminUsers authenticated={authenticated} user={user}></AdminUsers>
            </Route>
            <Route exact path="/admin_courses">
              <AdminCourses authenticated={authenticated} user={user}></AdminCourses>
            </Route>

          </Switch>
      </BrowserRouter>

    
    </ThemeProvider>
  );
}

export default App;
