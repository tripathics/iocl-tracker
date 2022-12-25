import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Client, Admin } from "./pages"
import {Navbar} from './layout/Navbar'
import {SignIn} from './components/SignIn'
import {SignUp} from './components/SignUp'
import {Registration} from './components/Registration'
import {Footer} from './layout/Footer'

import './styles/index.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <Home />
        } />
        <Route exact path="/client" element={
          <Client />
        } />
        <Route exact path="/admin" element={
          <Admin />
        } />

        <Route exact path="/navbar" element={
          <Navbar/>
        } />

        <Route exact path="/login" element={
          <SignIn/>
        } />

        
        <Route exact path="/signup" element={
          <SignUp/>
        } />

        <Route exact path="/register" element={
          <Registration/>
        } />

        
        <Route exact path="/footer" element={
          <Footer/>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
