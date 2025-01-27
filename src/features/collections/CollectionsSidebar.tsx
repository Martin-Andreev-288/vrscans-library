import Button from "../../components/button/Button";
import CreateCollectionModal from "../collections/CreateCollectionModal";
import { MdOutlineAddCircle } from "react-icons/md";
import { useState } from "react";

export default function CollectionsSidebar() {
  const [isCreateCollModalOpen, setCreateCollModalOpen] = useState(false);

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
      </div>
      {isCreateCollModalOpen && <CreateCollectionModal onClose={handleCreateCollModalClose} />}
    </>
  );
}
