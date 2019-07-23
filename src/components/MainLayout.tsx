import React, { useContext } from 'react';
import styled from 'styled-components';
import UploadButton from './UploadButton';
import { AppContext } from '../context/AppContext';
import SongPlayer from './SongPlayer';
import useSongListControl from '../hooks/useSongListControl';

const Layout = styled.main`
  width: calc(95% - 250px);
  height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 250px;
  margin: auto;
`;

const MainLayout: React.FC = () => {
  const { state, setContext } = useContext(AppContext);
  const handleSongListOperation = useSongListControl();

  return (
    <Layout>
      {state.isFileUploaded ? (
        <SongPlayer
          audio={state.current}
          name={state.current && state.current.name}
          onNextClick={handleSongListOperation('next')}
          onPrevClick={handleSongListOperation('prev')}
        />
      ) : (
        <UploadButton onFilesChanged={(files) => setContext({ songs: files, isFileUploaded: files !== null })} />
      )}
    </Layout>
  );
};

export default MainLayout;
