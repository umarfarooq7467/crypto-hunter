import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Container } from "@mui/system";
import { Outlet, Link } from "react-router-dom";
import "../App.css";
import { CryptoState } from "../CryptoContext";

const Root = () => {
  const { currency, setCurrency } = CryptoState();
  console.log(currency)

  return (
    <Box color="none">
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography
              sx={{
                color: "gold",
                flex: 1,
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "poiter",
                variant: "h5",
              }}
              // onClick={() => history.pushState("/")}
            >
              <Link to={`/`}>Crypto Hunter</Link>
            </Typography>
            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                marginRight: 15,
                borderColor: "white",
                borderWidth: "1px",
                border: "1px solid #fff",
                color: "#fff",
                "&.MuiSelect-select": {
                  border: "1px solid red",
                },
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}> USD </MenuItem>
              <MenuItem value={"PKR"}> PKR </MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          bgcolor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
      {/* // <Box sx={{ height: "40px", background: "red" }}></Box> */}
    </Box>
  );
};

export default Root;
