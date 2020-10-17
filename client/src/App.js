import React from 'react';
import { CSSReset, ThemeProvider} from "@chakra-ui/core";
import { RecoilRoot } from 'recoil';
import HomePage from './Components/HomePage';

function App() {

  return (
    <ThemeProvider>
      <CSSReset />

      <RecoilRoot>
        <HomePage></HomePage>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
