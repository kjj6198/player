import React from 'react';
import styled from 'styled-components';

const SongItem = styled.div`
  width: 100%;
  font-size: 13px;
`;

type Props = {
  name: string;
  path: string;
  order: number;
};

const Song: React.FC<Props> = ({ name, path, order }) => {
  return (
    <SongItem>
      <span>
        {order}.{name}
      </span>
    </SongItem>
  );
};

export default Song;
