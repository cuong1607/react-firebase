import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { productInputs, userInputs } from "./formSource";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />
  };

  console.log("currentUser", currentUser);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
            />
            <Route path="users">
              <Route index element={
                <RequireAuth>
                  <List />
                </RequireAuth>
              }
              />
              <Route path=":userId" element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              } />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Thêm người dùng mới" />
                  </RequireAuth>
                }

              />
            </Route>
            <Route path="products">
              <Route index element={
                <RequireAuth>
                  <List />
                </RequireAuth>
              } />
              <Route path=":productId" element={
                <RequireAuth>
                  <Single />
                </RequireAuth>
              } />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={productInputs} title="Thêm sản phẩm mới" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
