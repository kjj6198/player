import { memo } from 'react';
import styled from 'styled-components';

function leftPad(str: number | string, padLength: number, padstr: string) {
  const rest = padLength - str.toString().length;
  const result = str;
  if (rest < 0) {
    return str;
  }

  return padstr.repeat(rest) + result;
}

function formatDuration(duration: number) {
  const minute = leftPad(Math.floor(duration / 60), 2, '0');
  const second = leftPad(Math.floor(duration % 60), 2, '0');
  return `${minute} : ${second}`;
}

const Duration = styled.span.attrs<{duration: number}>(props => ({
  children: formatDuration(props.duration)
}))<{duration: number}>`
  flex: 1;
  text-align: center;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.5px;
  // prevent number causes jump.
  font-variant-numeric: tabular-nums;
`;

export default memo(Duration);
