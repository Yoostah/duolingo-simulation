import styled, { css } from 'styled-components';
import { colors } from '../../assets/colors';

interface IWordProps {
  wrongAnswer: boolean;
  revealAnswer: boolean;
  selected: boolean;
}
export const Container = styled.div<IWordProps>`
  margin: 10px 12px;

  button {
    //min-width: 150px;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    border-color: ${colors.gray_dark};
    padding: 13px 20px;
    border-width: 0 0 4px;
    border-radius: 16px;

    letter-spacing: 0.8px;
    text-transform: uppercase;
    background: ${colors.white};

    ${(props) =>
      !props.selected &&
      !props.wrongAnswer &&
      props.revealAnswer &&
      css`
        border: 2px solid ${colors.green};
      `}

    ${(props) =>
      props.selected &&
      css`
        background: ${colors.orange};
      `}

    ${(props) =>
      props.selected &&
      props.wrongAnswer &&
      props.revealAnswer &&
      css`
        background: ${colors.red};
      `}
    ${(props) =>
      props.selected &&
      !props.wrongAnswer &&
      props.revealAnswer &&
      css`
        background: ${colors.green};
      `}


    &:hover {
      ${(props) =>
        !props.revealAnswer &&
        css`
          background: ${colors.green_dark};
        `}
    }
  }
`;
