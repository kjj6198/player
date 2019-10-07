import styled, { css } from 'styled-components';

type BUTTON_THEME = 'primary' | 'disabled' | 'info' | 'light';

const styles = {
  light: css`
    color: #212529;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
  `,
};

type Props = {
  theme?: BUTTON_THEME;
  status?: 'active' | 'disabled';
};

const Button = styled.button.attrs((props: Props) => ({
  disabled: props.status === 'disabled',
}))<Props>`
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: ${props =>
    props.status === 'active' ? '#138496' : 'transparent'};
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;

  ${props => styles[props.theme] || ''};

  &:disabled {
    opacity: 0.4;
    background-color: #eaeaea;
  }
`;

export const ButtonGroup = styled.div`
  margin: 10px 0;
  ${Button}:not(:last-child) {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

export default Button;
