import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Container maxWidth="xl"
      sx={{
        backgroundImage: `URL("./banner2.jpg")`,
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
        justifyContent: "space-around",
      }}
    >
      <Container
      sx={{
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
      }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
            fontFamily: "Montserrat",
          }}
        >
          Crypto Hunter
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "darkgray",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}
        >
          Get all the Info regading your favorite Crypto Currency
        </Typography>
      </Container>
      <Carousel />
    </Container>
  );
};

export default Banner;
