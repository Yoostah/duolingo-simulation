import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ChooseWord from './pages/ChooseWord';

import { TimeContextProvider } from './context/timeContext';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <TimeContextProvider>
        <ChooseWord />
      </TimeContextProvider>
    </ChakraProvider>
  );
};

export default App;
