import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("renders HomeClear branding on marketing variant", () => {
    render(<Header variant="marketing" />);
    expect(screen.getByText("HomeClear")).toBeInTheDocument();
  });

  it("shows Log in and Sign up links on marketing variant", () => {
    render(<Header variant="marketing" />);
    expect(screen.getByRole("link", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
  });

  it("shows back link on property variant", () => {
    render(<Header variant="property" user="test@example.com" />);
    expect(screen.getByRole("link", { name: /back to dashboard/i })).toBeInTheDocument();
  });

  it("shows user email and log out when user is provided", () => {
    render(<Header variant="dashboard" user="test@example.com" />);
    const userMenuButton = screen.getByRole("button", { name: /user menu/i });
    userMenuButton.click();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });
});
