import "./App.css";
import ResponsiveAppBar from "./components/navbar/Navbar";
import LoginSignup from "./pages/auth/LoginSignup";
import Chat from "./pages/chat/Chat";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
