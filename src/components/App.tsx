import { FC, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";

const PoolList = lazy(() => import("./PoolList"));
const Rank = lazy(() => import("./Rank"));
const MatchSheetsPage = lazy(() => import("./MatchSheets"));
const Final = lazy(() => import("./Final"));
const PageNotFound = lazy(() => import("./PageNotFound"));

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pool-list" element={<PoolList />} />
        <Route path="rank" element={<Rank />} />
        <Route path="match-sheet/:id" element={<MatchSheetsPage />} />
        <Route path="final" element={<Final />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

