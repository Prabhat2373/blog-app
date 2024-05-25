// import { configureStore } from "@reduxjs/toolkit";
// import { todosSlice } from "./slices/testSlice";
// import { pokemonApi } from "./rtk/testApi";
// import { profileApi } from "./rtk/profileApi";
// import { postsApi } from "./rtk/postsApi";
// import { userSlice } from "./slices/userSlice";
// import { rtkErrorHandler } from "@/middlewares/rtkErrorHandler";
// import { setupListeners } from "@reduxjs/toolkit/query";

// export const store = configureStore({
//   reducer: {
//     todos: todosSlice.reducer,
//     user: userSlice.reducer,
//     [pokemonApi.reducerPath]: pokemonApi.reducer,
//     // [profileApi.reducerPath]: profileApi.reducer,
//     // [postsApi.reducerPath]: postsApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(rtkErrorHandler)
//       .concat(pokemonApi.middleware),
//   //   .concat(profileApi.middleware)
//   //   .concat(postsApi.middleware),
// });

// setupListeners(store.dispatch);

import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./rtk/testApi";
import userSlice from "./slices/userSlice";
import { profileApi } from "./rtk/profileApi";
import { postsApi } from "./rtk/postsApi";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(postsApi.middleware)
      .concat(profileApi.middleware),
});
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
setupListeners(store.dispatch);
