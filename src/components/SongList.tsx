import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Song from './Song';


const SongList: React.FC = () => {
  const { state, setContext } = useContext(AppContext);

  return (
    <>
      {state.songs && Array.from(state.songs).map(song => (
        <Song
          onClick={() => setContext({ current: song })}
          key={song.name}
          name={song.name}
          path={song.name}
          order={1}
        />
      ))}
    </>
  );
};

export default SongList;
