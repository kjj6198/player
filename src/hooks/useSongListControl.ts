import { useContext, useCallback } from 'react';
import { AppContext } from '../context/AppContext';

export default function useSongListControl() {
  const { state, setContext } = useContext(AppContext);
  const handleSongListOperation = useCallback(
    (btnId: 'next' | 'prev') => {
      return () => {
        const idx = Array.from(state.songs).findIndex(
          song => song.name === state.current.name
        );
        if (btnId === 'next') {
          if (idx === state.songs.length - 1) {
            setContext({
              current: state.songs[0],
            });
          } else {
            setContext({
              current: state.songs[idx + 1],
            });
          }
        } else if (btnId === 'prev') {
          if (idx === 0) {
            setContext({
              current: Array.from(state.songs).slice(-1)[0],
            });
          } else {
            setContext({
              current: Array.from(state.songs)[idx - 1],
            });
          }
        }
      };
    },
    [setContext, state]
  );

  return handleSongListOperation;
}
