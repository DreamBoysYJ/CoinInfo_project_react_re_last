import { useEffect, useState } from "react";
import styled from "styled-components";
import Detail from "./Detail";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 20px 30px;
  width: 100%;
`;

const Header = styled.header`
  color: #1ed0c7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-bottom: 100px;

  h1 {
    font-weight: 700;
    font-size: 50px;
  }
`;

const Main = styled.div`
  display: grid;
  height: 90vh;
  grid-template-columns: 3fr 7fr;
  grid-template-rows: 90vh 90vh;
  column-gap: 20px;
`;

const Coins = styled.div`
  background-color: transparent;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 25px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;

    box-shadow: inset 0px 0px 5px white;
  }
`;

const Coin = styled.div`
  background-color: #125ea1;
  padding: 10px;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  border: 1px solid rgba(0, 0, 0, 0.3);

  img {
    height: 40px;
    margin-right: 20px;
  }

  &:hover {
    color: ${(props) => props.theme.accentColor};
    background-color: #062a49;
  }
`;

const Footer = styled.footer`
  height: 50px;
  display: flex;
  align-items: flex-end;

  span {
    margin-left: 50px;
    font-weight: 500;
    font-size: 20px;
  }
`;

interface ICoin {
  id: string;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

function Home() {
  const [coins, setCoins] = useState<ICoin[]>([]);

  const getCoins = async () => {
    const json = await (
      await fetch(`https://api.coinpaprika.com/v1/coins`)
    ).json();
    setCoins(json);
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Dream Coin</title>
      </Helmet>
      <Header>
        <h1>DREAM COIN</h1>
      </Header>
      <Main>
        <Coins>
          {coins?.map((coin: ICoin) => (
            <Link to={`/${coin.id}`}>
              <Coin key={coin.rank}>
                {(
                  <img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin?.symbol.toLowerCase()}`}
                  />
                ) || null}
                <span>
                  {coin.name} ({coin.symbol})
                </span>
              </Coin>
            </Link>
          ))}
        </Coins>
        <Detail />
      </Main>
      <Footer>
        <span>All Copy Rights from DREAM BOYS reserved since 2018</span>
      </Footer>
    </Container>
  );
}

export default Home;
