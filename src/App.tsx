import React from 'react';
import Provider from './context/AppContext';
import SideNav from './components/SideNav';
import MainLayout from './components/MainLayout';
import SongList from './components/SongList';

const App: React.FC = () => {
  return (
    <Provider>
      <div className="App">
        <SideNav>
          <SongList />
        </SideNav>
        <MainLayout />
      </div>
    </Provider>
  );
};

export default App;
