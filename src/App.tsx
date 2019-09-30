import React from 'react';
import Provider from './context/AppContext';
import SideNav from './components/SideNav';
import SongList from './components/SongList';

const App: React.FC = () => {
  return (
    <Provider>
      <div className="App">
        <SideNav>
          <SongList />
        </SideNav>
        <>
      </div>
    </Provider>
  );
};

export default App;
