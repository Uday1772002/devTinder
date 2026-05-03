import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/footer" element={<Footer />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
