import { React, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LayoutComponent from "./layout/layoutcomponent"
import { Home, Client, Admin, Registration, SignIn, SignUp } from "./pages"
import ProtectedComponent from "./components/ProtectedComponent"

import './styles/styles.scss'
import './styles/index.scss'
// test
import TestComp from "./test/FormComp"
import { checkAuth } from "./helpers/helpers"
import config from "./config/config"

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);

  const handleUserState = (res) => {
    console.log(res);
    if (res.isAuth) setIsAuth(true);
    else setIsAuth(false);
  }

  useEffect(() => {
    checkAuth().then(res => {
      console.log(res)
      if (res.isAuth) setIsAuth(true);
      else setIsAuth(false);
    })
  }, [])

  const logoutUser = () => {
    fetch(`${config.API_BASE_URL}/users/logout`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => {
      if (res.ok) setIsAuth(false);
    }).catch(err => {throw err});
  }

  return (
    <BrowserRouter>
      <LayoutComponent user={isAuth} handleLogout={logoutUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={
            <ProtectedComponent userState={isAuth} handleUserState={handleUserState} >
              <Admin />
            </ProtectedComponent>
          } />
          <Route path="/client" element={<Client />} />
          <Route path="/register" element={
            <ProtectedComponent userState={isAuth} handleUserState={handleUserState} >
              <Registration />
            </ProtectedComponent>
          } />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/test' element={<TestComp />} />
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  );
}

export default App;
