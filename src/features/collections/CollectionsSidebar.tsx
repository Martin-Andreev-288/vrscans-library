import Button from "../../components/button/Button";
import CreateCollectionModal from "../collections/CreateCollectionModal";
import { MdOutlineAddCircle } from "react-icons/md";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { type SortOption } from "../../utils/types";

type CollectionsSidebarProps = {
  setSortBy: (sortBy: SortOption) => void;
};

export default function CollectionsSidebar({ setSortBy }: CollectionsSidebarProps) {
  const [isCreateCollModalOpen, setCreateCollModalOpen] = useState(false);

  const handleCreateCollModalClose = () => {
    setCreateCollModalOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center gap-6 min-h-[300px]">
        {/* Create Collection Button */}
        <Button type="createCollectionButton" onClick={() => setCreateCollModalOpen(true)}>
          <MdOutlineAddCircle className="mr-2 h-7 w-7" />
          Create Collection
        </Button>

        {/* Sorting Dropdown */}
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700">Sort Collections</label>
          <div className="relative w-full">
            <select
              className="w-full p-2 pr-8 text-sm border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              defaultValue=""
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="">Sort by...</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <FiChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {isCreateCollModalOpen && <CreateCollectionModal onClose={handleCreateCollModalClose} />}
    </>
  );
}
