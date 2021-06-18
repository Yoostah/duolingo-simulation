import styled from 'styled-components';
import { colors } from '../../assets/colors';

type TProgressBarProps = {
  progress: number;
};

function getProgressColor(progress: number) {
  if (progress <= 60) return colors.green;
  if (progress <= 90) return colors.orange;
  return colors.red;
}
export const Container = styled.div`
  height: 20px;
  width: 100%;
  background: ${colors.gray_dark};
  border-radius: 10px;
  margin: 50;
  margin: 20px 0;
`;
export const ProgressBar = styled.div<TProgressBarProps>`
  height: 20px;
  width: ${(props) => props.progress}%;
  background: ${(props) => getProgressColor(props.progress)};
  border-radius: inherit;
  text-align: right;
  display: flex;
  align-content: center;
  justify-content: flex-end;

  transition: all 0.5s ease-in-out;
  > span {
    padding-right: 5px;
    color: ${colors.white};
    font-weight: bold;
    line-height: 1;
  }
`;
