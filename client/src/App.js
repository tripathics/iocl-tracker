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

  return (
    <BrowserRouter>
      <LayoutComponent user={isAuth}>
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
