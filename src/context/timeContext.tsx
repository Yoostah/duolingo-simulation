import React, { createContext, ReactNode, useEffect, useState } from 'react';

type TTimeContextProviderProps = {
  children: ReactNode;
};

type TTimeContext = {
  time: number;
  addTime: (min: number) => void;
  resetTimer: () => void;
};

export const TimeContext = createContext({} as TTimeContext);

export function TimeContextProvider(props: TTimeContextProviderProps) {
  const { children } = props;
  const [time, setTime] = useState(0);

  function addTime(minutes: number) {
    console.log(minutes);

    setTime(minutes);
  }

  function resetTimer() {
    setTime(-1);
  }

  function stopTimer() {
    setTime(0);
  }

  function runTimer() {
    setTime((state) => state - 1);
  }

  useEffect(() => {
    const timeControl = setTimeout(() => {
      if (time > 0) {
        console.log(`${time} seconds remaining`);
        runTimer();
      } else {
        console.log('Timer Is Over');
        clearTimeout(timeControl);
        resetTimer();
      }
    }, 1000);

    return () => clearTimeout(timeControl);
  }, [time]);

  return (
    <TimeContext.Provider value={{ time, addTime, resetTimer }}>
      {children}
    </TimeContext.Provider>
  );
}
