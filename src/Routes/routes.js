import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header"
import HomePage from "../components/Pages/HomePage/HomePage";
import LoginPage from "../components/Pages/LoginPage/LoginPage";
import EventosPage from "../components/Pages/EventosPage/EventosPage";
import TipoEventosPage from "../components/Pages/TipoEventosPage/TipoEventosPage";
import TestePage from "../components/Pages/TestePage/TestePage";
import Footer from "../components/Footer/Footer";
import { PrivateRoute} from "./PrivateRoute"
import EventosAlunoPage from "../components/Pages/EventosAlunoPage/EventosAlunoPage";


const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" exact />

        <Route
          path="/tipo-eventos"
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventosPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventos"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventos-aluno"
          element={
            <PrivateRoute>
              <EventosAlunoPage />
            </PrivateRoute>
          }
        />

        <Route element={<LoginPage />} path="/login" />
        <Route element={<TestePage />} path="/testes" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;