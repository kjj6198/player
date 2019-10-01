import styled from 'styled-components';

const SideNav = styled.div`
  display: grid;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  width: 250px;
  height: 100%;
  padding: 15px;
  border-right: 1px solid #efefef;
  overflow-y: auto;
`;

export default SideNav;
