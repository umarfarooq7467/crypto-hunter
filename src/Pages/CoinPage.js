import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { useEffect, useState } from "react";
import { SingleCoin } from "../config/api";
import { Container, LinearProgress, Typography, useTheme } from "@mui/material";
import CoinInfo from "../routes/CoinInfo";
import ReactHTMLParser from "react-html-parser";
import numberWithCommas from "../routes/Banner/Carousel";
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const theme = useTheme();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data, 'this data')
    setCoin(data);
  };

  // console.log(coin);

  useEffect(() => {
    if (id) {
      fetchCoin();
    }
  }, [id]);

  // if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Container
      sx={{
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
          
        },
      }}
    >
      <Container
        sx={{
          width: "30%",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 5,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 10 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 5,
            fontFamily: "Montserrat",
          }}
        >
          {" "}
          {coin?.name}{" "}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: "10",
            paddingBottom: "5",
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {ReactHTMLParser(coin?.description.en.split(". ")[0])}.{" "}
        </Typography>
        <Container sx={{
          alignSelf: "start",
          padding: 2,
          paddingTop: 5,
          width: "100%",
          [theme.breakpoints.down("md")] : {
            display: "flex",
            justifyContent: "space-around"
          },
          [theme.breakpoints.down("sm")] : {
            flexDirection: "column",
            alignItems: "center"
          },
          [theme.breakpoints.down("xs")] : {
            alignItems: "start",
          }
        }}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Rank:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {" "}
              {coin?.market_cap_rank}{" "}
            </Typography>
          </span>
        </Container>
        <Container>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}
              {
                coin?.market_data.current_price[currency.toLowerCase()].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              } 
            </Typography>
          </span>
        </Container>
        <Container>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Market Cap: </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}
              {
                coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              M
            </Typography>
          </span>
        </Container>

      </Container>
        <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
