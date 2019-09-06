import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Player from './Player';

type Props = {
  audio: File | null;
  name: string;
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const PlayerWrapper = styled.div`
  width: 55%;
  max-width: 600px;
  padding: 40px;
  margin: auto;
  box-shadow: 0 1px 4px rgba(26, 26, 26, 0.3);
`;

const SongPlayer: React.FC<Props> = ({
  audio,
  name,
  onNextClick,
  onPrevClick,
}) => {
  const [url, setURL] = useState<string>('');

  useEffect(() => {
    if (audio) {
      const objectURL = URL.createObjectURL(audio);
      setURL(objectURL);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  return audio ? (
    <PlayerWrapper>
      <h2>{name}</h2>
      <Player src={url} onNextClick={onNextClick} onPrevClick={onPrevClick} />
    </PlayerWrapper>
  ) : null;
};

export default SongPlayer;
