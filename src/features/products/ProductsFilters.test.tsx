import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi, beforeEach } from "vitest";
import ProductsFilters from "./ProductsFilters";
import { useDataContext } from "../../context/DataContext";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";

// Mock dependencies
vi.mock("../../context/DataContext", () => ({
  useDataContext: vi.fn(() => ({
    vrscans: [],
    refreshVrscans: vi.fn(),
    loadMoreVrscans: vi.fn(),
    filterSelection: {
      materials: new Set<number>(),
      colors: new Set<number>(),
      tags: new Set<number>()
    },
    setFilterSelection: vi.fn(),
    isLoading: false,
    error: null,
    hasMore: true
  }))
}));

vi.mock("../../hooks/useFetchFiltersData", () => ({
  useFetchFiltersData: vi.fn(() => ({
    colors: [
      { id: 1, name: "Red", hex: "#ff0000", key: "red", colorable_id: 1 },
      { id: 2, name: "Blue", hex: "#0000ff", key: "blue", colorable_id: 2 }
    ],
    materials: [
      { id: 1, name: "Wood" },
      { id: 2, name: "Metal" }
    ],
    tags: [
      { id: 1, name: "Modern", taggable_id: 1 },
      { id: 2, name: "Classic", taggable_id: 2 }
    ]
  }))
}));

vi.mock("../../components/FilterSection", () => ({
  FilterSection: ({
    title,
    options,
    isOpen,
    onToggle,
    onUpdate
  }: {
    title: string;
    options: Array<{ id: number; name: string }>;
    isOpen: boolean;
    onToggle: () => void;
    onUpdate: (selection: Set<number>) => void;
  }) => (
    <div>
      <button onClick={onToggle}>{title}</button>
      {isOpen && (
        <div>
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                const newSelection = new Set([option.id]);
                onUpdate(newSelection);
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}));

describe("ProductsFilters", () => {
  const mockSetFilterSelection = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDataContext).mockImplementation(() => ({
      vrscans: [],
      refreshVrscans: vi.fn(),
      loadMoreVrscans: vi.fn(),
      filterSelection: {
        materials: new Set(),
        colors: new Set(),
        tags: new Set()
      },
      setFilterSelection: mockSetFilterSelection,
      isLoading: false,
      error: null,
      hasMore: true
    }));
  });

  it("renders all filter sections", () => {
    render(<ProductsFilters />);
    expect(screen.getByText("Materials")).toBeInTheDocument();
    expect(screen.getByText("Colors")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
  });

  it("toggles filter sections when clicked", async () => {
    const user = userEvent.setup();
    render(<ProductsFilters />);

    // Test materials filter
    await user.click(screen.getByText("Materials"));
    expect(screen.getByText("Wood")).toBeInTheDocument();
    expect(screen.getByText("Metal")).toBeInTheDocument();

    // Test colors filter
    await user.click(screen.getByText("Colors"));
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();

    // Test tags filter
    await user.click(screen.getByText("Tags"));
    expect(screen.getByText("Modern")).toBeInTheDocument();
    expect(screen.getByText("Classic")).toBeInTheDocument();
  });

  it("updates filter selection when options are selected", async () => {
    const user = userEvent.setup();
    render(<ProductsFilters />);

    // Open materials filter and select an option
    await user.click(screen.getByText("Materials"));
    await user.click(screen.getByText("Wood"));
    expect(mockSetFilterSelection).toHaveBeenCalledWith({
      materials: new Set([1]),
      colors: new Set(),
      tags: new Set()
    });

    // Open colors filter and select an option
    await user.click(screen.getByText("Colors"));
    await user.click(screen.getByText("Red"));
    expect(mockSetFilterSelection).toHaveBeenCalledWith({
      materials: new Set(),
      colors: new Set([1]),
      tags: new Set()
    });

    // Open tags filter and select an option
    await user.click(screen.getByText("Tags"));
    await user.click(screen.getByText("Modern"));
    expect(mockSetFilterSelection).toHaveBeenCalledWith({
      materials: new Set(),
      colors: new Set(),
      tags: new Set([1])
    });
  });

  it("handles multiple selections in a filter", async () => {
    const user = userEvent.setup();
    render(<ProductsFilters />);

    // Update mock to return materials with full data
    vi.mocked(useFetchFiltersData).mockImplementation(() => ({
      colors: [],
      materials: [
        {
          id: 1,
          name: "Wood",
          created_at: "2016-10-17T10:52:04.123462",
          updated_at: "2016-10-17T10:52:04.123462"
        },
        {
          id: 2,
          name: "Metal",
          created_at: "2016-10-17T10:52:04.123462",
          updated_at: "2016-10-17T10:52:04.123462"
        }
      ],
      tags: [],
      manufacturers: [
        {
          id: 4,
          name: "Kawashima Selkon Textiles Co., Ltd.",
          created_at: "2017-02-15T08:02:01.481279",
          updated_at: "2017-02-15T08:02:01.481279",
          logo_file_name: null,
          logo_content_type: null,
          logo_file_size: null,
          logo_updated_at: null,
          website: null
        },
        {
          id: 3,
          name: "Tanazawa Hakkosha Co., Ltd",
          created_at: "2016-10-18T10:52:08.161946",
          updated_at: "2016-10-18T10:52:08.161946",
          logo_file_name: null,
          logo_content_type: null,
          logo_file_size: null,
          logo_updated_at: null,
          website: null
        }
      ],
      industries: [
        {
          id: 3,
          name: "Product Design",
          vrscan_id: 1700
        },
        {
          id: 4,
          name: "Aerospace",
          vrscan_id: 1699
        }
      ]
    }));

    // Open materials filter and select two options
    await user.click(screen.getByText("Materials"));
    await user.click(screen.getByText("Wood"));
    await user.click(screen.getByText("Metal"));

    expect(mockSetFilterSelection).toHaveBeenCalledWith({
      materials: new Set([1, 2]),
      colors: new Set(),
      tags: new Set()
    });
  });
});
