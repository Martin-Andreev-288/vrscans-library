import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterSection from "./FilterSection";

type FilterOption = {
  id: number;
  name: string;
};

const mockOptions: FilterOption[] = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
  { id: 4, name: "Option 4" },
  { id: 5, name: "Option 5" }
];

describe("FilterSection", () => {
  it("renders title, initial options, and toggle button", () => {
    render(
      <FilterSection
        title="Test Filter"
        options={mockOptions}
        isOpen={false}
        onToggle={vi.fn()}
        onUpdate={vi.fn()}
      />
    );

    expect(screen.getByText("Test Filter")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(4);
    expect(screen.getByRole("button", { name: "View All..." })).toBeInTheDocument();
  });

  it("toggles options and calls onUpdate", () => {
    const onUpdate = vi.fn();
    render(<FilterSection title="Test" options={mockOptions} isOpen={true} onUpdate={onUpdate} />);

    const firstCheckbox = screen.getAllByRole("checkbox")[0];

    // Initial render call
    expect(onUpdate).toHaveBeenCalledWith(new Set());

    // First toggle
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();
    expect(onUpdate).toHaveBeenCalledWith(new Set([1]));

    // Second toggle
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
    expect(onUpdate).toHaveBeenCalledWith(new Set());
  });

  it("calls onToggle when button is clicked", () => {
    const onToggle = vi.fn();
    render(<FilterSection title="Test" options={mockOptions} isOpen={false} onToggle={onToggle} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("displays all options when open", () => {
    render(<FilterSection title="Test" options={mockOptions} isOpen={true} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(mockOptions.length);
  });

  it("displays first 4 options when closed", () => {
    render(<FilterSection title="Test" options={mockOptions} isOpen={false} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(4);
  });

  it("displays all options when closed but fewer than 4", () => {
    const fewOptions = mockOptions.slice(0, 2);
    render(<FilterSection title="Test" options={fewOptions} isOpen={false} />);

    expect(screen.getAllByRole("checkbox")).toHaveLength(fewOptions.length);
  });

  it("handles missing callbacks gracefully", () => {
    render(<FilterSection title="Test" options={mockOptions} isOpen={true} />);

    expect(() => {
      fireEvent.click(screen.getAllByRole("checkbox")[0]);
      fireEvent.click(screen.getByRole("button"));
    }).not.toThrow();
  });

  it("shows correct button text based on open state", () => {
    const { rerender } = render(
      <FilterSection title="Test" options={mockOptions} isOpen={false} />
    );

    expect(screen.getByRole("button")).toHaveTextContent("View All...");

    rerender(<FilterSection title="Test" options={mockOptions} isOpen={true} />);

    expect(screen.getByRole("button")).toHaveTextContent("Show Less");
  });
});
