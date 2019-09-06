import React from 'react';
import styled from 'styled-components';

const SongItem = styled.div`
  width: 100%;
  font-size: 13px;
  cursor: pointer;
`;

const Text = styled.span<{ isActive: boolean }>`
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`;

type Props = {
  name: string;
  path: string;
  order: number;
  isActive?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
};

const Song: React.FC<Props> = ({ isActive, name, path, order, onClick }) => {
  return (
    <SongItem onClick={onClick}>
      <Text isActive={isActive}>
        {order}.{name}
      </Text>
    </SongItem>
  );
};

export default Song;
