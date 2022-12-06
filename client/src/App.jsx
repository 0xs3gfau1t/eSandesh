import "./App.css";
import { Header, Footer, Article } from "./components";
import { Home, Politics } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politics" element={<Politics />} />
      </Routes>
      <Article />
      <Footer />
    </div>
  );
}

export default App;
