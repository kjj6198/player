import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';

const PlayerCore = styled.audio.attrs(props => ({
  controls: true,
}))`
  appearance: none;
  visibility: hidden;
  width: 0;
  height: 0;
`;

type Props = {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
};

type PlayerState = {
  audio: HTMLAudioElement | null;
  currentTime: number;
  duration: number;
  src: string;
};

const Player: React.FC<Props> = ({
  onPlay,
  onPause,
  onEnded,
  src
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState | null>();
  
  return <>
    <progress
      value={playerState ? playerState.currentTime : 0}
      max={playerState ? playerState.duration : 0}
    />
    <PlayerCore
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      onTimeUpdate={() => {
        setPlayerState(Object.assign({}, playerState, {
          currentTime: audioRef.current && audioRef.current.currentTime,
        }));
      }}
      onLoadedMetadata={(e) => {
        const { currentTarget } = e;
        setPlayerState({
          audio: audioRef.current,
          duration: currentTarget.duration,
          currentTime: currentTarget.currentTime,
          src: currentTarget.currentSrc,
        });
      }}
      ref={audioRef}
      src={src}
    />
  </>
};

export default Player;