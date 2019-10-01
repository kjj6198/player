import React, { useEffect, useState } from 'react';
import Player from './Player';

type Props = {
  audio: File | null;
};

const SongPlayer: React.FC<Props> = ({
  audio
}) => {
  const [url, setURL] = useState<string>('');

  useEffect(() => {
    if (audio) {
      const objectURL = URL.createObjectURL(audio)
      setURL(objectURL);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [audio]);

  return audio ? <Player src={url}></Player> : null;
}

export default SongPlayer;
