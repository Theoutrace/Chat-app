import "./App.css";
import ResponsiveAppBar from "./components/navbar/Navbar";
import LoginSignup from "./pages/auth/LoginSignup";
import Chat from "./pages/chat/Chat";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "./Store/reducers/auth-reducer";

function App(props) {
  console.log("app.js");
  const dispatch = useDispatch();
  const userEmail = localStorage.getItem("email");
  if (userEmail) {
    dispatch(AuthActions.login({ email: userEmail }));
  }
  const auth = useSelector((state) => state.auth);
  const showElement = auth.login ? (
    <Chat modal={props.modal} />
  ) : (
    <LoginSignup />
  );

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        {!auth.login && <Route path="/login" element={<LoginSignup />} />}
        <Route path="/chat/*" element={showElement} />
      </Routes>
    </div>
  );
}

export default App;
