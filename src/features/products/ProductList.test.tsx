import { render, screen, waitFor } from "@testing-library/react";
import { useDataContext } from "../../context/DataContext";
import { describe, expect, vi, beforeEach } from "vitest";
import ProductList from "./ProductList";

// Mock dependencies
vi.mock("../../context/DataContext", () => ({
  useDataContext: vi.fn(() => ({
    vrscans: [],
    loadMoreVrscans: vi.fn(),
    hasMore: false,
    isLoading: false,
    refreshVrscans: vi.fn(),
    filterSelection: {
      materials: new Set<number>(),
      colors: new Set<number>(),
      tags: new Set<number>()
    },
    setFilterSelection: vi.fn(),
    error: null
  }))
}));

vi.mock("../../hooks/useFetchFiltersData", () => ({
  useFetchFiltersData: vi.fn(() => ({
    colors: [{ id: 1, hex: "#ff0000", key: "red", name: "Red", colorable_id: 1 }],
    industries: [{ id: 1, name: "Furniture", vrscan_id: 1 }],
    manufacturers: [{ id: 1, name: "ACME Corp" }],
    materials: [{ id: 1, name: "Wood" }],
    tags: [{ id: 1, name: "Modern", taggable_id: 1 }]
  }))
}));

vi.mock("./ProductCard", () => ({
  default: ({ name }: { name: string }) => <div>{name}</div>
}));

describe("ProductList", () => {
  const mockVrscans = [
    {
      id: 1,
      name: "Test Product",
      thumb: "test.jpg",
      fileName: "test-file",
      materialTypeId: 1,
      manufacturerId: 1,
      industries: [1],
      colors: [1],
      tags: [1],
      materialFileSize: 1024,
      createdAt: "2023-01-01"
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows empty state when no vrscans", () => {
    render(<ProductList />);
    expect(screen.getByText(/No VRScans match your filter/i)).toBeInTheDocument();
  });

  it("displays product cards when vrscans exist", () => {
    vi.mocked(useDataContext).mockImplementation(() => ({
      vrscans: mockVrscans,
      loadMoreVrscans: vi.fn(),
      hasMore: false,
      isLoading: false,
      refreshVrscans: vi.fn(),
      filterSelection: {
        materials: new Set<number>(),
        colors: new Set<number>(),
        tags: new Set<number>()
      },
      setFilterSelection: vi.fn(),
      error: null
    }));

    render(<ProductList />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("triggers loadMoreVrscans when scrolling near bottom", async () => {
    const mockLoadMore = vi.fn();
    vi.mocked(useDataContext).mockImplementation(() => ({
      vrscans: mockVrscans,
      loadMoreVrscans: mockLoadMore,
      hasMore: true,
      isLoading: false,
      refreshVrscans: vi.fn(),
      filterSelection: {
        materials: new Set<number>(),
        colors: new Set<number>(),
        tags: new Set<number>()
      },
      setFilterSelection: vi.fn(),
      error: null
    }));

    render(<ProductList />);

    Object.defineProperty(document.documentElement, "scrollHeight", { value: 1000 });
    Object.defineProperty(document.documentElement, "scrollTop", { value: 500 });
    Object.defineProperty(document.documentElement, "clientHeight", { value: 500 });

    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      expect(mockLoadMore).toHaveBeenCalled();
    });
  });

  it("doesn't trigger loadMoreVrscans when loading", () => {
    const mockLoadMore = vi.fn();
    vi.mocked(useDataContext).mockImplementation(() => ({
      vrscans: mockVrscans,
      loadMoreVrscans: mockLoadMore,
      hasMore: true,
      isLoading: true,
      refreshVrscans: vi.fn(),
      filterSelection: {
        materials: new Set<number>(),
        colors: new Set<number>(),
        tags: new Set<number>()
      },
      setFilterSelection: vi.fn(),
      error: null
    }));

    render(<ProductList />);
    window.dispatchEvent(new Event("scroll"));
    expect(mockLoadMore).not.toHaveBeenCalled();
  });
});
