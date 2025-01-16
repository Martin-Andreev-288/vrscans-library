import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollectionState, VRScan } from "../../utils/types";
import { toast } from "react-toastify";

const getCollectionsFromLocalStorage = (): CollectionState[] => {
  const collections = localStorage.getItem("collections");
  return collections ? JSON.parse(collections) : [];
};

const saveCollectionsToLocalStorage = (collections: CollectionState[]) => {
  localStorage.setItem("collections", JSON.stringify(collections));
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState: getCollectionsFromLocalStorage(),
  reducers: {
    addCollection: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const newCollection: CollectionState = {
        title,
        items: []
      };

      state.push(newCollection);
      saveCollectionsToLocalStorage(state);
      toast.success("Collection created", { autoClose: 2000 });
    },
    removeCollection: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((collection) => collection.title !== action.payload);
      saveCollectionsToLocalStorage(updatedState);
      toast.success("Collection removed", { autoClose: 2000 });
      return updatedState;
    },
    addItemToCollection: (
      state,
      action: PayloadAction<{ collectionTitle: string; item: VRScan }>
    ) => {
      const { collectionTitle, item } = action.payload;
      const collection = state.find((col) => col.title === collectionTitle);
      if (collection && !collection.items.find((existingItem) => existingItem.id === item.id)) {
        collection.items.push(item);
        saveCollectionsToLocalStorage(state);
      }
      toast.success(`Item added in collection "${collectionTitle}"`, { autoClose: 2000 });
    }
  }
});

export const { addCollection, removeCollection, addItemToCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
