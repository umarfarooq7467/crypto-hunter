import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import CryptoContext from "./CryptoContext";
import Root from "./routes/Root";
import 'react-alice-carousel/lib/alice-carousel.css';
// import { createTheme, ThemeProvider, Box } from "@mui/system";
// import { CssBaseline } from "@mui/material";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/coins/:id",
        element: <CoinPage />,
      },
    ],
  },
  {
    path: "/page",
    element: <CoinPage />,
  },
]);
function Main() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <CryptoContext>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </CryptoContext>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Main />
  </>
);
