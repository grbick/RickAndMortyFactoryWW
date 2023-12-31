import React, { Suspense, lazy, useContext } from "react";
import "./App.css";
import { Route, Navigate, Routes } from "react-router-dom";
import { CharacterContext } from "./modules/characters/characters.context";
import Loading from "./components/Loading/Loading";
const LazyLogInPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const LazyHomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LazyFavoritesPage = lazy(
  () => import("./pages/FavoritesPage/FavoritesPage")
);

function App() {
  const { userInfo } = useContext(CharacterContext);

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          {userInfo ? (
            <>
              <Route path="/home" element={<LazyHomePage />} />
              <Route path="/favorites" element={<LazyFavoritesPage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LazyLogInPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
