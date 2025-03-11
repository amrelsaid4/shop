import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
interface Iprops {}
const App = ({}: Iprops) => {
  return <Router>
    <div className="flex h-screen">
        <SideBar/>
        <div className="routned w-full flex - justify-center flex-wrap">
         <Routes>
          <Route path="/" element={<MainContent />}/>
          <Route path="/product/:id" element={<ProductPage />}/>
         </Routes>
        </div>
    </div>
  </Router>
};

export default App;
