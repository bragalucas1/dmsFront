import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "interfaces/User";

const Header: React.FC = () => {
  const [ownerId, setOwnerId] = useState<number | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users: User[] = JSON.parse(storedUsers);
      const owner = users.find((user) => user.isOwner);
      if (owner) {
        setOwnerId(owner.id);
      }
    }
  }, []);

  return (
    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li>
            <Link to="/" aria-label="View all users">
              Users
            </Link>
          </li>
          {ownerId !== null && (
            <li>
              <Link
                to={`/users/${ownerId}/albums`}
                aria-label="View my photo albums"
              >
                My Albums
              </Link>
            </li>
          )}
          <li>
            <Link to="/upload" aria-label="Upload new photo">
              Add Photo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
