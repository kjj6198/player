import React, { useContext } from 'react';
import styled from 'styled-components';
import UploadButton from './UploadButton';
import { AppContext } from '../context/AppContext';
import SongPlayer from './SongPlayer';

const Layout = styled.main`
  width: calc(95% - 250px);
  padding-left: 250px;
  margin: auto;
`;

const MainLayout: React.FC = () => {
  const { state, setContext } = useContext(AppContext);

  return (
    <Layout>
      {state.isFileUploaded ? (
        <SongPlayer audio={state.current} />
      ) : (
        <UploadButton onFilesChanged={(files) => setContext({ songs: files, isFileUploaded: files !== null })} />
      )}
    </Layout>
  );
};

export default MainLayout;
