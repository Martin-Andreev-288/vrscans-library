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
        items: [],
        createdAt: new Date().toISOString()
      };

      state.push(newCollection);
      saveCollectionsToLocalStorage(state);
      toast.success("Collection created", { autoClose: 2000 });
    },
    removeCollection: (state, action: PayloadAction<string>) => {
      const collectionTitle = action.payload;
      const updatedState = state.filter((collection) => collection.title !== action.payload);
      saveCollectionsToLocalStorage(updatedState);
      toast.success(`Collection "${collectionTitle}" removed`, { autoClose: 2000 });
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
    },
    removeItemFromCollection: (
      state,
      action: PayloadAction<{ collectionTitle: string; itemId: number }>
    ) => {
      const { collectionTitle, itemId } = action.payload;
      const collection = state.find((col) => col.title === collectionTitle);
      if (collection) {
        collection.items = collection.items.filter((item) => item.id !== itemId);
        toast.success(`Item removed from collection "${collectionTitle}"`, { autoClose: 2000 });
        saveCollectionsToLocalStorage(state);
      }
    }
  }
});

export const { addCollection, removeCollection, addItemToCollection, removeItemFromCollection } =
  collectionsSlice.actions;

export default collectionsSlice.reducer;

/**
* DISCLAIMER:
This feature uses localStorage for data persistence instead of a backend service.
Originally, the project was intended to use a JSON Server for managing collections and favorites,
but due to limitations and issues with JSON Server paths/URLs discovered late in the development process,
we chose to handle "collections" and "favorites" data entirely on the client side.
*/
