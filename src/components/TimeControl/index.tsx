import React, { useCallback, useEffect, useState } from 'react';
import { useTime } from '../../hooks/useTime';

import { Container, ProgressBar } from './styles';

interface ITimeControlProps {
  duration: number;
}

const TimeControl: React.FC<ITimeControlProps> = ({ duration }) => {
  const { time, addTime } = useTime();

  const [progress, setProgress] = useState(time);
  const [stepProgress, setStepProgress] = useState(Number(duration) / 100);

  useEffect(() => {
    if (duration && time === -1) {
      addTime(Number(duration));
    }
  }, [duration, time, addTime]);

  useEffect(() => {
    if (time !== -1) {
      setProgress(time);
    }
  }, [time]);

  return (
    <Container>
      <ProgressBar progress={progress / stepProgress}>
        <span>{`${(progress / stepProgress).toFixed(0)}%`}</span>
      </ProgressBar>
    </Container>
  );
};

export default TimeControl;
