import styled from 'styled-components';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import DraggableBar from './DraggableBar';
import Duration from './Duration';
import PlayerControls from './PlayerControls';
import useHotKey from '../hooks/useHotkey';
import Button, { ButtonGroup } from './Button';

const PlayerCore = styled.audio.attrs(props => ({
  controls: true,
}))`
  appearance: none;
  visibility: hidden;
  width: 0;
  height: 0;
`;

const PlayerControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: rgba(125, 125, 125, 0.4);
`;

const VolumeContainer = styled.div`
  max-width: 150px;
  width: 150px;
  height: 10px;
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
  const [volume, setVolume] = useState(0.7);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(volume, 1);
    }
  }, [volume, audioRef]);

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
            indicatorSize={30}
            current={playerState.currentTime / playerState.duration}
            setCurrent={handleSetCurrent}
          />
        </ProgressContainer>
        <Duration duration={playerState.duration} />
      </Wrapper>
      <PlayerControlWrapper>
        <PlayerControls
          audioRef={audioRef}
          isPlaying={isPlaying}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          onCentralClick={onCentralClick}
        />
      </PlayerControlWrapper>
      <VolumeContainer>
        <DraggableBar
          indicatorSize={15}
          current={volume}
          setCurrent={curr => setVolume(curr)}
        />
      </VolumeContainer>
      <ButtonGroup>
        {[0.5, 1, 1.25, 1.5, 1.75, 2].map(rate => (
          <Button
            key={rate}
            status={skipTime.current === rate ? 'active' : null}
            theme="light"
            onClick={handlePlaybackRate(rate)}
          >
            {rate} 倍速
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        {[3, 5, 10, 15, 20].map(sec => (
          <Button
            key={sec}
            theme="light"
            onClick={() => (skipTime.current = sec)}
          >
            跳過前 {sec} 秒
          </Button>
        ))}
      </ButtonGroup>
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
