import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/home";
import Login from "./containers/login";
import Loja from "./containers/loja";
import PrivateRoute from "./components/authToken";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/loja"
          element={
            <PrivateRoute>
              <Loja />
            </PrivateRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}