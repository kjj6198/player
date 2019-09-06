import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Song from './Song';

const SongList: React.FC = () => {
  const { state, setContext } = useContext(AppContext);

  return (
    <>
      {state.songs &&
        Array.from(state.songs).map(song => (
          <Song
            onClick={() => setContext({ current: song })}
            isActive={state.current && state.current.name === song.name}
            key={song.name}
            name={song.name}
            path={song.name}
            // TODO: drag and drop
            order={1}
          />
        ))}
    </>
  );
};

export default SongList;
