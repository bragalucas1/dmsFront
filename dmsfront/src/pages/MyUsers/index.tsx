import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "services/UserService/UserService";
import LoadingCard from "../../components/Loading/LoadingCard";
import UserCard from "components/User/UserCard";
import { User } from "interfaces/User";
import "./style.css";

const UsersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // Number of users to display initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", email: "" });
  const [formErrors, setFormErrors] = useState<{
    id?: string;
    name?: string;
    email?: string;
  }>({});

  const navigate = useNavigate();

  const handleUserClick = (userId: number) => {
    navigate(`/users/${userId}/albums`);
  };

  const validateForm = () => {
    const errors: { id?: string; name?: string; email?: string } = {};
    if (!newUser.id) errors.id = "ID is required.";
    if (!newUser.name) errors.name = "Name is required.";
    if (!newUser.email) errors.email = "Email is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddUser = () => {
    if (!validateForm()) return;

    const hasOwner = users.some((user) => user.isOwner);
    const updatedUser = { ...newUser, isOwner: !hasOwner };
    const updatedUsers = [...users, updatedUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsModalOpen(false);
    setNewUser({ id: 0, name: "", email: "" });
    setFormErrors({});

    window.location.reload();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewUser({ id: 0, name: "", email: "" });
    setFormErrors({});
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          const fetchedUsers = await getUsers();
          setUsers(fetchedUsers);
          localStorage.setItem("users", JSON.stringify(fetchedUsers));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <div className="header-container">
        <h1>Users</h1>
        <div className="actions-container">
          <button
            onClick={() => setIsModalOpen(true)}
            className="add-user-button"
          >
            Add User
          </button>
          <div className="tooltip-container">
            ❓
            <div className="tooltip-text">
              How it works: the first user you add will be the owner of the
              "app". He will controll all other users added. The users wich are
              already on the UsersPage when you open for the first time are
              consumed from the api. The users you create, will be storaged in
              the local storage. Also, the menu 'My Albums' only will be
              avaliable when you add some photo an album.
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid-container">
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid-container">
          {users.slice(0, visibleCount).map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleUserClick(user.id)}
            />
          ))}
        </div>
      )}
      {!isLoading && visibleCount < users.length && (
        <div className="button-container">
          <button onClick={handleShowMore} className="show-more-button">
            Show More
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
            >
              <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input
                  type="text"
                  id="id"
                  value={newUser.id || ""} // O campo começa vazio
                  placeholder="E.g., 1, 2, 3..."
                  onChange={(e) =>
                    setNewUser({ ...newUser, id: Number(e.target.value) || 0 })
                  }
                  className="input-id"
                />
                {formErrors.id && (
                  <span className="error-message">{formErrors.id}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="input-name"
                />
                {formErrors.name && (
                  <span className="error-message">{formErrors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="E.g., example@example.com"
                  className="input-email"
                />
                {formErrors.email && (
                  <span className="error-message">{formErrors.email}</span>
                )}
              </div>
              <div className="modal-buttons">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
