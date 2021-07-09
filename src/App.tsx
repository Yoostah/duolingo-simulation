import React from 'react';

import ChooseWord from './pages/ChooseWord';

import { TimeContextProvider } from './context/timeContext';

const App: React.FC = () => {
  return (
    <div className="container">
      <TimeContextProvider>
        <ChooseWord />
      </TimeContextProvider>
    </div>
  );
};

export default App;
