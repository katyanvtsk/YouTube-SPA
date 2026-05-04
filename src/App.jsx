import { Route, Routes } from "react-router";
import Login from "./auth/Login";
import RegistrationForm from "./auth/Registration";
import PrivateRoute from "./PrivateRoute";
import Search from "./Search";
import VideoList from "./VideoList";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { logOut, selectAuth } from "./redux/slices/authSlice";
import FavoritesSearchs from "./FavoritesSearchs";
import "./App.css";
import "./styles/nav.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div>
      {token && (
        <nav className="nav">
          <div className="nav__links">
            <NavLink to="/" end className="nav__link">
              Поиск
            </NavLink>
            <NavLink to="/favorites" className="nav__link">
              Избранное
            </NavLink>
          </div>

          <button onClick={handleLogout} className="nav__button">
            Выйти
          </button>
        </nav>
      )}

      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Search />} />
          <Route path="/video" element={<VideoList />} />
          <Route path="/favorites" element={<FavoritesSearchs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
