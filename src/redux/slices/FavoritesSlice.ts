import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IFavorites, PickFile } from '../../types/Redux';

const initialState: IFavorites = {
  favoritesAxios: [],
  favoritesUploads: [],
};

const FavoritesSlice = createSlice({
  initialState,
  name: 'FavoriteSlice',
  reducers: {
    changeFavoritesAxios(state, action: PayloadAction<string>) {
      if (state.favoritesAxios.includes(action.payload)) {
        state.favoritesAxios = state.favoritesAxios.filter(
          (item) => item !== action.payload,
        );
      } else { state.favoritesAxios.push(action.payload); }
    },
    changeFavoritesUploads(state, action: PayloadAction<File>) {
      if (state.favoritesUploads.find(
        (item) => item.name === action.payload.name,
      )) {
        state.favoritesUploads = state.favoritesUploads.filter(
          (item: PickFile) => item.name !== action.payload.name,
        );
      } else {
        state.favoritesUploads.push({
          lastModified: action.payload.lastModified,
          name: action.payload.name,
          size: action.payload.size,
          type: action.payload.type,
          webkitRelativePath: action.payload.webkitRelativePath,
        });
      }
    },
  },
});

export const { changeFavoritesAxios, changeFavoritesUploads } = FavoritesSlice.actions;

export const selectFavorites = (state: { FavoritesSlice: IFavorites }) => state.FavoritesSlice;

export default FavoritesSlice.reducer;
