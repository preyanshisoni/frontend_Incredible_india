import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "@/constant/contant";

import axios from "axios";

export const fetchLocation = createAsyncThunk("locations/fetchLocation",async ()=>{
    try{
        const response = await axios.get(`${BASE_URL}/locations/`);
        return response.data;
    }catch(err){
        console.log("error in fetching location", err);
    }
})
export const getLocationById = createAsyncThunk(
    "locations/getLocationById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/locations/${id}`);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
 export const getChildLocationsByParentId = createAsyncThunk("locations/getChildLocationById",
  async (id, { rejectWithValue }) => {
try {
  const response = await axios.get(`${BASE_URL}/locations/getchild/${id}`);
   if(response.data.data.length=== 0){
   return {data:[], message:"no locations avaiable"}

 }
 return response.data;
} catch (err) {
 console.error("Error fetching child locations data", err);
 return rejectWithValue(err.message);
}
}
)

const locationSlice = createSlice({
    name:"locations",
    initialState:{
        locations:[],
        getLocationDetailsById:[],
        getChildLocationsById :[],

        loading:false,
        error:null,
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchLocation.pending, (state) => {
            state.loading = true;
            state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
          state.loading = false;
          state.locations = action.payload;
        })
        .addCase(fetchLocation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getLocationById.pending, (state) => {
                  state.loading = true;
                  state.error = null;
        })
        .addCase(getLocationById.fulfilled, (state, action) => {
                  state.loading = false;
                  state.getLocationDetailsById = action.payload;
        })
        .addCase(getLocationById.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload;

        })
        .addCase(getChildLocationsByParentId.pending, (state) => {
                  state.loading = true;
                  state.error = null;
        })
        .addCase(getChildLocationsByParentId.fulfilled, (state, action) => {
                  state.loading = false;
                  state.getChildLocationsById = action.payload;
        })
        .addCase(getChildLocationsByParentId.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.payload || "Something went wrong";
                  state.getChildLocationsById={data:[]};
        })
    },
})

export default locationSlice.reducer;