import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Client, Admin, Registration } from "./pages"
import {SignIn} from './components/SignIn'
import {SignUp} from './components/SignUp'

import './styles/index.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <Admin />
        } />
        <Route exact path="/client" element={
          <Client />
        } />
        <Route path="/register" element={
          <Registration />
        } />
        <Route exact path="/login" element={
          <SignIn/>
        } />        
        <Route exact path="/signup" element={
          <SignUp/>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
