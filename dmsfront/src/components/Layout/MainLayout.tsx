import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
