import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Detail from "./routers/Detail";
import Home from "./routers/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":coinId" element={<Detail />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
