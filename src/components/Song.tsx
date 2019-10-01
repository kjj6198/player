import React from 'react';
import styled from 'styled-components';

const SongItem = styled.div`
  width: 100%;
  font-size: 13px;
  cursor: pointer;
`;

type Props = {
  name: string;
  path: string;
  order: number;
  onClick?: (e: React.SyntheticEvent) => void;
};

const Song: React.FC<Props> = ({ name, path, order, onClick }) => {
  return (
    <SongItem onClick={onClick}>
      <span>
        {order}.{name}
      </span>
    </SongItem>
  );
};

export default Song;
