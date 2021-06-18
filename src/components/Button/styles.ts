import styled from 'styled-components';
import { colors } from '../../assets/colors';

interface IButtonProps {
  color: 'success' | 'danger' | 'default';
}

const buttonColor = {
  success: colors.green_dark,
  danger: colors.orange,
  default: colors.gray_dark,
};

export const Container = styled.button<IButtonProps>`
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-color: ${colors.gray};
  padding: 13px 20px;
  border-width: 0 0 4px;
  border-radius: 16px;

  letter-spacing: 0.8px;
  text-transform: uppercase;
  background: ${(props) => buttonColor[props.color]};
  color: ${colors.white};
  margin-left: 15px;
`;
