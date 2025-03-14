import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import { FilterProvider } from "./components/FilterContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <FilterProvider>
        <div className="flex h-screen">
          <SideBar />
          <div className="w-full flex justify-center flex-wrap">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainContent />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div>
      </FilterProvider>
    </Provider>
  );
};

export default App;
