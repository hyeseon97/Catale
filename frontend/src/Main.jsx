import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/settingpage/SettingsPage";
import PreferencePage from "./pages/PreferencePage";
import CocktailDetailPage from "./pages/cocktailpage/CocktailDetailPage";
import CocktailReviewPage from "./pages/cocktailpage/CocktailReviewPage";
import MainPage from "./pages/mainpage/MainPage";
import ResultPage from "./pages/mainpage/ResultPage";
import MapPage from "./pages/mappage/MapPage";
import StoreDetailPage from "./pages/mappage/StoreDetailPage";
import DiaryPage from "./pages/diarypage/DiaryPage";
import DatePage from "./pages/diarypage/DatePage";
import SearchPage from "./pages/SearchPage";
import MyPage from "./pages/mypage/MyPage";
import MonthlyMoodPage from "./pages/mypage/MonthlyMoodPage";
import RecommendPage from "./pages/mypage/RecommendPage";
import ChangePreferencePage from "./pages/mypage/ChangePreferencePage";
import MyCocktailPage from "./pages/mypage/MyCocktailPage";
import LikedCocktailPage from "./pages/mypage/LikedCocktailPage";
import DeleteAccountPage from "./pages/settingpage/DeleteAccountPage";
import ErrorPage from "./pages/commonpage/ErrorPage";
import Choosecocktail from "./pages/Choosecocktail";
import GuidePage from "./pages/GuidePage";
import App from "./App";

function Main() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="choosecocktail" element={<Choosecocktail />} />
          <Route path="guidePage" element={<GuidePage />} />
          <Route path="settings">
            <Route index element={<SettingsPage />} />
            <Route path="deleteaccount" element={<DeleteAccountPage />} />
          </Route>
          <Route path="preference" element={<PreferencePage />} />
          <Route path="cocktail/:cocktailId">
            <Route index element={<CocktailDetailPage />} />
            <Route path="review" element={<CocktailReviewPage />} />
          </Route>
          <Route path="bar">
            <Route index element={<MainPage />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
          <Route path="map">
            <Route index element={<MapPage />} />
            <Route path="detail/:storenumber" element={<StoreDetailPage />} />
          </Route>
          <Route path="diary">
            <Route index element={<DiaryPage />} />
            <Route path=":diaryId" element={<DatePage />} />
          </Route>
          <Route path="search" element={<SearchPage />} />
          <Route path="my">
            <Route index element={<MyPage />} />
            <Route path="monthlymood" element={<MonthlyMoodPage />} />
            <Route path="recommend" element={<RecommendPage />} />
            <Route path="changepreference" element={<ChangePreferencePage />} />
            <Route path="mycocktail" element={<MyCocktailPage />} />
            <Route path="likedcocktail" element={<LikedCocktailPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Main;
