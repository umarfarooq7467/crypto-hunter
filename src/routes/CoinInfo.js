import {
  CircularProgress,
  Container,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const id=useParams()
  const { currency } = CryptoState();
  const theme = useTheme();
  const fetchHistoricData = async () => {
    if(coin?.id){

      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      console.log(data)
      if(data){

        setHistoricData(data.prices);
      }
    }
  };
console.log(coin)
  useEffect(() => {
    if(coin?.id){

      fetchHistoricData();
    }
  }, [currency, coin, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        sx={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          padding: 15,
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        }}
      >
        {!historicData ? (
          <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [{
                  data: historicData.map((coin) => coin[1]),
                  label: `price ( Past ${days} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                }]
              }}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoinInfo;
