import "./App.css";
import ResponsiveAppBar from "./components/navbar/Navbar";
import LoginSignup from "./pages/LoginSignup";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <LoginSignup />
    </div>
  );
}

export default App;
