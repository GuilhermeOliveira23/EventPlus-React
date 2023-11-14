import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header"
import HomePage from "./components/Pages/HomePage/HomePage";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import EventosPage from "./components/Pages/EventosPage/EventosPage";
import TipoEventosPage from "./components/Pages/TipoEventosPage/TipoEventosPage";
import TestePage from "./components/Pages/TestePage/TestePage";
import Footer from "./components/Footer/Footer";


const Rotas = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          {/* exact para significar somente o / */}
          <Route element={<HomePage />} path="/" exact />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<EventosPage />} path="/eventos" />
          <Route element={<TipoEventosPage />} path="/tipo-eventos" />
          <Route element={<TestePage />} path="/testes" />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default Rotas;