import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./slice/PlaceSlice";
import locationReducer from "./slice/locationSlice";
import categoryReducer from "./slice/categorySlice";
import transportReducer from "./slice/transportSlice"
import locationTransportReducer from "./slice/locationTransportSlice";

const store = configureStore({
    reducer:{
       places : placeReducer,
       locations : locationReducer,
       categories : categoryReducer,
       transport : transportReducer,
       locationTransport : locationTransportReducer
}
})

export default store;