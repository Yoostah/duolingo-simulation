import styled from 'styled-components';
import { colors } from '../../assets/colors';

export const Container = styled.div`
  height: 20px;
  width: 100%;
  margin: 50;
  margin: 20px 0;
  text-align: center;

  > span {
    text-transform: uppercase;
    color: ${colors.gray_dark};
    font-weight: bold;
    line-height: 1;
  }
`;
