import React, { useMemo } from 'react';
import styled from 'styled-components';
import SVG from './SVG';
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';
import next from '../assets/next.svg';
import useHotKey from '../hooks/useHotkey';

const Button = styled.button`
  width: 70px;
  height: 70px;
  appearance: none;
  background-color: transparent;
  outline: none;
  border: 0;
  cursor: pointer;
  padding: 0;
  transition: transform 0.1s linear;
  transform-origin: center center;
  &:active {
    opacity: 0.5;
    transform: scale(0.95);
  }
`;

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  onPrevClick: () => void;
  onNextClick: () => void;
  onCentralClick: () => void;
  isPlaying: boolean;
};

const PlayerControls: React.FC<Props> = ({
  onPrevClick,
  onCentralClick,
  onNextClick,
  isPlaying,
  audioRef,
}) => {
  const hotkeyMap = useMemo(
    () => ({
      '32': onCentralClick, // space
      '78': onNextClick, // n
      '80': onPrevClick, // p
      '37': () => (audioRef.current.currentTime -= 10), // <-
      '39': () => (audioRef.current.currentTime += 10), // ->
    }),
    [onCentralClick, onPrevClick, onNextClick, audioRef]
  );

  useHotKey(hotkeyMap);

  return (
    <div>
      <Button onClick={onPrevClick}>
        <SVG style={{ transform: 'rotate(180deg)' }} src={next} />
      </Button>
      <Button onClick={onCentralClick}>
        <SVG src={isPlaying ? pause : play} />
      </Button>
      <Button onClick={onNextClick}>
        <SVG src={next} />
      </Button>
    </div>
  );
};

export default PlayerControls;
