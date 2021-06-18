import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: 'success' | 'danger' | 'default';
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = 'default',
  ...rest
}) => {
  return (
    <Container type="button" {...rest} color={color}>
      {text}
    </Container>
  );
};

export default Button;
