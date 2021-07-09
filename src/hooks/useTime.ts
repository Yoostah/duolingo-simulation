import { useContext } from 'react';
import { TimeContext } from '../context/timeContext';

export function useTime() {
  const value = useContext(TimeContext);

  return value;
}
