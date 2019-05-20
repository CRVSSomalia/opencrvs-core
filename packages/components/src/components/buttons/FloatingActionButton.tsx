import * as React from 'react'

import styled from 'styled-components'
const ButtonStyled = styled.button`
  height: 56px;
  width: 56px;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.shadows.mistyShadow};
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover:enabled {
    ${({ theme }) => theme.gradients.gradientSkyDark};
    color: ${({ theme }) => theme.colors.white};
  }

  &:active:enabled {
    background: ${({ theme }) => theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.focus};
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.placeholder};
  }
`
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: () => React.ReactNode
}

export function FloatingActionButton({ icon, ...otherProps }: IButtonProps) {
  return <ButtonStyled {...otherProps}>{icon && icon()}</ButtonStyled>
}
