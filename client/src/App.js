import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Client, Admin } from "./pages"

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
