  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import { BASE_URL } from "@/constant/contant";
import { create } from "lodash";


  export const fetchPlace = createAsyncThunk("place/fetchPlace", async () => {
    try {
      const response = await axios.get(`${BASE_URL}/places/`);
      return response.data;
    } catch (err) {
      console.error("Error fetching places", err);
      throw err;
    }
  });


  export const searchPlace = createAsyncThunk(
    "place/searchPlace",
    async ({ searchTerm, selectedCategories, selectedStates, selectedCities }) => {
      try {
        const query = new URLSearchParams({
          search: searchTerm || "",
          categories: selectedCategories.join(","),
          locations: selectedStates.join(","),
          cities: selectedCities.join(","),
        }).toString();

        const response = await axios.get(`${BASE_URL}/places/search?${query}`);
        return response.data;
      } catch (err) {
        console.error("Error searching places", err);
        throw err;
      }
    }
  );
  export const getPlaceById = createAsyncThunk(
    "place/getPlaceById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/places/${id}`);
        return response.data;
      } catch (err) {
        console.error("Error fetching place details", err);
        return rejectWithValue(err.message);
      }
    }
  );


  export const getNearByPlaces = createAsyncThunk( "place/nearByPlaces",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/places/get/${id}`); 
        return response.data;
      } catch (err) {
        console.error("Error fetching place details", err);
        return rejectWithValue(err.message);
      }
    }
  )

  export const placelistByCityId = createAsyncThunk("place/placelistByCityId", 
       async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/places/getbycityid/${id}`); 
      if(response.data.data.length=== 0){
        return {data:[], message:"no place avaiable"}

      }
      return response.data;
    } catch (err) {
      console.error("Error fetching place details", err);
      return rejectWithValue(err.message);
    }
  }
)
  export const fetchplaceByCategoryId = createAsyncThunk("place/placeByCategoryId ", 
       async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/places/getbycategoryid/${id}`); 
      if(response.data.data.length=== 0){
        return {data:[], message:"no place avaiable"}

      }
      return response.data;
    } catch (err) {
      console.error("Error fetching place details", err);
      return rejectWithValue(err.message);
    }
  }
)

export const SearchAll = createAsyncThunk(
  "place/searchAll",
  async ({ query }, { rejectWithValue }) => {
    console.log("Search Query in Thunk:", query);  

    try {
      const response = await axios.get(`${BASE_URL}/search/search?query=${query}`);
      console.log("response data", response.data);
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);


  const placeSlice = createSlice({
    name: "places",
    initialState: {
      places: [],
      searchedPlaces: [],
      searchAll :[],
      placeDetailsById:[],
      nearByPlaces:[],
      placeListByCityId:[],
      placeByCategoryId:[],
      loading: false,
      error: null,
    },

    extraReducers: (builder) => {
      builder
        .addCase(fetchPlace.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPlace.fulfilled, (state, action) => {
          state.loading = false;
          state.places = action.payload;
        })
        .addCase(fetchPlace.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(getPlaceById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getPlaceById.fulfilled, (state, action) => {
          state.loading = false;
          state.placeDetailsById = action.payload;
        })
        .addCase(getPlaceById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        
        .addCase(searchPlace.pending, (state) => {
          state.loading = true;
        })
        .addCase(searchPlace.fulfilled, (state, action) => {
          state.loading = false;
          state.searchedPlaces = action.payload;
        })
        .addCase(searchPlace.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })



        .addCase(getNearByPlaces.pending, (state) => {
          state.loading = true;
        })
        .addCase(getNearByPlaces.fulfilled, (state, action) => {
          state.loading = false;
          state.nearByPlaces = action.payload;
        })
        .addCase(getNearByPlaces.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(placelistByCityId.pending, (state) => {
          state.loading = true;
        })
        .addCase(placelistByCityId.fulfilled, (state, action) => {
          state.loading = false;
          state. placeListByCityId = action.payload;
        })
        .addCase(placelistByCityId.rejected, (state, action) => {
          state.loading = false;
          // state.error = action.error.message;
          state.err = action.payload || "Something went wrong";

          state.placeListByCityId = {data:[]};
        })

        .addCase(fetchplaceByCategoryId.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchplaceByCategoryId.fulfilled, (state, action) => {
          state.loading = false;
          state. placeByCategoryId = action.payload;
        })
        .addCase(fetchplaceByCategoryId.rejected, (state, action) => {
          state.loading = false;
          
          state.err = action.payload || "Something went wrong";

          state.placeByCategoryId = {data:[]};
        })

        .addCase(SearchAll.pending, (state) => {
          state.loading = true;
        })
        .addCase(SearchAll.fulfilled, (state, action) => {
          state.loading = false;
          state.searchAll = action.payload;
        })
        .addCase(SearchAll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

      },
    })

  export default placeSlice.reducer;
