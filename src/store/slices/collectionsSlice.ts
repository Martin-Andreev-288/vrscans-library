import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollectionState } from "../../utils/types";
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
      const newCollection: CollectionState = {
        title: action.payload,
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
    }
  }
});

export const { addCollection, removeCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
