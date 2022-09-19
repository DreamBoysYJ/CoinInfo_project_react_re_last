import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Info from "./Info";
import Price from "./Price";
import ApexChart from "apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  background-color: #125ea1;
  border-radius: 20px;
  padding: 40px 50px;
`;

interface ICoin {
  description: string;
  first_data_at: string;
  id: string;
  links: {};
  name: string;
  open_source: true;
  proof_type: string;
  rank: number;
  started_at: string;
  symbol: string;
  type: string;
  whitepaper: { link: string };
}

export interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  quotes: {
    BTC: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: number;
    };
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: number;
    };
  };
}

const Header = styled.header`
  background-color: #0c3c65;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  border: 10px solid transparent;
  border-radius: 10px;

  div {
    display: flex;
    align-items: center;
    img {
      height: 80px;
      margin-right: 20px;
    }
  }
  span {
    font-size: 45px;
    font-weight: 700;
  }
`;

interface PriceProps {
  priceColor?: number;
}

const Overview = styled.div`
  background-color: #0c3c65;
  display: grid;
  height: 100px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 20px;
  justify-items: center;
  align-items: center;
  font-weight: 600;
  margin-bottom: 50px;
  h3 {
    font-size: 26px;
  }

  span {
    font-size: 26px;
  }
`;

const PriceNow = styled.span<PriceProps>`
  font-size: 20px;
`;

const Menu = styled.div`
  background-color: #0c3c65;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  margin-bottom: 30px;

  div {
    font-size: 30px;
    font-weight: 600;
    &:hover {
      color: ${(props) => props.theme.accentColor};
      cursor: pointer;
    }
  }
`;

const CoinPrice = styled.div`
  background-color: #0c3c65;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const CoinInfo = styled.div`
  background-color: #0c3c65;
  display: flex;
  flex-direction: column;
  padding: 15px;

  .description {
    line-height: 1.2;
    font-size: 28px;
  }

  div {
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    row-gap: 20px;

    span:first-child {
      font-size: 26px;
      font-weight: 600;
    }
    span:nth-child(2) {
      font-size: 26px;
      font-weight: 600;
    }

    font-size: 22px;
    font-weight: 600;

    span:last-child {
      &:hover {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Detail() {
  const [clicked, setClicked] = useState(1);
  const { coinId } = useParams();

  const { isLoading: historyLoading, data: historyData } = useQuery<
    IHistorical[]
  >(["ohlcv", coinId], () => fetchCoinHistory(coinId!), {
    staleTime: 10000,
  });

  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPrice>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      staleTime: 10000,
    }
  );

  const { isLoading: infoLoading, data: infoData } = useQuery<ICoin>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const onClick = (index: number) => {
    setClicked(index);
  };

  return (
    <Container>
      <Header>
        <div>
          {(
            <img
              src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
            />
          ) || null}
          <span>{infoData?.name}</span>
        </div>

        <PriceNow priceColor={tickersData?.quotes.USD.percent_change_24h}>
          {tickersData ? `$ ${tickersData.quotes.USD.price.toFixed(2)}` : null}
        </PriceNow>
      </Header>
      <Overview>
        <h3>Rank</h3>
        <h3>Symbol</h3>
        <h3>Launched</h3>
        <span>{infoData?.rank}</span>

        <span>{infoData?.symbol}</span>

        <span>
          {infoData?.started_at ? infoData?.started_at.slice(0, 10) : null}
        </span>
      </Overview>
      <Menu>
        <div onClick={() => onClick(1)}>PRICE</div>

        <div onClick={() => onClick(2)}>INFORMATION</div>
      </Menu>

      {clicked === 1 ? <CoinPrice></CoinPrice> : null}
      {clicked === 2 ? (
        <CoinInfo>
          <span className="description">{infoData?.description}</span>
          <div>
            <span>TYPE</span>
            <span>GO</span>
            <span>{infoData?.proof_type}</span>
            <span>
              <a target="_blank" href={`${infoData?.whitepaper.link}`}>
                White Paper
              </a>
            </span>
          </div>
        </CoinInfo>
      ) : null}
    </Container>
  );
}

export default Detail;
