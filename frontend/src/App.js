import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import BoardsPage from "./pages/BoardsPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import CreateBoardPage from "./pages/CreateBoardPage";
import CreatePinPage from "./pages/CreatePinPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/new" element={<CreateBoardPage />} />
        <Route path="/boards/:id" element={<BoardDetailPage />} />
        <Route path="/pins/new" element={<CreatePinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
