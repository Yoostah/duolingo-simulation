import styled, { css } from 'styled-components';

interface IWordProps {
  wrongAnswer: boolean;
}
export const Container = styled.div<IWordProps>`
  ${(props) =>
    props.wrongAnswer &&
    css`
      background: red;
    `}
`;
