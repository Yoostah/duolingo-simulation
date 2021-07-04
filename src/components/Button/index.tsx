import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'success' | 'danger' | 'default';
  text: string;
}

const Button = (props: ButtonProps) => {
  const { text, color = 'default', ...rest } = props;
  return (
    <Container type="button" {...rest} color={color}>
      {text}
    </Container>
  );
};

export default Button;
