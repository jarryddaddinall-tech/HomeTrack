import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(
      <EmptyState
        icon={<span data-testid="icon">Icon</span>}
        title="No properties yet"
        description="Add your first property to get started"
        variant="selling"
      />
    );
    expect(screen.getByText("No properties yet")).toBeInTheDocument();
    expect(screen.getByText("Add your first property to get started")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(
      <EmptyState
        icon={<span data-testid="icon">Icon</span>}
        title="Title"
        description="Description"
        variant="buying"
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
