import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVideo } from "../../server/youtubeApi";

const initialState = {
  loading: false,
  error: null,
  videos: [],
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 12,
  },
  success: false, //успешный запрос
  searchText: "",
};

export const searchVideo = createAsyncThunk(
  "video/search",
  async ({ text, limit = 12, order = "" }, thunkAPI) => {
    try {
      const res = await getVideo(text, limit, order);

      return {
        videos: res.videos,
        pageInfo: res.pageInfo,
        searchText: text,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  selectors: {
    selectVideo: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchVideo.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.videos = action.payload.videos;
        state.pageInfo = action.payload.pageInfo;
        state.searchText = action.payload.searchText;
      })
      .addCase(searchVideo.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectVideo } = videoSlice.selectors;
export default videoSlice.reducer;
