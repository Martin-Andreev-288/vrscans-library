import Button from "../../components/button/Button";
import CreateCollectionModal from "../collections/CreateCollectionModal";
import { MdOutlineAddCircle } from "react-icons/md";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { type SortOption } from "../../utils/types";

type CollectionsSidebarProps = {
  setSortBy: (sortBy: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function CollectionsSidebar({
  setSortBy,
  searchQuery,
  setSearchQuery
}: CollectionsSidebarProps) {
  const [isCreateCollModalOpen, setCreateCollModalOpen] = useState(false);

  const handleCreateCollModalClose = () => {
    setCreateCollModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6 pr-4 border-r border-blue-100/30 sticky top-0 h-screen pt-6">
        {/* Search Input */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full p-3 border-2 border-blue-200/50 rounded-xl bg-white/80
              focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100
              placeholder:text-blue-400/60 text-blue-800 shadow-sm transition-all
              backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Content Area */}
        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border-2 border-blue-100/30 flex flex-col gap-6">
          {/* Create Collection Button */}
          <Button type="createCollectionButton" onClick={() => setCreateCollModalOpen(true)}>
            <MdOutlineAddCircle className="mr-2 h-6 w-6 text-white/90" />
            Create Collection
          </Button>

          {/* Sorting Dropdown */}
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 text-blue-800 ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
              <span className="font-medium text-sm">Sort Collections</span>
            </div>
            <div className="relative w-full">
              <select
                className="w-full p-2.5 pr-8 text-sm border-2 border-blue-200/50 rounded-xl
                  focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100
                  bg-white/80 text-blue-800 shadow-sm transition-all appearance-none"
                defaultValue=""
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="">Sort by...</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-blue-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {isCreateCollModalOpen && <CreateCollectionModal onClose={handleCreateCollModalClose} />}
    </>
  );
}
