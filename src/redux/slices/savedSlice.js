import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "favorites";

const getSavedSearch = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }
  return JSON.parse(saved); //  [{ email: "dgdgdf@mail.com", requests: [{id:, search:"", ...}] },]
};

const getUsersRequest = (email) => {
  //найти запросы по email
  const favorites = getSavedSearch();
  const userFavorites = favorites.find((item) => item.email === email);
  return userFavorites ? userFavorites.requests : [];
};

const saveNewRequest = (email, newRequest) => {
  // добавляет 1 новый запрос
  const favorites = getSavedSearch();
  const userIndex = favorites.findIndex((item) => item.email === email);
  if (userIndex === -1) {
    favorites.push({ email, requests: [newRequest] });
  } else {
    favorites[userIndex].requests.push(newRequest);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return newRequest;
};

const usersRequest = (email, requests) => {
  // замена запрос при редактировании и удалении
  const favorites = getSavedSearch();
  const userIndex = favorites.findIndex((item) => item.email === email);
  if (userIndex === -1) {
    favorites.push({ email, requests });
  } else {
    favorites[userIndex].requests = requests;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

const initialState = {
  saved: [],
  user: null,
};

const savedSearch = createSlice({
  name: "favorites",
  initialState,
  selectors: {
    selectSavedSearch: (state) => state.saved,
    selectUser: (state) => state.user,
  },
  reducers: {
    setUser: (state, action) => {
      const email = action.payload;
      state.user = email;
      state.saved = getUsersRequest(email);
    },
    addSearch: (state, action) => {
      const newSearch = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      state.saved.push(newSearch);
      saveNewRequest(state.user, newSearch);
    },

    editSearch: (state, action) => {
      const { id, editData } = action.payload;
      const updateSearch = state.saved.find((item) => item.id === id);
      if (updateSearch) {
        Object.assign(updateSearch, editData);
        usersRequest(state.user, state.saved);
      }
    },

    deleteSearch: (state, action) => {
      const id = action.payload;
      state.saved = state.saved.filter((item) => item.id !== id);
      usersRequest(state.user, state.saved);
    },
  },
});

export const { setUser, addSearch, editSearch, deleteSearch } =
  savedSearch.actions;
export const { selectSavedSearch, selectUser } = savedSearch.selectors;
export default savedSearch.reducer;
