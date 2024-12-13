import { User } from '@/interfaces/User';
import React from 'react';

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
      aria-label={`View albums from ${user.userName}`}
    >
      <div className="user-info">
        <h3>{user.userName}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
