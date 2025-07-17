// import {StrictMode} from "react";
// import {createRoot} from "react-dom/client";
// import "./index.css";
// import "./App.css";

// import {RouterProvider} from "react-router";
// import {Routes} from "./Routes/Routes.jsx";
// import {AuthProvider} from "./Components/ContextFiles/AuthProvider.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider router={Routes}></RouterProvider>
//     </AuthProvider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import { RouterProvider } from "react-router";
import {Routes} from "./Routes/Routes.jsx";
import { AuthProvider } from "./Components/ContextFiles/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routes} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);