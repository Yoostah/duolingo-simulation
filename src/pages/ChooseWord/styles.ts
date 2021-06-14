import styled from 'styled-components';
import { colors } from '../../assets/colors';

export const Container = styled.div`
  min-height: 50vh;
  //margin: 30vh 0 20vh;
  background: ${colors.gray};
`;

export const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* flex-direction: column; */
`;
