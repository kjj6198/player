import styled from 'styled-components';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import DraggableBar from './DraggableBar';
import Duration from './Duration';
import PlayerControls from './PlayerControls';
import useHotKey from '../hooks/useHotkey';

const PlayerCore = styled.audio.attrs(props => ({
  controls: true,
}))`
  appearance: none;
  visibility: hidden;
  width: 0;
  height: 0;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: rgba(125, 125, 125, 0.4);
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  ${ProgressContainer} {
    flex: 4;
  }
`;

type Props = {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onPrevClick?: () => void;
  onNextClick?: () => void;
};

type PlayerState = {
  currentTime: number;
  duration: number;
  src: string;
};

const Player: React.FC<Props> = ({
  onEnded,
  onNextClick,
  onPrevClick,
  src,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const skipTime = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<PlayerState | null>({
    currentTime: 0,
    duration: 0,
    src: null,
  });

  const onCentralClick = useCallback(
    () => (isPlaying ? audioRef.current.pause() : audioRef.current.play()),
    [isPlaying, audioRef]
  );

  const handlePlaybackRate = useCallback(
    (value: number) => () => (audioRef.current.playbackRate = value),
    [audioRef]
  );

  useEffect(() => {
    if (skipTime.current && skipTime.current !== 0) {
      audioRef.current.currentTime = skipTime.current;
    }
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, src]);

  useHotKey(
    {
      '32': onCentralClick,
      '78': onNextClick,
      '80': onPrevClick,
    },
    [onCentralClick, onNextClick, onPrevClick]
  );

  const handleSetCurrent = useCallback((current: number) => {
    audioRef.current.currentTime = Math.floor(
      current * audioRef.current.duration
    );
    setPlayerState({
      duration: audioRef.current.duration,
      currentTime: audioRef.current.currentTime,
      src: audioRef.current.src,
    });
  }, []);

  return (
    <>
      <Wrapper>
        <Duration duration={audioRef.current && audioRef.current.currentTime} />
        <ProgressContainer>
          <DraggableBar
            current={playerState.currentTime / playerState.duration}
            setCurrent={handleSetCurrent}
          />
        </ProgressContainer>
        <Duration duration={playerState.duration} />
      </Wrapper>
      <PlayerControls
        audioRef={audioRef}
        isPlaying={isPlaying}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        onCentralClick={onCentralClick}
      />
      <button onClick={handlePlaybackRate(0.5)}>0.5倍速</button>
      <button onClick={handlePlaybackRate(1)}>1倍速</button>
      <button onClick={handlePlaybackRate(2)}>2倍速</button>
      <button onClick={handlePlaybackRate(1.25)}>1.25倍速</button>
      <button onClick={handlePlaybackRate(1.5)}>1.5倍速</button>
      <button onClick={handlePlaybackRate(1.75)}>1.75倍速</button>

      <button onClick={() => (skipTime.current = 3)}>跳過 3 秒</button>
      <button onClick={() => (skipTime.current = 5)}>跳過 5 秒</button>
      <button onClick={() => (skipTime.current = 10)}>跳過 10 秒</button>
      <button onClick={() => (skipTime.current = 15)}>跳過 15 秒</button>
      <button onClick={() => (skipTime.current = 20)}>跳過 20 秒</button>
      <PlayerCore
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={onEnded}
        onTimeUpdate={() => {
          setPlayerState({
            ...playerState,
            currentTime: audioRef.current && audioRef.current.currentTime,
          });
        }}
        onLoadedMetadata={e => {
          const { currentTarget } = e;
          setPlayerState({
            duration: currentTarget.duration,
            currentTime: currentTarget.currentTime,
            src: currentTarget.currentSrc,
          });
        }}
        ref={audioRef}
        src={src}
      />
    </>
  );
};

export default Player;
