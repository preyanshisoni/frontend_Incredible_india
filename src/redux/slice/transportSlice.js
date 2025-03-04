import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/constant/contant";

export const fetchtransport = createAsyncThunk(
  "transport/fetchtransport",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/transport/${id}`);

      
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

const transportSlice = createSlice({
  name: "transport",
  initialState: {
    transport: [],
    loading: false,
    err: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchtransport.pending, (state) => {
        state.loading = true;
        state.err = null;
        
      })
      .addCase(fetchtransport.fulfilled, (state, action) => {
        state.loading = false;
        state.transport = action.payload;
      })
      .addCase(fetchtransport.rejected, (state, action) => {
        state.loading = false;
        // state.err = action.error.message;
        state.err = action.payload || "Something went wrong";

        state.transport = { data: [] };
      });
  },
});

export default transportSlice.reducer;
