import { User } from '@/interfaces/User';
import React from 'react';
import './styles.css';

interface UserCardProps {
  user: User;
  onClick: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div
      className="user-card"
      onClick={() => onClick(user.id)}
      role="button"
      tabIndex={0}
      aria-label={`View albums from ${user.name}`}
    >
      <div className="user-info">
        <h3 className="user-name">{user.name}</h3>
        <p className="user-email">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
