import React, { useContext } from 'react';
import styled from 'styled-components';
import UploadButton from './UploadButton';
import { AppContext } from '../context/AppContext';
import SongList from './SongList';
import { file } from '@babel/types';

const Layout = styled.main`
  width: calc(95% - 250px);
  margin: auto;
`;

const MainLayout: React.FC = () => {
  const { state, setContext } = useContext(AppContext);

  return (
    <Layout>
      {state.isFileUploaded ? (
        <SongList />
      ) : (
        <UploadButton onFilesChanged={files => setContext({ songs: files })} />
      )}
    </Layout>
  );
};

export default MainLayout;
