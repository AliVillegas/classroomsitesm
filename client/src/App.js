import React from 'react';
import { CSSReset, ThemeProvider} from "@chakra-ui/core";
import { RecoilRoot } from 'recoil';
import HomePage from './Components/HomePage';

function App() {

  return (
    <ThemeProvider>
      <CSSReset />

      <RecoilRoot>
        {/* <ErrorBoundary> */}
          <React.Suspense fallback={<div>Loading...</div>}>

            <HomePage></HomePage>

          </React.Suspense>
        {/* </ErrorBoundary> */}
      </RecoilRoot>

    </ThemeProvider>
  );
}

export default App;
