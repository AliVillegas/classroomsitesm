import React from 'react';
import { CSSReset, ThemeProvider} from "@chakra-ui/core";
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Header from './Components/Header';

function App() {

  return (
    <ThemeProvider>
      <CSSReset />

      <RecoilRoot>
        <BrowserRouter>
          <React.Suspense fallback={<div>Loading...</div>}>
           <Header></Header>
            <Switch>
              <Route exact path='/'>
                <HomePage></HomePage>
              </Route>
            </Switch>

          </React.Suspense>
        </BrowserRouter>
      </RecoilRoot>

    </ThemeProvider>
  );
}

export default App;
