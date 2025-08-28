import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/HeaderCom/Header";
import Home from "./pages/HomePage/Home";
import MovieList from "./components/movielist/MovieList";
import Moviedetail from "./pages/movieDetail/Moviedetail";
import TvDetail from "./pages/tvDetail/TvDetail";
import TvList from "./components/tvList/TvList";
import SearchPage from "./pages/searchPage/SearchPage";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdatePass from "./pages/LoginPage/UpdatePass";
import FavouritePage from "./pages/favouritePage/FavouritePage";
import ReviewPage from "./pages/reviewPage/ReviewPage";
import Footer from "./components/FooterCom/Footer";
import FeedHome from "./pages/FeedHome/FeedHome";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import PersonDetail from "./pages/searchPage/PersonDetail";

// ✅ Wrapper component to handle footer visibility
function Layout() {
  const location = useLocation();

  // Agar path '/feed-home' ya uske nested path hai → footer hide
  const hideFooter = location.pathname.startsWith("/feed-home");

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/feed-home" element={<FeedHome />}>
          <Route index element={<Feed />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="/movie/:id" element={<Moviedetail />}></Route>
        <Route path="/movies" element={<MovieList />}></Route>
        <Route path="/tv/:id" element={<TvDetail />}></Route>
        <Route path="/tvs" element={<TvList />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/person/:id" element={<PersonDetail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/update-password" element={<UpdatePass />}></Route>
        <Route path="/favourite" element={<FavouritePage />}></Route>
        <Route path="/review" element={<ReviewPage />}></Route>
        {/* <Route path='/*' element={<h1>Page not found</h1>}></Route> */}
      </Routes>

      {/* ✅ Footer conditionally */}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
