import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type VRScan } from "../../utils/types";
import { toast } from "react-toastify";

const getFavsFromLocalSt = (): VRScan[] => {
  const favsInLocalSt = localStorage.getItem("favItems");
  return favsInLocalSt ? JSON.parse(favsInLocalSt) : [];
};

const favsSlice = createSlice({
  name: "favItems",
  initialState: getFavsFromLocalSt(),
  reducers: {
    addToFavs: (state, action: PayloadAction<VRScan>) => {
      const favItem = action.payload;
      state.push(favItem);

      localStorage.setItem("favItems", JSON.stringify(state));
      toast.success("VRScan added to favorites", { autoClose: 2000 });
    },
    removeFromFavs: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((item: VRScan) => item.id !== action.payload);
      localStorage.setItem("favItems", JSON.stringify(updatedState));
      toast.success("VRScan removed from favorites", { autoClose: 2000 });
      return updatedState;
    }
  }
});

export const { addToFavs, removeFromFavs } = favsSlice.actions;

export default favsSlice.reducer;

/**
* DISCLAIMER:
This feature uses localStorage for data persistence instead of a backend service.
Originally, the project was intended to use a JSON Server for managing collections and favorites,
but due to limitations and issues with JSON Server paths/URLs discovered late in the development process,
we chose to handle "collections" and "favorites" data entirely on the client side.
*/
