import React from "react";
import { useState } from "react";
import "./Header.css";
import Nav from "../Nav/Nav"
import Container from "../Container/Container";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario"
import menuBar from "../../assets/images/menubar.png"


const Header = () => {
  const [exibeNavBar, setExibeNavBar] = useState(false);
  console.log(`Exibe a NavBar? ${exibeNavBar}`)

  return (
      <header className='headerpage'>
          <Container>
              <div className='header-flex'>
                  <img
                      src={menuBar}
                      className="headerpage__menubar"
                      alt="Imagem menu de barras. Serve para exibir ou esconder o menu no smartphone."
                      onClick={() => { setExibeNavBar(true) }}
                  />

                  <Nav
                      exibeNavBar={exibeNavBar}
                      setExibeNavBar={setExibeNavBar}
                  />

                  <PerfilUsuario/>
              </div>
          </Container>
      </header>
  );
};


export default Header;
