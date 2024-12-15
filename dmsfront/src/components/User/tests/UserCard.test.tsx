import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { User } from "@/interfaces/User";
import UserCard from "../UserCard";

describe("UserCard", () => {
  const mockUser: User = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const mockOnClick = jest.fn();

  it("should render user name and email", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it("should call onClick with user ID when clicked", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    fireEvent.click(
      screen.getByRole("button", { name: `View albums from ${mockUser.name}` })
    );

    expect(mockOnClick).toHaveBeenCalledWith(mockUser.id);
  });

  it("should be accessible with keyboard navigation", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    const card = screen.getByRole("button", {
      name: `View albums from ${mockUser.name}`,
    });
    expect(card).toHaveAttribute("tabIndex", "0");

    fireEvent.keyDown(card, { key: "Enter", code: "Enter" });
    expect(mockOnClick).toHaveBeenCalledWith(mockUser.id);
  });

  it("should have correct aria-label for accessibility", () => {
    render(<UserCard user={mockUser} onClick={mockOnClick} />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      `View albums from ${mockUser.name}`
    );
  });
});
