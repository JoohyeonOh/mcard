import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/Home";
import TestPage from "@pages/Test";
import CardPage from "./pages/Card";
import ScrollToTop from "./components/shared/ScrollToTop";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Navbar from "./components/shared/Navbar";
import PrivateRoute from "./components/auth/PrivateRoute";
import ApplyPage from "./pages/ApplyPage";
import ApplyDone from "./pages/ApplyDone";
import { Suspense } from "react";
import MyPage from "./pages/My";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SignInPage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={TestPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<>기존에 발급받으신 동일한 카드가 있는지 확인중...</>}
              >
                <ApplyPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
