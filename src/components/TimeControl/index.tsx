import React, { useCallback, useEffect, useState } from 'react';
import { useTime } from '../../hooks/useTime';

import { Container, ProgressBar } from './styles';

interface ITimeControlProps {
  duration: number;
  // timeIsOverFunction: () => void;
  // resetTimer: boolean;
  // stopTimer: boolean;
}

const TimeControl: React.FC<ITimeControlProps> = ({ duration }) => {
  const { time, addTime } = useTime();

  const [progress, setProgress] = useState(time);
  const [stepProgress, setStepProgress] = useState(Number(duration) / 100);

  useEffect(() => {
    if (duration && time === -1) {
      addTime(Number(duration));
    }
  }, [duration]);

  // const timeLeft = useCallback(() => {
  //   const time = Number(duration) - progress;
  //   return time;
  // }, [duration, progress]);

  // useEffect(() => {
  //   if (resetTimer) {
  //     console.log('Timer Started OR Reseted');

  //     setProgress(0);
  //   }
  // }, [resetTimer]);

  // useEffect(() => {
  //   console.log(`+ 1 SEG  -> ${progress}`);
  //   const progressControl = setTimeout(() => {
  //     if (timeLeft()) {
  //       setProgress((state) => state + 1000);
  //     } else {
  //       console.log('Times Is Over');

  //       timeIsOverFunction();
  //     }
  //   }, 1000);

  //   return () => clearTimeout(progressControl);
  // }, [timeIsOverFunction, stopTimer, timeLeft, progress]);

  return (
    <Container>
      <ProgressBar progress={progress / stepProgress}>
        <span>{`${(progress / stepProgress).toFixed(0)}%`}</span>
      </ProgressBar>
    </Container>
  );
};

export default TimeControl;
