import Button from "../../components/button/Button";
import CreateCollectionModal from "../collections/CreateCollectionModal";
import { MdOutlineAddCircle } from "react-icons/md";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CollectionsSidebar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isCreateCollModalOpen, setCreateCollModalOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSortOptionClick = (option: string) => {
    console.log(`Sorting by: ${option}`);
    setDropdownOpen(false);
  };

  const handleCreateCollModalClose = () => {
    setCreateCollModalOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center gap-6">
        {/* Create Collection Button */}
        <Button type="createCollectionButton" onClick={() => setCreateCollModalOpen(true)}>
          <MdOutlineAddCircle className="mr-2 h-7 w-7" />
          Create Collection
        </Button>

        {/* Sorting Options */}
        <div className="relative">
          <Button type="sortByButton" onClick={toggleDropdown}>
            Sort By <FaChevronDown className="ml-2" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={() => handleSortOptionClick("Newest")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Newest
              </button>
              <button
                onClick={() => handleSortOptionClick("Oldest")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Oldest
              </button>
              <button
                onClick={() => handleSortOptionClick("A-Z")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                A-Z
              </button>
              <button
                onClick={() => handleSortOptionClick("Z-A")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Z-A
              </button>
            </div>
          )}
        </div>
      </div>
      {isCreateCollModalOpen && <CreateCollectionModal onClose={handleCreateCollModalClose} />}
    </>
  );
}
