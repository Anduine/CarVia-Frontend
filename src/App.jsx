import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/index.css";
import Header from "./components/layout/Header";
import MainPage from "./components/pages/MainPage";
import LotPage from "./components/pages/LotPage";
import AddLotPage from "./components/pages/AddLotPage";
import UserPage from "./components/pages/UserPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import EditLotPage from "./components/pages/EditLotPage";
import EditUserPage from "./components/pages/EditUserPage";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/lot/:lotId" element={<LotPage />} />
            <Route path="/add_lot" element={<AddLotPage />} />
            <Route path="/edit_lot/:lotId" element={<EditLotPage />} />

            <Route path="/profile" element={<UserPage />} />
            <Route path="/edit_profile" element={<EditUserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
