import React, { act } from 'react'; // Corrigido para importar de react
import { render, fireEvent } from '@testing-library/react';
import UserCard from '../UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    userName: 'John Doe',
    email: 'john@example.com',
  };

  it('renders user information correctly', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <UserCard user={mockUser} onClick={handleClick} />
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <UserCard user={mockUser} onClick={handleClick} />
    );

    // Usando o `act` importado do React
    act(() => {
      fireEvent.click(container.firstChild as HTMLElement);
    });

    expect(handleClick).toHaveBeenCalledWith(mockUser.id);
  });
});
