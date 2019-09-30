import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Song from './Song';

const SongList: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      {state.songs.map(song => (
        <Song key={song.name} name={song.name} path={song.name} order={1} />
      ))}
    </>
  );
};

export default SongList;
