import { useLocation } from "react-router-dom";

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

interface CusomizedState {
  price: IPrice;
}

function Price() {
  const location = useLocation();

  const state = location.state as CusomizedState;
  const { price } = state;

  return (
    <h1>{price ? price.quotes.USD.percent_change_24h : "loading..."} 씨발</h1>
  );
}

export default Price;
