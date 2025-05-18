import "./assets/styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./providers/SearchContext";
import Header from "./components/layout/Header";
import SearchMenu from "./components/ui/search-form/SearchMenu";
import LotsList from "./components/ui/LotsList";
import UserPage from "./components/pages/UserPage";
import LotPage from "./components/pages/LotPage";
import LoginForm from "./components/pages/LoginForm";
import RegisterForm from "./components/pages/RegisterForm";
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchProvider>
                    <SearchMenu />

                    <main>
                      <LotsList />
                    </main>
                  </SearchProvider>
                </>
              }
            />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/lots/:id" element={<LotPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
