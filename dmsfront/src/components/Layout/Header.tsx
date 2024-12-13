import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const currentUserId = 1;

  return (
    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li>
            <Link to="/" aria-label="View all users">Users</Link>
          </li>
          <li>
            <Link 
              to={`/users/${currentUserId}/albums`}
              aria-label="View my photo albums"
            >
              My Albums
            </Link>
          </li>
          <li>
            <Link 
              to="/upload"
              aria-label="Upload new photo"
            >
              Add Photo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
