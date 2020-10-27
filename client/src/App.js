import React, { useEffect, useState } from 'react';
import { CSSReset, ThemeProvider} from "@chakra-ui/core";
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { BaseUrl } from './constants';
import axios from 'axios';
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import AdminCourses from './Components/AdminCourses';

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
            <Route exact path="/admin">
              <AdminCourses></AdminCourses>
            </Route>

          </Switch>
      </BrowserRouter>

    
    </ThemeProvider>
  );
}

export default App;
