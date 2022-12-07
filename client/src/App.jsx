import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import {
  Home,
  Login,
  Category,
  AdminDash,
  ManageNews,
  EditNews,
  ReaderArticles,
  Archive,
  AdsMan,
  ViewSiteStats,
  SingleNews,
} from "./pages";
import { PrivateRoute } from "./components/common";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/admin" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDash />
              </PrivateRoute>
            }
          >
            <Route path="managenews" element={<ManageNews />} />
            <Route path="readers" element={<ReaderArticles />} />
            <Route path="newsedit" element={<EditNews />} />
            <Route path="archive" element={<Archive />} />
            <Route path="ads" element={<AdsMan />} />
            <Route path="stats" element={<ViewSiteStats />} />
          </Route>
          <Route path="/" element={<Home />}>
            <Route path="/news/:year/:month/:slug" element={<SingleNews />} />
            <Route path="/category/:categoryName" element={<Category />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
