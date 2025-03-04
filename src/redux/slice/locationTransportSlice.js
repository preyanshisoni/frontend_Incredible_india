import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/constant/contant";

export const fetchLocationTransport = createAsyncThunk(
  "transport/fetchLocationTransport",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/locationtransport/${id}`);
      console.log("response",response.data.data);

      
      if (response.data.data.length === 0) {
        return { data: [], message: "No transport available" };
      }

      return response.data;
    } catch (err) {
      console.error("Error fetching transport:", err);
      return rejectWithValue("Failed to fetch transport data");
    }
  }
);

const locationTransport = createSlice({
  name: "locationTransport",
  initialState: {
    locationTransport: [],
    loading: false,
    err: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationTransport.pending, (state) => {
        state.loading = true;
        state.err = null;
        
      })
      .addCase(fetchLocationTransport.fulfilled, (state, action) => {
        state.loading = false;
        state.locationTransport = action.payload;
      })
      .addCase(fetchLocationTransport.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        // state.err = action.payload || "Something went wrong";

        state.locationTransport = { data: [] };
      });
  },
});

export default locationTransport.reducer;
