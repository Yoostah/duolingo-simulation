import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
  const [time, setTime] = useState(-1);
  const [isActive, setIsActive] = useState(false);

  console.log('Context Time', time);

  const addTime = useCallback((minutes: number) => {
    setTime(minutes);
    setIsActive(true);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTime(-1);
  }, []);

  function stopTimer() {
    setTime(0);
  }

  function runTimer() {
    setTime((state) => state - 1);
  }

  useEffect(() => {
    let timeControl: NodeJS.Timeout;
    if (time > 0 && isActive) {
      timeControl = setTimeout(() => {
        console.log(`${time} seconds remaining`);
        runTimer();
      }, 1000);
    }

    return () => clearTimeout(timeControl);
  }, [time, isActive]);

  return (
    <TimeContext.Provider value={{ time, addTime, resetTimer }}>
      {children}
    </TimeContext.Provider>
  );
}
