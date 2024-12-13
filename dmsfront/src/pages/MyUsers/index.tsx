import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from 'services/UserService/UserService';
import LoadingCard from '../../components/Loading/LoadingCard';
import UserCard from 'components/User/UserCard';
import { User } from 'interfaces/User';

const mockUsers: User[] = [
  { id: 1, userName: 'johndoe', email: 'john@example.com' },
  { id: 2, userName: 'janesmith', email: 'jane@example.com' },
  { id: 3, userName: 'alicejohnson', email: 'alice@example.com' }
];

const UsersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleUserClick = (userId: number) => {
    navigate(`/users/${userId}/albums`);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="page-container">
      <h1>Users</h1>
      {isLoading ? (
        <div className="grid-container">
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid-container">
          {mockUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user}
              onClick={(userId) => navigate(`/users/${userId}/albums`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default UsersPage;
